import React from "react";
import { BarStack } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { LegendOrdinal } from "@visx/legend";
import { localPoint } from "@visx/event";
import { DataResult } from "../refinitiv";
import tw from "tailwindcss/colors";
type TooltipData = {
  bar: SeriesPoint<ExpectedData>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

export type BarStackProps = {
  company: DataResult;
  peers: DataResult[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

interface ExpectedData {
  CommonName: string;
  Environmental: number | null;
  Social: number | null;
  Governance: number | null;
  Combined: number | null;
}

export const ESGPeerChart = ({
  company,
  peers,
  width,
  height,
  events = false,
  margin = { top: 40, right: 0, bottom: 0, left: 0 },
}: BarStackProps) => {
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: tw.neutral["50"],
    color: tw.neutral["800"],
  };
  const data = [company, ...peers].slice(0, 6).map((d) => ({
    CommonName: d.CommonName,
    Environmental: d.ESGEnvironmentalScore,
    Social: d.ESGSocialScore,
    Governance: d.ESGGovernanceScore,
    Combined: d.ESGCombinedScore,
  }));
  const keys = ["Environmental", "Social", "Governance"];
  const tickLabels = ["Environmental", "Social", "Governance"];

  const highestScore = Math.max(
    ...data.map(
      (d) => (d.Environmental || 0) + (d.Social || 0) + (d.Governance || 0)
    )
  );

  // scales
  const nameScale = scaleBand<string>({
    domain: data.map((d) => d.CommonName),
    padding: 0.2,
  });
  const valueScale = scaleLinear<number>({
    domain: [0, highestScore],
    nice: true,
  });
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [tw.purple["400"], tw.purple["600"], tw.purple["800"]],
  });

  let tooltipTimeout: number;

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  if (width < 10) return null;
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  nameScale.rangeRound([0, xMax]);
  valueScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div className={"relative"}>
      <svg
        className={"block break-inside-avoid"}
        ref={containerRef}
        width={width}
        height={height}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={tw.neutral["50"]}
          rx={6}
        />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={nameScale}
          yScale={valueScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={nameScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          <BarStack<ExpectedData, string>
            data={data}
            keys={keys}
            x={(d) => d.CommonName}
            xScale={nameScale}
            yScale={valueScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onClick={() => {
                      if (events) {
                        // TODO Handle interactivity
                        // alert(`clicked: ${JSON.stringify(bar)}`);
                      }
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={(event) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      // TooltipInPortal expects coordinates to be relative to containerRef
                      // localPoint returns coordinates relative to the nearest SVG, which
                      // is what containerRef is set to in this example.
                      const eventSvgCoords = localPoint(event);
                      const left = bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: left,
                      });
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          tickClassName={"select-none"}
          top={yMax + margin.top}
          scale={nameScale}
          //tickFormat={formatDate}
          stroke={tw.purple["800"]}
          tickStroke={tw.purple["800"]}
          tickLabelProps={() => ({
            fill: tw.purple["800"],
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: margin.top / 2 - 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <LegendOrdinal
          className={"select-none"}
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>
            {(tooltipData.bar.data as unknown as Record<string, number>)[
              tooltipData.key
            ].toFixed(2)}
            %
          </div>

          <div>
            <small>{tooltipData.bar.data.CommonName}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
};
