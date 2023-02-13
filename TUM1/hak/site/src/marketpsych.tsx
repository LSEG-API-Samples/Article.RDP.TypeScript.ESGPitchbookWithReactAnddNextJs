import { LoadingState, PortfolioState } from "./pages/portfolio";
import React, { useEffect, useMemo, useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Info } from "react-feather";
import classNames from "classnames";
import { DataResult } from "./refinitiv";
import { fetchRetry } from "./fetch";

interface MarketPsychDataRecord {
  id: string;
  assetCode: string;
  ticker: string;
  windowTimestamp: string;
  dataType: "News" | "Social" | "News_Social" | "News_Headline";
  systemVersion: string;
  mentions: number;
  buzz: number;
  sentiment: number;
  negative: number;
  positive: number;
  optimism: number;
  pessimism: number;
  joy: number;
  loveHate: number;
  trust: number;
  anger: number;
  disagreement: number;
  fear: number;
  gloom: number;
  stress: number;
  surprise: number;
  timeUrgency: number;
  uncertainty: number;
  violence: number;
  emotionVsFact: number;
  shortVsLongTerm: number;
  longShort: number;
  longShortForecast: number;
  priceDirection: number;
  priceDown: number;
  priceForecast: number;
  priceUp: number;
  marketRisk: number;
  topVsBottom: number;
  overvaluedVsUndervalued: number;
  volatility: number;
  analystRating: number;
  debtDefault: number;
  dividends: number;
  innovation: number;
  earningsDirection: number;
  earningsForecast: number;
  accountingSentiment: number;
  accountingNegative: number;
  accountingPositive: number;
  accountingRestatement: number;
  revenueDirection: number;
  revenueForecast: number;
  intangiblesSentiment: number;
  productSentiment: number;
  laborDispute: number;
  layoffs: number;
  litigation: number;
  insiderLongShort: number;
  managementSentiment: number;
  managementChange: number;
  managementTrust: number;
  partnership: number;
  mergers: number;
  cyberCrime: number;
  futureVsPast: number;
}

export function SingleCompanySentiment({ permId }: { permId: string }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MarketPsychDataRecord[]>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const params = new URLSearchParams();
        params.append("permId", permId);
        const res = await fetchRetry(
          `/api/sentiment-data?${params.toString()}`
        );
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [permId]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <section className={"flex flex-col space-y-4 my-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Sentiment</h2>

        <span className={"text-neutral-500"}>
          Understand the market sentiment around a company. Data for the last 24
          hours.
        </span>
      </div>

      {data.length > 0 ? (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {data.map((record, idx) => (
            <RenderSentiment key={idx} record={record} />
          ))}
        </div>
      ) : (
        <div
          className={
            "px-4 py-32 bg-neutral-50 flex items-center justify-center rounded-md"
          }
        >
          <span className={"text-sm text-neutral-700"}>
            No sentiment data found.
          </span>
        </div>
      )}
    </section>
  );
}

