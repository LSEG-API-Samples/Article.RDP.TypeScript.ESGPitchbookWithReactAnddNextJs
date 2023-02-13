import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps } from "next/types";
import {
  ControversyData,
  DataResult,
  ESGScore,
  getControversies,
  getData,
  getESGScoreOverTime,
  getPeers,
  withSession,
} from "../../refinitiv";
import { ArrowLeft, PieChart, Plus, Printer, Trash2 } from "react-feather";

import { BigNumber, Card, DollarAmount } from "../../renderer";
import { PeerInsights } from "../../insights";
import { LoadingPage } from "../../spinner";
import { IndexCompanyStockComparison } from "../../indices";
import { ControversiesSection } from "../../controversies";
import { ParentSize } from "@visx/responsive";
import { ESGHistory } from "../../visualization/esgHistory";
import { usePasswordProtection } from "../../password";
import { usePortfolioStateExternal } from "../portfolio";
import { SEO } from "../../head";
import { SingleCompanySentiment } from "../../marketpsych";

export interface OrganizationProps {
  data: {
    company: DataResult;
    peers: DataResult[];
    controversies: ControversyData[];
    esgOverTime: ESGScore[];
  };
}

export default function OrganizationPage({ data }: OrganizationProps) {
  const router = useRouter();
  const { View, isUnlocked } = usePasswordProtection();
  const [portfolioState, setPortfolioState] = usePortfolioStateExternal();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <LoadingPage />;
  }

  if (!isUnlocked) {
    return View;
  }

  return (
    <>
      <SEO path={window.location.href} />

      <div className={"grid grid-cols-12 w-full"}>
        <div className={"hidden md:block col-span-1 2xl:col-span-2"} />

        <div
          className={
            "col-span-12 md:col-span-10 2xl:col-span-8 w-full p-4 print:p-0"
          }
        >
          <div className={"my-16 flex flex-col space-y-4 w-full"}>
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

            <div>
              <div className={"flex items-start"}>
                <h2 className={"text-4xl font-semibold"}>
                  <span>{data.company.CommonName}</span>{" "}
                  <span className={"text-xl text-neutral-500"}>
                    ({data.company.RIC})
                  </span>
                </h2>

                <div className={"ml-auto flex items-center space-x-1"}>
                  {portfolioState.investments.find(
                    (item) => item.ric === data.company.RIC
                  ) ? (
                    <div
                      className={"flex items-stretch bg-neutral-100 rounded-md"}
                    >
                      <Link
                        href={"/portfolio"}
                        className={
                          "items-center space-x-2 flex print:invisible px-4 py-2 rounded-l-md hover:bg-neutral-200 active:bg-neutral-300 text-sm font-medium text-neutral-800"
                        }
                      >
                        <PieChart size={16} />
                      </Link>
                      <button
                        className={
                          "items-center space-x-2 flex print:invisible px-4 py-2 rounded-r-md hover:bg-neutral-200 active:bg-neutral-300 text-sm font-medium text-neutral-800"
                        }
                        onClick={() => {
                          setPortfolioState({
                            ...portfolioState,
                            investments: portfolioState.investments.filter(
                              (item) => item.ric !== data.company.RIC
                            ),
                          });
                        }}
                      >
                        <Trash2 size={16} />
                        <span>Remove from portfolio</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className={
                        "items-center space-x-2 flex print:invisible px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-sm font-medium text-neutral-800"
                      }
                      onClick={() => {
                        setPortfolioState({
                          ...portfolioState,
                          investments: [
                            ...portfolioState.investments,
                            {
                              ric: data.company.RIC,
                              stake: 100,
                            },
                          ],
                        });
                      }}
                    >
                      <Plus size={16} />
                      <span>Add to portfolio</span>
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

              <h3 className={"text-lg font-medium text-neutral-400"}>
                {data.company.HeadquartersCountry}
              </h3>
            </div>
            <p className={"text-neutral-800 text-md"}>
              {data.company.BusinessSummary}
            </p>

            <div
              className={
                "grid grid-cols-1 print:grid-cols-3 md:grid-cols-3 gap-4"
              }
            >
              <div
                className={"col-span-1 flex flex-col space-y-2 print:space-y-1"}
              >
                <h2 className={"text-2xl font-semibold"}>Key Figures</h2>

                <DollarAmount value={data.company.EBITDA}>EBITDA</DollarAmount>

                <DollarAmount value={data.company.EnterpriseValue}>
                  Enterprise Value
                </DollarAmount>

                <Card label="ROIC (mean)">{data.company.ROICMean}%</Card>

                <DollarAmount value={data.company.MarketCap}>
                  Mkt Cap
                </DollarAmount>
              </div>

              <div className={"col-span-2 flex flex-col space-y-2 pb-4"}>
                <h2 className={"text-2xl font-semibold shrink-0 grow-0"}>
                  Past Performance
                </h2>

                <IndexCompanyStockComparison company={data.company} />
              </div>
            </div>
          </div>

          <section className={"flex flex-col space-y-4 my-4"}>
            <div>
              <h2 className={"text-2xl font-semibold"}>ESG Scores</h2>
            </div>

            <div
              className={
                "grid grid-cols-1 print:grid-cols-3 md:grid-cols-3 items-center"
              }
            >
              <div className={"flex flex-col space-y-2 col-span-1"}>
                <BigNumber value={data.company.ESGCombinedScore}>
                  Combined Score
                </BigNumber>
                <BigNumber value={data.company.ESGEnvironmentalScore}>
                  Environmental Score
                </BigNumber>
                <BigNumber value={data.company.ESGSocialScore}>
                  Social Score
                </BigNumber>
                <BigNumber value={data.company.ESGGovernanceScore}>
                  Governance Score
                </BigNumber>
              </div>

              <div className={"col-span-1 md:col-span-2"}>
                <div className={"h-96"}>
                  <ParentSize>
                    {({ width, height }) => (
                      <ESGHistory
                        trendlineColored
                        data={data.esgOverTime}
                        width={width}
                        height={height}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
            </div>
          </section>

          <PeerInsights data={data} />

          <ControversiesSection data={data} />

          <SingleCompanySentiment permId={data.company.PermID} />
        </div>

        <div className={"hidden md:block col-span-1 2xl:col-span-2"} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["AAPL.O", "MSFT.O", "GOOG.O"].map((p) => ({ params: { ric: p } })),
    fallback: true,
  };
}

// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export const getStaticProps: GetStaticProps<OrganizationProps> = async (
  context
) => {
  const RIC = context.params?.ric;
  if (typeof RIC !== "string") {
    return {
      notFound: true,
    };
  }

  // const data = mockData;

  const data = await withSession(async (session) => {
    const companyData = await getData(session, RIC);
    if (!companyData) {
      return null;
    }

    const peerData = await getPeers(session, RIC);

    const controversies = await getControversies(session, RIC);

    const esgOverTime = await getESGScoreOverTime(session, RIC);

    // const news = await getNews(session, RIC);

    return {
      company: companyData,
      peers: peerData,
      controversies,
      esgOverTime,
    };
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    // Passed to the page component as props
    props: {
      data,
    },
    // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    revalidate: 60 * 10, // Attempt to regenerate at most once every 10 minutes
  };
};
