import { usePasswordProtection } from "../../password";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clipboard,
  Plus,
  Printer,
  Share2,
  Trash2,
  X,
} from "react-feather";
import { DataResult, ESGScore, SearchResult } from "../../refinitiv";
import { useDebounce } from "../index";
import * as Dialog from "@radix-ui/react-dialog";
import { Spinner } from "../../spinner";
import classNames from "classnames";
import { ParentSize } from "@visx/responsive";
import { PortfolioPie } from "../../visualization/portfolioPie";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BigNumber } from "../../renderer";
import { ESGPeerChart } from "../../visualization/esgPeers";
import { ESGHistory } from "../../visualization/esgHistory";
import { SEO } from "../../head";
import { MultiCompanySentiment } from "../../marketpsych";
import { fetchRetry } from "../../fetch";

export default function PortfolioPage() {
  const { View, isUnlocked } = usePasswordProtection();

  if (!isUnlocked) {
    return View;
  }

  return <PortfolioOverview />;
}

export interface Investment {
  ric: string;
  stake: number;
  description?: string;
}

export interface PortfolioState {
  investments: Investment[];
}

export function usePortfolioStateExternal(): [
  PortfolioState,
  (state: PortfolioState) => void
] {
  const [state, setState] = useState<PortfolioState>({
    investments: [],
  });

  useEffect(() => {
    const state = localStorage.getItem("portfolio:state");
    if (!state) {
      return;
    }
    setState(JSON.parse(state));
  }, []);

  const setStateExternal = (state: PortfolioState) => {
    setState(state);
    localStorage.setItem("portfolio:state", JSON.stringify(state));
  };

  return [state, setStateExternal];
}

function usePortfolioState(): [
  PortfolioState,
  (state: PortfolioState) => void
] {
  const [internalState, setInternalState] = useState<PortfolioState>({
    investments: [],
  });

  useEffect(() => {
    const state = new URL(window.location.href).searchParams.get("state");
    if (!state) {
      return;
    }

    setInternalState(JSON.parse(state) as PortfolioState);
  }, []);

  useEffect(() => {
    if (internalState.investments.length > 0) {
      return;
    }

    const state = localStorage.getItem("portfolio:state");
    if (!state) {
      return;
    }

    setInternalState(JSON.parse(state) as PortfolioState);
  }, []);

  const debounced = useDebounce(internalState, 500);

  useEffect(() => {
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?state=" +
      encodeURIComponent(JSON.stringify(debounced));
    window.history.pushState({ path: newurl }, "", newurl);
    localStorage.setItem("portfolio:state", JSON.stringify(debounced));
  }, [debounced]);

  return [internalState, setInternalState];
}