export function MultiCompanySentiment({
  data,
  state,
}: {
  data: DataResult[];
  state: PortfolioState;
}) {
  const permIds = useMemo(() => data.map((d) => d.PermID), [data]);
  const [isLoading, setLoading] = useState(true);
  const [fetchedRecords, setFetchedRecords] = useState<MarketPsychDataRecord[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const params = new URLSearchParams();
        params.append("permIds", permIds.join(","));
        const res = await fetchRetry(
          `/api/sentiment-data-multi?${params.toString()}`
        );
        const data = await res.json();
        setFetchedRecords(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [permIds]);

  const mergedRecords = useMemo<MarketPsychDataRecord[]>(() => {
    // group records by type and merge into one record per type
    const recordsByType = fetchedRecords.reduce((acc, record) => {
      acc[record.dataType] = acc[record.dataType] || [];
      acc[record.dataType].push(record);
      return acc;
    }, {} as Record<MarketPsychDataRecord["dataType"], MarketPsychDataRecord[]>);

    return Object.entries(recordsByType).map(([type, records]) => {
      const getStake = (r: MarketPsychDataRecord) => {
        const dataItem = data.find((d) => d.PermID === r.assetCode);
        if (!dataItem) {
          return 0;
        }

        const portfolioItem = state.investments.find(
          (i) => i.ric === dataItem.RIC
        );
        if (!portfolioItem) {
          return 0;
        }

        return (
          portfolioItem.stake /
          state.investments.reduce((acc, i) => acc + i.stake, 0)
        );
      };

      const rec: MarketPsychDataRecord = {
        dataType: type as MarketPsychDataRecord["dataType"],
        sentiment:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.sentiment,
            0
          ) / records.length,
        mentions:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.mentions,
            0
          ) / records.length,
        buzz:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.buzz,
            0
          ) / records.length,
        positive:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.positive,
            0
          ) / records.length,
        negative:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.negative,
            0
          ) / records.length,
        optimism:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.optimism,
            0
          ) / records.length,
        pessimism:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.pessimism,
            0
          ) / records.length,
        joy:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.joy,
            0
          ) / records.length,
        loveHate:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.loveHate,
            0
          ) / records.length,
        trust:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.trust,
            0
          ) / records.length,
        anger:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.anger,
            0
          ) / records.length,
        disagreement:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.disagreement,
            0
          ) / records.length,
        fear:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.fear,
            0
          ) / records.length,
        gloom:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.gloom,
            0
          ) / records.length,
        stress:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.stress,
            0
          ) / records.length,
        surprise:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.surprise,
            0
          ) / records.length,
        timeUrgency:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.timeUrgency,
            0
          ) / records.length,
        uncertainty:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.uncertainty,
            0
          ) / records.length,
        violence:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.violence,
            0
          ) / records.length,
        emotionVsFact:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.emotionVsFact,
            0
          ) / records.length,
        shortVsLongTerm:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.shortVsLongTerm,
            0
          ) / records.length,
        longShort:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.longShort,
            0
          ) / records.length,
        priceDirection:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.priceDirection,
            0
          ) / records.length,
        priceForecast:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.priceForecast,
            0
          ) / records.length,
        dividends:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.dividends,
            0
          ) / records.length,
        accountingSentiment:
          records.reduce(
            (acc, record) =>
              acc + getStake(record) * record.accountingSentiment,
            0
          ) / records.length,
        accountingRestatement:
          records.reduce(
            (acc, record) =>
              acc + getStake(record) * record.accountingRestatement,
            0
          ) / records.length,
        productSentiment:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.productSentiment,
            0
          ) / records.length,
        accountingNegative:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.accountingNegative,
            0
          ) / records.length,
        accountingPositive:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.accountingPositive,
            0
          ) / records.length,
        analystRating:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.analystRating,
            0
          ) / records.length,
        assetCode: "merged",
        cyberCrime:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.cyberCrime,
            0
          ) / records.length,
        debtDefault:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.debtDefault,
            0
          ) / records.length,
        earningsDirection:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.earningsDirection,
            0
          ) / records.length,
        earningsForecast:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.earningsForecast,
            0
          ) / records.length,
        futureVsPast:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.futureVsPast,
            0
          ) / records.length,
        id: "merged",
        innovation:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.innovation,
            0
          ) / records.length,
        insiderLongShort:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.insiderLongShort,
            0
          ) / records.length,
        intangiblesSentiment:
          records.reduce(
            (acc, record) =>
              acc + getStake(record) * record.intangiblesSentiment,
            0
          ) / records.length,
        laborDispute:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.laborDispute,
            0
          ) / records.length,
        layoffs:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.layoffs,
            0
          ) / records.length,
        litigation:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.litigation,
            0
          ) / records.length,
        longShortForecast:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.longShortForecast,
            0
          ) / records.length,
        managementChange:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.managementChange,
            0
          ) / records.length,
        managementSentiment:
          records.reduce(
            (acc, record) =>
              acc + getStake(record) * record.managementSentiment,
            0
          ) / records.length,
        managementTrust:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.managementTrust,
            0
          ) / records.length,
        marketRisk:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.marketRisk,
            0
          ) / records.length,
        mergers:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.mergers,
            0
          ) / records.length,
        overvaluedVsUndervalued:
          records.reduce(
            (acc, record) =>
              acc + getStake(record) * record.overvaluedVsUndervalued,
            0
          ) / records.length,
        partnership:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.partnership,
            0
          ) / records.length,
        priceDown:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.priceDown,
            0
          ) / records.length,
        priceUp:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.priceUp,
            0
          ) / records.length,
        revenueDirection:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.revenueDirection,
            0
          ) / records.length,
        revenueForecast:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.revenueForecast,
            0
          ) / records.length,
        systemVersion: "merged",
        ticker: "merged",
        topVsBottom:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.topVsBottom,
            0
          ) / records.length,
        volatility:
          records.reduce(
            (acc, record) => acc + getStake(record) * record.volatility,
            0
          ) / records.length,
        windowTimestamp: "merged",
      };
      return rec;
    });
  }, [fetchedRecords, state]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <section className={"flex flex-col space-y-4 my-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Sentiment</h2>

        <span className={"text-neutral-500"}>
          Understand the market sentiment around a company. Data for the last 24
          hours.
        </span>
      </div>

      {mergedRecords.length > 0 ? (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {mergedRecords.map((record, idx) => (
            <RenderSentiment key={idx} record={record} />
          ))}
        </div>
      ) : (
        <div
          className={
            "px-4 py-32 bg-neutral-50 flex items-center justify-center rounded-md"
          }
        >
          <span className={"text-sm text-neutral-700"}>
            No sentiment data found.
          </span>
        </div>
      )}
    </section>
  );
}

