import React, { useContext, useMemo } from "react";
import { extent, max, min } from "d3-array";
import colors from "tailwindcss/colors";
import { scaleLinear, scaleThreshold, scaleOrdinal } from "@visx/scale";

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  buildChartTheme,
  DataContext,
  DataProvider,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { LegendOrdinal } from "@visx/legend";
import { ESGScore } from "../refinitiv";

const customTheme = buildChartTheme({
  backgroundColor: colors.neutral["50"],
  colors: [
    colors.blue["400"],
    colors.green["400"],
    colors.yellow["400"],
    colors.red["400"],
    colors.purple["400"],
    colors.pink["400"],
    colors.orange["400"],
  ],
  gridColor: colors.neutral["200"],
  gridColorDark: colors.neutral["300"],
  svgLabelSmall: { fill: "#30475e" },
  svgLabelBig: { fill: "#30475e" },
  tickLength: 4,
});

function reverseCopy<T>(arr: T[]) {
  const copy = [...arr];
  copy.reverse();
  return copy;
}

export function ESGHistory({
  width,
  height,
  data,
  trendlineColored,
}: {
  width: number;
  height: number;
  data: ESGScore[];
  trendlineColored?: boolean;
}) {
  const groupedByRic = useMemo(() => {
    const map = new Map<string, ESGScore[]>();
    for (const d of data) {
      if (!map.has(d.ric)) {
        map.set(d.ric, []);
      }
      map.get(d.ric)?.push(d);
    }
    return Array.from(map.values());
  }, [data]);

  return (
    <DataProvider
      theme={customTheme}
      xScale={{
        type: "time",
        nice: true,
      }}
      yScale={{
        type: "radial",
      }}
    >
      <XYChart height={height} width={width}>
        <AnimatedAxis orientation="bottom" tickClassName={"select-none"} />
        <AnimatedAxis
          orientation="right"
          tickClassName={"select-none"}
          tickFormat={(c) => `${c}%`}
        />

        <AnimatedGrid columns={false} numTicks={4} />

        {groupedByRic.map((d, i) => (
          <RenderGroup data={d} key={i} trendlineColored={trendlineColored} />
        ))}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => {
            const nearestDatum = tooltipData?.nearestDatum
              ?.datum as ESGScore | null;
            if (
              !nearestDatum ||
              !nearestDatum.date ||
              !nearestDatum.scoreCombined
            ) {
              return null;
            }

            return (
              <div>
                <span>{new Date(nearestDatum.date).toLocaleString()}</span>

                <div
                  style={{
                    color: colorScale ? colorScale(nearestDatum.ric) : "black",
                  }}
                >
                  <span>
                    {nearestDatum.ric}: {nearestDatum.scoreCombined.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          }}
        />
      </XYChart>
      {groupedByRic.length > 1 ? <ChartLegend /> : null}
    </DataProvider>
  );
}

function RenderGroup({
  data,
  trendlineColored,
}: {
  data: ESGScore[];
  trendlineColored?: boolean;
}) {
  const sortedData = useMemo(
    () => data.sort((a, b) => a.date - b.date),
    [data]
  );
  const lastToFirst = useMemo(() => reverseCopy(sortedData), [sortedData]);

  const isPositiveTrend = useMemo(() => {
    if (lastToFirst.length < 2) {
      return false;
    }
    const lastValue = lastToFirst[0].scoreCombined;
    const firstValue = lastToFirst[1].scoreCombined;

    return lastValue > firstValue;
  }, [lastToFirst]);

  return (
    <AnimatedLineSeries
      colorAccessor={
        trendlineColored
          ? (k) => (isPositiveTrend ? colors.green["400"] : colors.red["400"])
          : undefined
      }
      dataKey={data[0].ric}
      data={sortedData}
      xAccessor={(d) => (d ? d.date : 0)}
      yAccessor={(i) =>
        scaleLinear({
          domain: extent(data, (v) => v.scoreCombined) as [number, number],
          range: extent(data, (v) => v.scoreCombined) as [number, number],
        })(i.scoreCombined)
      }
    />
  );
}

const ChartLegend = () => {
  const { colorScale, theme, margin } = useContext(DataContext);

  return (
    <LegendOrdinal
      direction="row"
      itemMargin="8px 8px 8px 0"
      scale={colorScale!}
      labelFormat={(label) => label.replace("-", " ")}
      legendLabelProps={{ color: "white" }}
      shape="line"
      style={{
        marginTop: -24,
        paddingLeft: margin!.left,

        color: "black",
        display: "flex", // required in addition to `direction` if overriding styles
      }}
    />
  );
};
