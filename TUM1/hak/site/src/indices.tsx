import { DataResult, DatastreamResponse, SearchIndexResult } from "./refinitiv";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "./spinner";
import { SelectInput } from "./select";
import { PriceLineData, PriceLines } from "./visualization/prices";
import { ParentSize } from "@visx/responsive";
import { parseISO } from "date-fns";
import { fetchRetry } from "./fetch";

export function IndexCompanyStockComparison({
  company,
}: {
  company: DataResult;
}) {
  const [indices, setIndices] = useState<SearchIndexResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndexRIC, setSelectedIndexRIC] = useState<string | null>(null);

  const selectedIndex = useMemo(
    () => indices.find((i) => i.RIC === selectedIndexRIC) || null,
    [selectedIndexRIC, indices]
  );

  useEffect(() => {
    (async function () {
      try {
        const res = await fetchRetry(`/api/search-indices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: company.HeadquartersCountry,
          }),
        });

        if (!res.ok) {
          console.error(await res.text());
          return;
        }

        const data = await res.json();
        setIndices(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [company]);

  useEffect(() => {
    if (indices.length > 0 && selectedIndexRIC === null) {
      setSelectedIndexRIC(indices[0].RIC);
    }
  }, [indices, selectedIndexRIC]);

  const [indexData, setIndexData] = useState<DatastreamResponse | null>(null);

  useEffect(() => {
    if (selectedIndexRIC) {
      setIsLoading(true);
      (async function () {
        const qp = new URLSearchParams();
        qp.append("rics", [selectedIndexRIC, company.RIC].join(","));

        const res = await fetchRetry(`/api/ds-timeline-data?${qp.toString()}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ric: selectedIndexRIC,
          }),
        });

        if (!res.ok) {
          console.error(await res.text());
          return;
        }

        const data: DatastreamResponse = await res.json();
        setIndexData(data);
        setIsLoading(false);
      })();
    }
  }, [selectedIndexRIC, company]);

  const priceLineData: PriceLineData[] = useMemo(() => {
    if (!indexData) {
      return [];
    }

    const phType = indexData.dataTypes.find((dt) => dt.dataType === "PH");
    if (!phType) {
      return [];
    }

    const dates = indexData.dates.map((d) => parseISO(d).getTime());

    return phType.symbolValues
      .filter((f) => Array.isArray(f.value))
      .map((s) => {
        return {
          label:
            company.RIC === s.ric
              ? company.CommonName
              : selectedIndex?.DocumentTitle || s.ric,
          values: s.value.map((v, idx) => ({
            value: v,
            date: dates[idx],
          })),
        };
      });
  }, [indexData, company, selectedIndex]);

  if (isLoading) {
    return (
      <div
        className={"flex flex-col space-y-1 items-center grow justify-center"}
      >
        <Spinner size={6} />
        <h3 className={"text-xl font-medium"}>One moment, please.</h3>
        <span className={"text-neutral-800"}>
          Preparing performance comparison chart.
        </span>
      </div>
    );
  }

  if (indices.length === 0) {
    return <div>No indices found for {company.HeadquartersCountry}</div>;
  }

  return (
    <div className={"flex flex-col space-y-2 grow"}>
      <div className={"flex md:justify-end print:hidden"}>
        <SelectInput
          name={"Indices"}
          placeholder={"Select an index"}
          value={selectedIndexRIC}
          setValue={setSelectedIndexRIC}
          items={indices.map((i) => ({ id: i.RIC, label: i.DocumentTitle! }))}
          width={"w-full"}
        />
      </div>

      <div className={"h-96"}>
        <ParentSize>
          {({ width, height }) => (
            <PriceLines data={priceLineData} width={width} height={height} />
          )}
        </ParentSize>
      </div>
    </div>
  );
}