function renderTypeName(record: MarketPsychDataRecord) {
  switch (record.dataType) {
    case "News":
      return "News";
    case "Social":
      return "Social";
    case "News_Social":
      return "News & Social";
    case "News_Headline":
      return "News Headlines";
  }
}

function RenderSentiment({ record }: { record: MarketPsychDataRecord }) {
  const isNegative = record.sentiment < 0;
  const isPositive = record.sentiment > 0;

  if (record.buzz === 0) {
    return (
      <div className={"p-2 bg-neutral-50 rounded-md flex flex-col space-y-2"}>
        <span className={"text-neutral-700"}>{renderTypeName(record)}</span>

        <span className={"text-neutral-500"}>No values were detected.</span>
      </div>
    );
  }

  switch (record.dataType) {
    case "News":
    case "News_Headline":
    case "News_Social":
    case "Social":
      return (
        <div
          className={classNames(
            "p-2 bg-neutral-50 rounded-md flex flex-col space-y-2",
            {
              "bg-red-50": isNegative,
              "bg-green-50": isPositive,
            }
          )}
        >
          <span className={"text-neutral-700"}>{renderTypeName(record)}</span>

          <RenderData
            label={"Sentiment"}
            value={record.sentiment}
            type={"range"}
            description={
              "Overall positive references, net of negative references."
            }
          />

          <RenderData
            label={"Mentions"}
            value={record.mentions}
            description={
              "The mentions fields contains a count of entity names (aliases) identified in the source text. For example, in a news article about Apple Inc, the company may be referenced by various aliases including “Apple Inc,” “Apple,” “AAPL”, “NASDAQ:AAPL”, and “AAPL.OQ”. The mentions value is a count of all such company aliases identified in the text."
            }
          />
          <RenderData
            label={"Buzz"}
            value={record.buzz}
            description={
              "The buzz fields represent a sum of entity-specific words and phrases used in RMA computations. For example, in the phrase “less concerned” the score of the word “concerned” is minimized by “less”."
            }
          />

          <RenderData
            label={"Optimism"}
            value={record.optimism}
            type={"ratio"}
            description={"connoting optimism, future-tense positive"}
          />

          <RenderData
            label={"Trust"}
            value={record.trust}
            type={"range"}
            description={
              "trustworthiness, net of references connoting corruption"
            }
          />

          <RenderData
            label={"Uncertainty"}
            value={record.uncertainty}
            type={"ratio"}
            description={"uncertainty and confusion"}
          />
        </div>
      );
  }
}

function RenderData({
  value,
  description,
  label,
  type,
}: {
  label: string;
  value: number;
  description: string;
  type?: "range" | "ratio";
}) {
  return (
    <div className={"grid grid-cols-12"}>
      <div className={"col-span-4"}>
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <div className={"flex items-center space-x-1"}>
              <span className={"text-sm font-medium"}>{label}</span>
              <Info size={14} />
            </div>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className="bg-neutral-50/70 backdrop-blur-xl rounded p-8 shadow-lg w-96 flex flex-col space-y-2">
              <HoverCard.Arrow className="fill-neutral-50/70 backdrop-blur-xl" />

              <p className={"text-neutral-700"}>{description}</p>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
      <div className={"col-span-8"}>
        {value !== null ? (
          <span
            className={classNames("text-neutral-500 font-mono text-sm", {
              "text-green-500":
                (type === "range" && value > 0) ||
                (type === "ratio" && value > 0.5),
              "text-red-500":
                (type === "range" && value < 0) ||
                (type === "ratio" && value < 0.5),
            })}
          >
            {value % 1 === 0 ? value : value.toFixed(2)}
          </span>
        ) : (
          <span className={"text-neutral-300"}>-</span>
        )}
      </div>
    </div>
  );
}
