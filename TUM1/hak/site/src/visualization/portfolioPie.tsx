import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import tw from "tailwindcss/colors";
import * as HoverCard from "@radix-ui/react-hover-card";
import { DataResult } from "../refinitiv";

export type PieProps = {
  width: number;
  height: number;
  data: {
    label: string;
    value: number;
    data: DataResult | null;
    color?: string;
  }[];
};

export function PortfolioPie({ width, height, data }: PieProps) {
  const getLetterFrequencyColor = scaleOrdinal<string, string>({
    domain: data.map((l) => l.label),
    range: [
      tw.blue[500],
      tw.green[500],
      tw.yellow[500],
      tw.red[500],
      tw.purple[500],
      tw.pink[500],
    ],
  });

  const innerWidth = width;
  const innerHeight = height;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY;
  const left = centerX;

  return (
    <svg width={width} height={height} className={"block break-inside-avoid"}>
      <Group top={top} left={left}>
        <Pie
          data={
            data.length > 0
              ? data
              : [
                  {
                    label: "No investments",
                    value: 1,
                    data: null,
                    color: tw.neutral["300"],
                  },
                ]
          }
          pieValue={(d) => d.value}
          pieSortValues={(a, b) => a - b}
          outerRadius={radius}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { label, value, data: companyData, color } = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);
              const arcFill = color || getLetterFrequencyColor(label);
              return (
                <HoverCard.Root key={`arc-${label}-${index}`}>
                  <HoverCard.Trigger asChild>
                    <g>
                      <path d={arcPath || undefined} fill={arcFill} />
                      {hasSpaceForLabel && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fill="#ffffff"
                          className={"font-medium text-sm ellipsis w-12"}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {arc.data.label}
                        </text>
                      )}
                    </g>
                  </HoverCard.Trigger>
                  <HoverCard.Portal>
                    <HoverCard.Content className="bg-neutral-50/70 backdrop-blur-xl rounded p-8 shadow-lg w-96 flex flex-col space-y-2">
                      <HoverCard.Arrow className="fill-neutral-50/70 backdrop-blur-xl" />

                      <div className={"flex flex-col space-y-8"}>
                        <div className={"flex items-center space-x-1"}>
                          <div className="font-medium">
                            {companyData?.CommonName || label}
                          </div>
                          <div className="text-sm text-neutral-700">
                            {value}
                          </div>
                        </div>
                      </div>

                      <p className={"text-neutral-700"}>
                        {companyData?.BusinessSummary?.slice(0, 200)}...
                      </p>

                      <div className={"flex text-center"}>
                        <a
                          href={`/organization/${companyData?.RIC}`}
                          className={
                            "bg-neutral-100 rounded-md w-full py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-300"
                          }
                        >
                          Learn more
                        </a>
                      </div>
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}