function usePortfolioData(state: PortfolioState) {
  const [data, setData] = useState<DataResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [previousRics, setPreviousRics] = useState<string[]>([]);
  const memoizedRics = useMemo(
    () => Array.from(new Set(state.investments.map((i) => i.ric))).sort(),
    [state]
  );

  useEffect(() => {
    // Only re-fetch data when rics _actually changed_
    if (JSON.stringify(previousRics) === JSON.stringify(memoizedRics)) {
      return;
    }
    setPreviousRics(memoizedRics);

    if (memoizedRics.length < 1) {
      setData([]);
      return;
    }

    setIsLoading(true);
    (async () => {
      try {
        const res = await fetchRetry(`/api/portfolio-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rics: memoizedRics,
          }),
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [memoizedRics]);

  return { data, isLoading };
}

function PortfolioOverview() {
  const [state, setPortfolioState] = usePortfolioState();
  const { data, isLoading } = usePortfolioData(state);

  return (
    <>
      <SEO path={window.location.href} />

      <div className={"pb-16"}>
        <div className={"grid grid-cols-12"}>
          <div className={"hidden md:block col-span-1 lg:col-span-2"}></div>

          <div
            className={
              "col-span-12 md:col-span-10 lg:col-span-8 pt-24 flex flex-col space-y-8 p-4"
            }
          >
            <BackButton />

            <Header state={state} setPortfolioState={setPortfolioState} />

            <PortfolioInvestments
              data={data}
              state={state}
              setPortfolioState={setPortfolioState}
            />

            {state.investments.length > 0 ? (
              <PortfolioInsights
                state={state}
                data={data}
                isLoading={isLoading}
              />
            ) : null}
          </div>

          <div className={"hidden md:block col-span-1 lg:col-span-2"}></div>
        </div>
      </div>
    </>
  );
}

const recommendations = [
  {
    RIC: "AAPL.O",
    DocumentTitle: "Apple Inc",
  },
  {
    RIC: "MSFT.O",
    DocumentTitle: "Microsoft",
  },
  {
    RIC: "BMWG.DE",
    DocumentTitle: "BMW AG",
  },
];

function AddInvestment({
  addInvestment,
  state,
}: {
  state: PortfolioState;
  addInvestment: (ric: string, stake: number) => void;
}) {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchResult[]>(recommendations);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedValue = useDebounce(query, 500);

  const memoizedValue = useMemo(() => debouncedValue, [debouncedValue]);

  useEffect(() => {
    if (memoizedValue.length < 1) {
      setResults(recommendations);
      return;
    }

    setIsLoading(true);

    (async () => {
      const res = await fetchRetry(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: memoizedValue,
        }),
      });
      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = await res.json();
      setResults(data);
      setIsLoading(false);
    })();
  }, [memoizedValue]);

  const childContainerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [stake, setStake] = useState(100);

  const filteredResults = useMemo(() => {
    return results.filter(
      (r) => !state.investments.find((i) => i.ric === r.RIC)
    );
  }, [results, state]);

  const isValid = useMemo(() => {
    return selected && stake > 0 && stake <= 100;
  }, [selected, stake]);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <span>
          <Tooltip.Provider>
            <Tooltip.Root
              open={state.investments.length >= 5 && tooltipOpen}
              onOpenChange={setTooltipOpen}
            >
              <Tooltip.Trigger asChild>
                <button
                  disabled={state.investments.length >= 5}
                  className={classNames(
                    "print:hidden flex items-center space-x-2 px-4 py-2  hover:bg-neutral-200 active:bg-neutral-300 rounded-md text-sm font-medium text-neutral-800",
                    {
                      "cursor-not-allowed bg-neutral-50":
                        state.investments.length >= 5,
                      "bg-neutral-100": state.investments.length < 5,
                    }
                  )}
                >
                  <Plus size={16} />
                  <span>Add Investment</span>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  Can only add up to 5 investments
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content asChild>
          <div
            className="fixed top-0 left-0 w-full h-full grid place-items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (
                childContainerRef.current &&
                !childContainerRef.current.contains(e.target as Node)
              ) {
                setOpen(false);
              }
            }}
          >
            <div
              ref={childContainerRef}
              className={
                "flex flex-col space-y-8 bg-neutral-50 rounded-md p-8 w-full md:w-2/3 lg:w-1/3"
              }
            >
              <div>
                <div className={"flex items-center"}>
                  <Dialog.Title className="text-xl font-medium">
                    Add investment
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="ml-auto" aria-label="Close">
                      <X />
                    </button>
                  </Dialog.Close>
                </div>

                <Dialog.Description className="text-neutral-700">
                  Select a company and define the stake.
                </Dialog.Description>
              </div>

              <fieldset className="flex flex-col space-y-2">
                <div className={"flex items-center space-x-2"}>
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={
                      "p-2 border border-neutral-200 shadow-md rounded w-full"
                    }
                    placeholder={"Apple Inc."}
                  />

                  <div
                    className={classNames(
                      "flex justify-center items-center space-x-2 p-4",
                      { invisible: !isLoading }
                    )}
                  >
                    <Spinner size={4} />
                    <span>Loading...</span>
                  </div>
                </div>

                <div className={"overflow-hidden max-h-64 h-full"}>
                  <ul
                    className={"flex flex-col space-y-2 overflow-auto h-full"}
                  >
                    {filteredResults.map((result, idx) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setSelected(result.RIC!);
                          }}
                          key={result.PermID || idx}
                          className={classNames(
                            "p-2 text-sm bg-neutral-100 rounded-md hover:bg-neutral-200 flex items-center space-x-1",
                            {
                              "bg-neutral-200": result.RIC === selected,
                            }
                          )}
                        >
                          <Check
                            className={classNames("text-green-500", {
                              invisible: selected !== result.RIC,
                            })}
                          />
                          <span>{result.DocumentTitle || ""}</span>
                        </button>
                      );
                    })}
                  </ul>
                </div>
              </fieldset>

              <fieldset className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Stake
                </label>
                <input
                  type="number"
                  className={
                    "p-2 border border-neutral-200 shadow-md rounded w-full"
                  }
                  placeholder={"100"}
                  min="1"
                  max="100"
                  value={stake}
                  onChange={(e) => setStake(parseInt(e.target.value))}
                />
              </fieldset>

              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <button
                    onClick={() =>
                      selected ? addInvestment(selected, stake) : null
                    }
                    disabled={!isValid}
                    className={
                      "flex items-center space-x-2 w-full justify-center md:justify-end md:w-auto px-4 py-2 bg-neutral-200 disabled:bg-neutral-50 hover:bg-neutral-300 active:bg-neutral-400 rounded-md text-sm font-medium text-neutral-800"
                    }
                  >
                    <Plus size={16} />
                    <span>Add Investment</span>
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Header({
  state,
  setPortfolioState,
}: {
  state: PortfolioState;
  setPortfolioState: (state: PortfolioState) => void;
}) {
  return (
    <div
      className={
        "flex flex-col md:flex-row items-start md:items-center justify-between"
      }
    >
      <h1 className={"text-4xl font-semibold"}>Portfolio</h1>

      <div className={"flex items-center space-x-1"}>
        <AddInvestment
          state={state}
          addInvestment={(ric, stake) => {
            setPortfolioState({
              investments: [...state.investments, { ric, stake }],
            });
          }}
        />

        {navigator && navigator.share ? (
          <button
            className={
              "flex items-center space-x-2 print:invisible px-4 py-2 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 rounded-md text-sm font-medium text-neutral-800"
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              navigator.share({
                text: "Check out my ESG Pitchbook Portfolio!",
                url: window.location.href,
              });
            }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        ) : (
          <button
            className={
              "flex items-center space-x-2 print:invisible px-4 py-2 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 rounded-md text-sm font-medium text-neutral-800"
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Clipboard size={16} />
            <span>Copy</span>
          </button>
        )}

        <button
          className={
            "items-center space-x-2 hidden md:flex print:invisible px-4 py-2 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 rounded-md text-sm font-medium text-neutral-800"
          }
          onClick={() => window.print()}
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <div>
      <Link
        href={"/"}
        className={
          "px-2 py-1 rounded-md shadow-md border border-neutral-200 inline-flex items-center space-x-1 print:hidden"
        }
      >
        <ArrowLeft size={14} />
        <span>Back</span>
      </Link>
    </div>
  );
}

function PortfolioInvestments({
  setPortfolioState,
  state,
  data,
}: {
  state: PortfolioState;
  data: DataResult[];
  setPortfolioState: (state: PortfolioState) => void;
}) {
  return (
    <div className={"flex flex-col space-y-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Your Investments</h2>
        <p className={"text-neutral-700"}>Manage your investments</p>
      </div>
      <div className={"grid grid-cols-12 gap-4"}>
        <div
          className={
            "col-span-12 md:col-span-5 print:col-span-5 h-64 md:h-72 w-full"
          }
        >
          <ParentSize>
            {({ width, height }) => (
              <PortfolioPie
                width={width}
                height={height}
                data={state.investments.map((i) => {
                  const relData = data.find((d) => d.RIC === i.ric);
                  return {
                    label: i.ric,
                    value: i.stake,
                    data: relData || null,
                  };
                })}
              />
            )}
          </ParentSize>
        </div>

        <div
          className={
            "col-span-12 md:col-span-7 print:col-span-7 bg-neutral-50 rounded-md p-4 flex flex-col space-y-4 justify-center"
          }
        >
          {state.investments.length === 0 ? (
            <p className={"self-center text-sm text-neutral-800"}>
              No investments added yet.
            </p>
          ) : null}

          {state.investments.map((investment) => {
            const dataEntry = data.find((d) => d.RIC === investment.ric);
            return (
              <div
                key={investment.ric}
                className={"flex items-center justify-between"}
              >
                <a
                  href={`/organization/${investment.ric}`}
                  className={"flex items-center space-x-1"}
                >
                  <span className={"font-medium"}>
                    {dataEntry?.CommonName || investment.ric}
                  </span>
                  {dataEntry ? (
                    <span className={"text-sm text-neutral-700"}>
                      {dataEntry.RIC}
                    </span>
                  ) : null}
                </a>

                <div className={"flex items-center space-x-2"}>
                  <span className={"hidden print:block"}>
                    {investment.stake}
                  </span>
                  <div
                    className={
                      "flex items-center space-x-2 bg-white p-1 rounded print:hidden"
                    }
                  >
                    <button
                      className={"px-4 md:px-2 rounded hover:bg-neutral-50"}
                      onClick={() => {
                        const nextInvestments = state.investments.map((i) => {
                          if (i.ric === investment.ric) {
                            return {
                              ...i,
                              stake: i.stake - 5 < 0 ? 0 : i.stake - 5,
                            };
                          }
                          return i;
                        });
                        setPortfolioState({
                          investments: nextInvestments,
                        });
                      }}
                    >
                      -
                    </button>
                    <input
                      type={"number"}
                      datatype={"number"}
                      pattern={"[0-9]*"}
                      min={0}
                      max={100}
                      onChange={(e) => {
                        const nextInvestments = state.investments.map((i) => {
                          if (i.ric === investment.ric) {
                            return {
                              ...i,
                              stake: parseInt(e.target.value),
                            };
                          }
                          return i;
                        });
                        setPortfolioState({
                          investments: nextInvestments,
                        });
                      }}
                      className={"w-12 md:w-16 text-center appearance-none m-0"}
                      value={investment.stake || 0}
                    />
                    <button
                      className={"px-4 md:px-2 rounded hover:bg-neutral-50"}
                      onClick={() => {
                        const nextInvestments = state.investments.map((i) => {
                          if (i.ric === investment.ric) {
                            return {
                              ...i,
                              stake: i.stake + 5 > 100 ? 100 : i.stake + 5,
                            };
                          }
                          return i;
                        });
                        setPortfolioState({
                          investments: nextInvestments,
                        });
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={"print:hidden"}
                    onClick={() => {
                      const nextInvestments = state.investments.filter(
                        (i) => i.ric !== investment.ric
                      );
                      setPortfolioState({
                        investments: nextInvestments,
                      });
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className={"flex flex-col items-center space-y-6"}>
      <Spinner size={8} />
      <div className={"flex flex-col space-y-1 items-center"}>
        <span className={"font-medium text-xl"}>Loading</span>
        <p className={"text-center font-regular text-neutral-700"}>
          We&apos;re assembling all the data to help <br /> you make the best
          investment decisions. <br />
          This may take a few seconds.
        </p>
      </div>
    </div>
  );
}

function PortfolioInsights({
  state,
  data,
  isLoading,
}: {
  state: PortfolioState;
  data: DataResult[];
  isLoading: boolean;
}) {
  const dataForInvestment = useMemo(() => {
    return state.investments.map((i) => {
      const relData = data.find((d) => d.RIC === i.ric);
      return {
        ric: i.ric,
        stake: i.stake,
        data: relData || null,
      };
    });
  }, [data, state]);

  const totalStake = useMemo(() => {
    return dataForInvestment.reduce((acc, i) => {
      return acc + i.stake;
    }, 0);
  }, [dataForInvestment]);

  const {
    esgCombinedScoreAverage,
    esgEnvironmentalScoreAverage,
    esgGovernanceScoreAverage,
    esgSocialScoreAverage,
  } = useMemo(() => {
    const esgCombinedScoreAverage = [...dataForInvestment].reduce(
      (acc, p) =>
        acc + (p.stake / totalStake) * (p.data?.ESGCombinedScore || 0),
      0
    );

    const esgEnvironmentalScoreAverage = [...dataForInvestment].reduce(
      (acc, p) =>
        acc + (p.stake / totalStake) * (p.data?.ESGEnvironmentalScore || 0),
      0
    );

    const esgSocialScoreAverage = [...dataForInvestment].reduce(
      (acc, p) => acc + (p.stake / totalStake) * (p.data?.ESGSocialScore || 0),
      0
    );

    const esgGovernanceScoreAverage = [...dataForInvestment].reduce(
      (acc, p) =>
        acc + (p.stake / totalStake) * (p.data?.ESGGovernanceScore || 0),
      0
    );

    return {
      esgCombinedScoreAverage,
      esgEnvironmentalScoreAverage,
      esgSocialScoreAverage,
      esgGovernanceScoreAverage,
    };
  }, [dataForInvestment]);

  const portfolioAverage: DataResult = useMemo(() => {
    return {
      RIC: "Average",
      PermID: "average",
      ESGCombinedScore: esgCombinedScoreAverage,
      ESGEnvironmentalScore: esgEnvironmentalScoreAverage,
      ESGSocialScore: esgSocialScoreAverage,
      ESGGovernanceScore: esgGovernanceScoreAverage,
      CommonName: "Ø Average",
      WorkforceScore: null,
      EmployeeSatisfaction: null,
      HumanRightsScore: null,
      DonationsRevenueInMillions: null,
      ExecutivesCulturalDiversity: null,
      ExecutiveMembersGenderDiversity: null,
      BoardGenderDiversity: null,
      BoardCulturalDiversity: null,
      RenewableEnergyUseRatio: null,
      WaterWithdrawalTotal: null,
      EnergyUseTotal: null,
      CO2EquivalentEmissionsTotal: null,
      CO2EquivalentEmissionsIndirectScope3: null,
      CO2EquivalentEmissionsIndirectScope2: 0,
      WasteTotal: null,
      Volume: 0,
      CO2EquivalentEmissionsDirectScope1: null,
      ESGCombinedScoreIncludingControversies: null,
      ESGEmissionsScore: null,
      PriceClose: 0,
      BusinessSummary: null,
      EBITDA: 0,
      Revenue: 0,
      EnterpriseValue: 0,
      MarketCap: 0,
      ESGResourceUseScore: null,
      ESGControversiesScore: null,
      ESGReportingScope: null,
      HeadquartersCountry: null,
      ROICMean: null,
      BoardSpecificSkills: null,
    };
  }, [
    esgCombinedScoreAverage,
    esgEnvironmentalScoreAverage,
    esgSocialScoreAverage,
    esgGovernanceScoreAverage,
  ]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className={"flex flex-col space-y-8"}>
      <h1 className={"text-3xl font-semibold"}>Insights</h1>

      <ESGScores
        esgSocialScoreAverage={esgSocialScoreAverage}
        data={data}
        esgCombinedScoreAverage={esgCombinedScoreAverage}
        esgEnvironmentalScoreAverage={esgEnvironmentalScoreAverage}
        esgGovernanceScoreAverage={esgGovernanceScoreAverage}
        portfolioAverage={portfolioAverage}
        isLoading={isLoading}
      />

      <HighLowPerformer
        esgSocialScoreAverage={esgSocialScoreAverage}
        data={data}
        esgCombinedScoreAverage={esgCombinedScoreAverage}
        esgEnvironmentalScoreAverage={esgEnvironmentalScoreAverage}
        esgGovernanceScoreAverage={esgGovernanceScoreAverage}
        portfolioAverage={portfolioAverage}
        isLoading={isLoading}
        totalStake={totalStake}
        dataForInvestment={dataForInvestment}
      />

      <ESGScoresOverTime data={data} isLoading={isLoading} state={state} />

      {data.length > 0 ? (
        <MultiCompanySentiment state={state} data={data} />
      ) : null}
    </div>
  );
}

function ESGScores({
  esgCombinedScoreAverage,
  esgEnvironmentalScoreAverage,
  esgGovernanceScoreAverage,
  esgSocialScoreAverage,
  isLoading,
  data,
  portfolioAverage,
}: {
  esgCombinedScoreAverage: number;
  esgEnvironmentalScoreAverage: number;
  esgSocialScoreAverage: number;
  esgGovernanceScoreAverage: number;
  isLoading: boolean;
  data: DataResult[];
  portfolioAverage: DataResult;
}) {
  return (
    <div className={"flex flex-col space-y-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Portfolio Score</h2>
        <p className={"text-neutral-700"}>ESG scores weighted by stake.</p>
      </div>

      <div
        className={
          "grid grid-cols-12 gap-4 items-stretch print:items-start break-before-page"
        }
      >
        <div
          className={
            "flex flex-col space-y-2 col-span-12 print:col-span-3 md:col-span-3"
          }
        >
          <BigNumber value={esgCombinedScoreAverage}>Combined Score</BigNumber>
          <BigNumber value={esgEnvironmentalScoreAverage}>
            Environmental Score
          </BigNumber>
          <BigNumber value={esgSocialScoreAverage}>Social Score</BigNumber>
          <BigNumber value={esgGovernanceScoreAverage}>
            Governance Score
          </BigNumber>
        </div>

        <div
          className={
            "col-span-12 md:col-span-9 print:col-span-9 h-64 md:h-full print:h-48 block break-inside-avoid"
          }
        >
          <div
            className={classNames("w-full h-full", {
              "animate-pulse": isLoading,
            })}
          >
            {!isLoading && data.length > 0 ? (
              <ParentSize>
                {({ width, height }) => (
                  <ESGPeerChart
                    company={data[0]}
                    peers={[...data.slice(1), portfolioAverage]}
                    width={width}
                    height={height}
                  />
                )}
              </ParentSize>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function HighLowPerformer({
  esgCombinedScoreAverage,
  esgEnvironmentalScoreAverage,
  esgGovernanceScoreAverage,
  esgSocialScoreAverage,
  isLoading,
  data,
  portfolioAverage,
  totalStake,
  dataForInvestment,
}: {
  esgCombinedScoreAverage: number;
  esgEnvironmentalScoreAverage: number;
  esgSocialScoreAverage: number;
  esgGovernanceScoreAverage: number;
  isLoading: boolean;
  data: DataResult[];
  portfolioAverage: DataResult;
  totalStake: number;
  dataForInvestment: Array<{
    ric: string;
    stake: number;
    data: DataResult | null;
  }>;
}) {
  const minMax = useMemo(() => {
    const minCombinedScore = [...dataForInvestment].sort(
      (a, b) =>
        (a.data?.ESGCombinedScore || 0) - (a.data?.ESGCombinedScore || 0)
    )[0];
    const maxCombinedScore = [...dataForInvestment].sort(
      (a, b) =>
        (b.data?.ESGCombinedScore || 0) - (a.data?.ESGCombinedScore || 0)
    )[0];

    const minEnvironmentalScore = [...dataForInvestment].sort(
      (a, b) =>
        (a.data?.ESGEnvironmentalScore || 0) -
        (a.data?.ESGEnvironmentalScore || 0)
    )[0];
    const maxEnvironmentalScore = [...dataForInvestment].sort(
      (a, b) =>
        (b.data?.ESGEnvironmentalScore || 0) -
        (a.data?.ESGEnvironmentalScore || 0)
    )[0];

    const minSocialScore = [...dataForInvestment].sort(
      (a, b) => (a.data?.ESGSocialScore || 0) - (a.data?.ESGSocialScore || 0)
    )[0];
    const maxSocialScore = [...dataForInvestment].sort(
      (a, b) => (b.data?.ESGSocialScore || 0) - (a.data?.ESGSocialScore || 0)
    )[0];

    const minGovernanceScore = [...dataForInvestment].sort(
      (a, b) =>
        (a.data?.ESGGovernanceScore || 0) - (a.data?.ESGGovernanceScore || 0)
    )[0];
    const maxGovernanceScore = [...dataForInvestment].sort(
      (a, b) =>
        (b.data?.ESGGovernanceScore || 0) - (a.data?.ESGGovernanceScore || 0)
    )[0];

    return {
      minCombinedScore,
      maxCombinedScore,

      minEnvironmentalScore,
      maxEnvironmentalScore,

      minSocialScore,
      maxSocialScore,

      minGovernanceScore,
      maxGovernanceScore,
    };
  }, [data]);

  return (
    <div className={"flex flex-col space-y-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>High/Low Performers</h2>
        <p className={"text-neutral-700"}>
          Investments that have a significant impact on your ESG scores.
        </p>
      </div>

      <div className={"rounded-md p-4 bg-neutral-50 flex flex-col space-y-2"}>
        <div className={"grid gap-2 grid-cols-12"}>
          <div className={"col-span-3"}>
            <p className={"font-medium truncate"}>Score</p>
          </div>

          <div className={"col-span-3"}>
            <p className={"font-medium"}>Min</p>
          </div>

          <div className={"col-span-3"}>
            <p className={"font-medium"}>Average</p>
          </div>

          <div className={"col-span-3"}>
            <p className={"font-medium"}>Max</p>
          </div>
        </div>

        <div className={"grid gap-2 grid-cols-12"}>
          <div className={"col-span-3"}>
            <p className={"font-medium truncate"}>Combined Score</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.minCombinedScore.data?.ESGCombinedScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.minCombinedScore.data?.CommonName})
            </p>
          </div>

          <div className={"col-span-3"}>
            <p>{esgCombinedScoreAverage.toFixed(2)}%</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.maxCombinedScore.data?.ESGCombinedScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.maxCombinedScore.data?.CommonName})
            </p>
          </div>
        </div>

        <div className={"grid gap-2 grid-cols-12"}>
          <div className={"col-span-3"}>
            <p className={"font-medium truncate"}>Environmental Score</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.minEnvironmentalScore.data?.ESGEnvironmentalScore?.toFixed(
                2
              )}
              %
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.minEnvironmentalScore.data?.CommonName})
            </p>
          </div>

          <div className={"col-span-3"}>
            <p>{esgEnvironmentalScoreAverage.toFixed(2)}%</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.maxEnvironmentalScore.data?.ESGEnvironmentalScore?.toFixed(
                2
              )}
              %
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.maxEnvironmentalScore.data?.CommonName})
            </p>
          </div>
        </div>

        <div className={"grid gap-2 grid-cols-12"}>
          <div className={"col-span-3"}>
            <p className={"font-medium truncate"}>Social Score</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.minSocialScore.data?.ESGSocialScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.minSocialScore.data?.CommonName})
            </p>
          </div>

          <div className={"col-span-3"}>
            <p>{esgSocialScoreAverage.toFixed(2)}%</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.maxSocialScore.data?.ESGSocialScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.maxSocialScore.data?.CommonName})
            </p>
          </div>
        </div>

        <div className={"grid grid-cols-12"}>
          <div className={"col-span-3"}>
            <p className={"font-medium truncate"}>Governance Score</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.minGovernanceScore.data?.ESGGovernanceScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.minGovernanceScore.data?.CommonName})
            </p>
          </div>

          <div className={"col-span-3"}>
            <p>{esgGovernanceScoreAverage.toFixed(2)}%</p>
          </div>

          <div className={"col-span-3"}>
            <span>
              {minMax.maxGovernanceScore.data?.ESGGovernanceScore?.toFixed(2)}%
            </span>
            <p className={"text-sm text-neutral-700"}>
              ({minMax.maxGovernanceScore.data?.CommonName})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ESGScoresOverTime({
  data,
  state,
}: {
  isLoading: boolean;
  data: DataResult[];
  state: PortfolioState;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [esgScores, setEsgScores] = useState<ESGScore[]>([]);

  const [previousRics, setPreviousRics] = useState<string[]>([]);
  const memoizedRics = useMemo(
    () => Array.from(new Set(state.investments.map((i) => i.ric))).sort(),
    [state]
  );

  useEffect(() => {
    // Only re-fetch data when rics _actually changed_
    if (JSON.stringify(previousRics) === JSON.stringify(memoizedRics)) {
      return;
    }
    setPreviousRics(memoizedRics);

    if (memoizedRics.length < 1) {
      setEsgScores([]);
      return;
    }

    setIsLoading(true);
    (async () => {
      try {
        const res = await fetchRetry(`/api/portfolio-esg-over-time`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rics: memoizedRics,
          }),
        });
        const data = await res.json();
        setEsgScores(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [memoizedRics]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className={"flex flex-col space-y-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Scores over time</h2>
        <p className={"text-neutral-700"}>
          See how your investments&apos; ESG ratings have improved over time.
        </p>
      </div>

      <div className={"h-96"}>
        <ParentSize>
          {({ width, height }) => (
            <ESGHistory data={esgScores} width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </div>
  );
}
