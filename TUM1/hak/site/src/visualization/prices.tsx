import React, { useContext } from "react";
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

export interface PriceLineData {
  label: string;
  values: Array<PriceLineItem>;
}
interface PriceLineItem {
  date: number;
  value: number | null;
}

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

export function PriceLines({
  width,
  height,
  data,
}: {
  width: number;
  height: number;
  data: PriceLineData[];
}) {
  const firstLine = data[0];
  if (!firstLine) {
    return null;
  }

  return (
    <DataProvider
      theme={customTheme}
      xScale={{ type: "time", nice: true }}
      yScale={{
        type: "radial",
      }}
    >
      <XYChart height={height} width={width}>
        <AnimatedAxis orientation="bottom" tickClassName={"select-none"} />

        <AnimatedGrid columns={false} numTicks={4} />

        {data.map((d, idx) => {
          // scale lines to first line
          const scaleLine = (l: PriceLineData) =>
            scaleLinear({
              domain: extent(l.values, (v) => v.value) as [number, number],
              range: extent(firstLine.values, (v) => v.value) as [
                number,
                number
              ],
            });

          return (
            <AnimatedLineSeries
              key={idx}
              // colorAccessor={() => colors(d.label)}
              dataKey={d.label}
              data={d.values}
              xAccessor={(d) => (d ? d.date : 0)}
              yAccessor={(i) =>
                i.value !== null && d ? scaleLine(d)(i.value) : null
              }
            />
          );
        })}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => {
            const nearestDatum = tooltipData?.nearestDatum
              ?.datum as PriceLineItem | null;
            if (!nearestDatum) {
              return null;
            }

            const allValues = data.map((d) => {
              const value = d.values.find((v) => v.date === nearestDatum.date);
              return {
                label: d.label,
                value: value?.value,
              };
            });

            return (
              <div>
                <span>{new Date(nearestDatum.date).toLocaleString()}</span>
                {allValues.map((v, idx) => (
                  <div
                    key={idx}
                    style={{
                      color: colorScale ? colorScale(v.label) : "black",
                    }}
                  >
                    <span>
                      {v.label}: ${v.value}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </XYChart>
      <ChartLegend />
    </DataProvider>
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
