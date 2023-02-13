import { Info, X } from "react-feather";
import { ParentSize } from "@visx/responsive";
import { ESGPeerChart } from "./visualization/esgPeers";
import * as HoverCard from "@radix-ui/react-hover-card";
import { DataResult } from "./refinitiv";
import { useMemo, useState } from "react";
import { MissingData, Number, PercentNumber } from "./renderer";
import { SelectInput } from "./select";
import classNames from "classnames";

interface InsightsItem {
  label: string;
  value?: number | null;
  peerValue?: number | null;
  otherPeers: Array<{ name: string; value: number | null }>;
  peerAverage: number | null;
  peerMax: number | null;
  description: string;
  kind: "percent" | "number";
  unit?: "GJ" | "m3" | "tonnes" | "USD";

  compare: (
    a: number | null | undefined,
    b: number | null | undefined
  ) => number;
}

function topPerformer(
  company: DataResult,
  peer: DataResult | null,
  item: InsightsItem
) {
  const possibleValues = [
    {
      name: company.CommonName,
      value: item.value,
    },
  ];

  if (peer) {
    possibleValues.push({
      name: peer.CommonName,
      value: item.peerValue,
    });
  }

  if (item.otherPeers) {
    possibleValues.push(...item.otherPeers);
  }

  const sorted = possibleValues.sort((a, b) => item.compare(a.value, b.value));

  return sorted[sorted.length - 1];
}

function getLowest(values: Array<number | null>) {
  return values.reduce((a, b) => {
    if (a === null) {
      return b;
    }

    if (b === null) {
      return a;
    }

    return Math.min(a, b);
  }, null);
}

function getHighest(values: Array<number | null>) {
  return values.reduce((a, b) => {
    if (a === null) {
      return b;
    }

    if (b === null) {
      return a;
    }

    return Math.max(a, b);
  }, null);
}

interface InsightsSection {
  title: string;
  items: InsightsItem[];
}

function sectionTopPerformer(
  company: DataResult,
  peer: DataResult | null,
  section: InsightsSection
) {
  // count which company has the most top performers
  const topPerformers = section.items.map((item) =>
    topPerformer(company, peer, item)
  );
  const topPerformersCount = topPerformers.reduce((acc, cur) => {
    acc[cur.name] = (acc[cur.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sorted = Object.entries(topPerformersCount).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

export function PeerInsights({
  data,
}: {
  data: { company: DataResult; peers: DataResult[] };
}) {
  const [selectedPeer, setSelectedPeer] = useState<string | null>(null);
  const peerData = useMemo(
    () => data?.peers?.find((p) => p.RIC === selectedPeer) || null,
    [selectedPeer, data]
  );

  const peerAverageDiagram: DataResult | null = useMemo(() => {
    if (!data?.peers) {
      return null;
    }

    const res: DataResult = {
      PermID: "average",
      CommonName: "Peer Average",
      RIC: "Peer Average",
      ESGEnvironmentalScore:
        data.peers.reduce((acc, p) => acc + (p.ESGEnvironmentalScore || 0), 0) /
        data.peers.length,
      ESGSocialScore:
        data.peers.reduce((acc, p) => acc + (p.ESGSocialScore || 0), 0) /
        data.peers.length,
      ESGGovernanceScore:
        data.peers.reduce((acc, p) => acc + (p.ESGGovernanceScore || 0), 0) /
        data.peers.length,
      ESGCombinedScore: null,
      ROICMean: null,
      HeadquartersCountry: null,
      ESGReportingScope: null,
      ESGControversiesScore: null,
      ESGResourceUseScore: null,
      MarketCap: 0,
      Revenue: 0,
      EBITDA: 0,
      EnterpriseValue: 0,
      BusinessSummary: null,
      PriceClose: 0,
      ESGEmissionsScore: null,
      Volume: 0,
      ESGCombinedScoreIncludingControversies: null,
      EnergyUseTotal: null,
      RenewableEnergyUseRatio: null,
      WasteTotal: null,
      WaterWithdrawalTotal: null,
      CO2EquivalentEmissionsDirectScope1: null,
      CO2EquivalentEmissionsIndirectScope2: null,
      CO2EquivalentEmissionsIndirectScope3: null,
      CO2EquivalentEmissionsTotal: null,
      BoardCulturalDiversity: null,
      BoardGenderDiversity: null,
      BoardSpecificSkills: null,
      ExecutiveMembersGenderDiversity: null,
      ExecutivesCulturalDiversity: null,
      DonationsRevenueInMillions: null,
      HumanRightsScore: null,
      EmployeeSatisfaction: null,
      WorkforceScore: null,
    };

    return res;
  }, [data.peers]);

  const insightsSections: InsightsSection[] = useMemo(() => {
    const sections: InsightsSection[] = [
      {
        title: "General",
        items: [
          {
            label: "Controversies Score",
            description:
              "ESG controversies category score measures a company's exposure to environmental, social and governance controversies and negative events reflected in global media.",
            kind: "percent",
            value: data?.company?.ESGControversiesScore,
            peerValue: peerData?.ESGControversiesScore,
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.ESGControversiesScore,
            })),
            compare: (a, b) => (a && b ? a - b : 0),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.ESGControversiesScore || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.ESGControversiesScore)),
          },
          {
            label: "Reporting Scope",
            kind: "percent",
            description:
              "The percentage of the company’s activities covered in its Environmental and Social reporting. - take scope as reported by the company - data on the percentage of the company’s activities covered in its environmental and social reporting - if extra financial reporting covers all of the company's global activities, then the scope is 100% - if the scope is not provided, we need to determine using the priority order as follows: (1) percentage of employees covered; (2) percentage of revenue covered; or (3) percentage of operations covered - when we have 2 different scopes relating to social and environmental coverage, consider the lowest value",
            value: data?.company?.ESGReportingScope,
            peerValue: peerData?.ESGReportingScope,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.ESGReportingScope,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.ESGReportingScope || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(
              data.peers.map((p) => p.ESGReportingScope || null)
            ),
          },
        ],
      },
      {
        title: "Resource use",
        items: [
          {
            label: "Energy Use Total",
            kind: "number",
            unit: "GJ",
            description:
              "Total direct and indirect energy consumption in gigajoules. - the total amount of energy that has been consumed within the boundaries of the company's operations - total energy use = total direct energy consumption + indirect energy consumption - purchased energy and produced energy are included in total energy use - for utilities, transmission/ grid loss as part of its business activities is considered as total energy consumed and data not to consider electricity produced to answer energy use (utility company produce to sell ) - for utilities, raw materials such as coal, gas or nuclear used in the production of energy are not considered under ‘total energy use’",
            value: data?.company?.EnergyUseTotal,
            peerValue: peerData?.EnergyUseTotal,
            // the lower the better
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.EnergyUseTotal,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.EnergyUseTotal || 0),
                0
              ) / [...data.peers].length,
            peerMax: getLowest(data.peers.map((p) => p.EnergyUseTotal)),
          },
          {
            label: "Water Withdrawal Total",
            kind: "number",
            unit: "m3",
            description: `Total water withdrawal in cubic meters. - the total volume of water withdrawn from any water source that was either withdrawn directly by the reporting organization or through intermediaries such as water utilities - different sources of water like well, town/utility/municipal water, river water, surface water, etc are considered`,
            value: data?.company?.WaterWithdrawalTotal,
            peerValue: peerData?.WaterWithdrawalTotal,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.WaterWithdrawalTotal,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.WaterWithdrawalTotal || 0),
                0
              ) / [...data.peers].length,

            peerMax: getLowest(data.peers.map((p) => p.WaterWithdrawalTotal)),
          },
          {
            label: "Renewable Energy Use Ratio",
            kind: "percent",
            description: `Total energy purchased from primary renewable energy sources divided by total energy use.`,
            value: data?.company?.RenewableEnergyUseRatio,
            peerValue: peerData?.RenewableEnergyUseRatio,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.RenewableEnergyUseRatio,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.RenewableEnergyUseRatio || 0),
                0
              ) / [...data.peers].length,

            peerMax: getHighest(
              data.peers.map((p) => p.RenewableEnergyUseRatio)
            ),
          },
        ],
      },
      {
        title: "Waste and emissions",
        items: [
          {
            label: "Waste Total",
            kind: "number",
            unit: "tonnes",
            description: `Total amount of waste produced in tonnes. - total waste = non-hazardous waste + hazardous waste - only solid waste is taken into consideration, exceptionally if liquid waste reported in ‘ton’ then we do the summation to derive total including liquid waste - for sector like mining, oil & gas, waste generation like tailings, waste rock, coal and fly ash, etc are also considered`,
            value: data?.company?.WasteTotal,
            peerValue: peerData?.WasteTotal,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.WasteTotal,
            })),
            peerAverage:
              [...data.peers].reduce((acc, p) => acc + (p.WasteTotal || 0), 0) /
              [...data.peers].length,
            peerMax: getLowest(data.peers.map((p) => p.WasteTotal)),
          },
          {
            label: "CO2 Equivalent Emissions Total",
            description: `Total Carbon dioxide (CO2) and CO2 equivalents emission in tonnes. - following gases are relevant : carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), hydrofluorocarbons (HFCS), perfluorinated compound (PFCS), sulfur hexafluoride (SF6), nitrogen trifluoride (NF3) - total CO2 emission = direct (scope1) + indirect (scope 2) - we follow green house gas (GHG) protocol for all our emission classifications by type`,
            kind: "number",
            unit: "tonnes",
            value: data?.company?.CO2EquivalentEmissionsTotal,
            peerValue: peerData?.CO2EquivalentEmissionsTotal,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.CO2EquivalentEmissionsTotal,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.CO2EquivalentEmissionsTotal || 0),
                0
              ) / [...data.peers].length,
            peerMax: getLowest(
              data.peers.map((p) => p.CO2EquivalentEmissionsTotal)
            ),
          },
          {
            label: "CO2 Emissions Direct, Scope 1",
            description: `Direct of CO2 and CO2 equivalents emission in tonnes. - direct emissions from sources that are owned or controlled by the company (scope 1 emissions) - following gases are relevant : carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), hydrofluorocarbons (HFCS), perfluorinated compound (PFCS), sulfur hexafluoride (SF6), nitrogen trifluoride (NF3) - we follow green house gas (GHG) protocol for all our emission classifications by type`,
            kind: "number",
            unit: "tonnes",
            value: data?.company?.CO2EquivalentEmissionsDirectScope1,
            peerValue: peerData?.CO2EquivalentEmissionsDirectScope1,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.CO2EquivalentEmissionsDirectScope1,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.CO2EquivalentEmissionsDirectScope1 || 0),
                0
              ) / [...data.peers].length,
            peerMax: getLowest(
              data.peers.map((p) => p.CO2EquivalentEmissionsDirectScope1)
            ),
          },
          {
            label: "CO2 Emissions Indirect, Scope 2",
            description: `Indirect of CO2 and CO2 equivalents emission in tonnes. - indirect emissions from consumption of purchased electricity, heat or steam which occur at the facility where electricity, steam or heat is generated (scope 2 emissions) - following gases are relevant : carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), hydrofluorocarbons (HFCS), perfluorinated compound (PFCS), sulfur hexafluoride (SF6), nitrogen trifluoride (NF3) - we follow green house gas (GHG) protocol for all our emission classifications by type`,
            kind: "number",
            unit: "tonnes",
            value: data?.company?.CO2EquivalentEmissionsIndirectScope2,
            peerValue: peerData?.CO2EquivalentEmissionsIndirectScope2,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.CO2EquivalentEmissionsIndirectScope2,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.CO2EquivalentEmissionsIndirectScope2 || 0),
                0
              ) / [...data.peers].length,
            peerMax: getLowest(
              data.peers.map((p) => p.CO2EquivalentEmissionsIndirectScope2)
            ),
          },
          {
            label: "CO2 Emissions Indirect, Scope 3",
            description: `Total CO2 and CO2 Scope Three equivalent emission in tonnes. - scope 3 includes emissions from contractor-owned vehicles, employee business travel (by rail or air), waste disposal, outsourced activities - emissions from product use by customers, emission from the production of purchased materials, emissions from electricity purchased for resale - following gases are relevant : carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), hydrofluorocarbons (HFCs), perfluorinated compound (PFC), sulfur hexafluoride (SF6), nitrogen trifluoride (NF3) - we follow green house gas (GHG) protocol for all our emission classifications by type`,
            kind: "number",
            unit: "tonnes",
            value: data?.company?.CO2EquivalentEmissionsIndirectScope3,
            peerValue: peerData?.CO2EquivalentEmissionsIndirectScope3,
            compare: (a, b) => (a && b ? b - a : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.CO2EquivalentEmissionsIndirectScope3,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.CO2EquivalentEmissionsIndirectScope3 || 0),
                0
              ) / [...data.peers].length,
            peerMax: getLowest(
              data.peers.map((p) => p.CO2EquivalentEmissionsIndirectScope3)
            ),
          },
        ],
      },
      {
        title: "Social",
        items: [
          {
            label: "Workforce Score",
            description:
              "Workforce category score measures a company's effectiveness towards job satisfaction, healthy and safe workplace, maintaining diversity and equal opportunities, and development opportunities for its workforce.",
            value: data?.company?.WorkforceScore,
            peerValue: peerData?.WorkforceScore,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.WorkforceScore,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.WorkforceScore || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.WorkforceScore)),
            kind: "percent",
          },
          {
            label: "Employee Satisfaction",
            description: `The percentage of employee satisfaction as reported by the company. - the overall percentage of employees who are satisfied - includes employees satisfaction index - if the base or index is available then employees satisfaction percentage = employees satisfaction unit/base value *100`,
            kind: "percent",
            value: data?.company?.EmployeeSatisfaction,
            peerValue: peerData?.EmployeeSatisfaction,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.EmployeeSatisfaction,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.EmployeeSatisfaction || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.EmployeeSatisfaction)),
          },
          {
            label: `Human Rights Score`,
            description: `Human rights category score measures a company's effectiveness towards respecting the fundamental human rights conventions.`,
            kind: "percent",
            value: data?.company?.HumanRightsScore,
            peerValue: peerData?.HumanRightsScore,
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.HumanRightsScore,
            })),
            compare: (a, b) => (a && b ? a - b : 0),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.HumanRightsScore || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.HumanRightsScore)),
          },
          {
            label: "Donations / Million in Revenue",
            description: `Total amount of all donations divided by net sales or revenue in million.`,
            kind: "number",
            unit: "USD",
            value: data?.company?.DonationsRevenueInMillions,
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.DonationsRevenueInMillions || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(
              data.peers.map((p) => p.DonationsRevenueInMillions)
            ),
            peerValue: peerData?.DonationsRevenueInMillions,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.DonationsRevenueInMillions,
            })),
          },
        ],
      },
      {
        title: "Governance",
        items: [
          {
            label: "Board Gender Diversity",
            description: `Percentage of female on the board.`,
            kind: "percent",
            value: data?.company?.BoardGenderDiversity,
            peerValue: peerData?.BoardGenderDiversity,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.BoardGenderDiversity,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.BoardGenderDiversity || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.BoardGenderDiversity)),
          },
          {
            label: "Board Specific Skils",
            description: `Percentage of board members who have either an industry specific background or a strong financial background.`,
            kind: "percent",
            value: data?.company?.BoardSpecificSkills,
            peerValue: peerData?.BoardSpecificSkills,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.BoardSpecificSkills,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.BoardSpecificSkills || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(data.peers.map((p) => p.BoardSpecificSkills)),
          },
          {
            label: "Board Cultural Diversity",
            description: `Percentage of board members that have a cultural background different from the location of the corporate headquarters.`,
            kind: "percent",
            value: data?.company?.BoardCulturalDiversity,
            peerValue: peerData?.BoardCulturalDiversity,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.BoardCulturalDiversity,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.BoardCulturalDiversity || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(
              data.peers.map((p) => p.BoardCulturalDiversity)
            ),
          },
          {
            label: "Executive Members Gender Diversity",
            description: `Percentage of female executive members.`,
            value: data?.company?.ExecutiveMembersGenderDiversity,
            peerMax: getHighest(
              data.peers.map((p) => p.ExecutiveMembersGenderDiversity)
            ),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.ExecutiveMembersGenderDiversity || 0),
                0
              ) / [...data.peers].length,
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.ExecutiveMembersGenderDiversity,
            })),
            kind: "percent",
            compare: (a, b) => (a && b ? a - b : 0),
            peerValue: peerData?.ExecutiveMembersGenderDiversity,
          },
          {
            label: "Executives Cultural Diversity",
            description: `Percentage of senior executives that have a cultural background different from the location of the corporate headquarters.`,
            kind: "percent",
            value: data?.company?.ExecutivesCulturalDiversity,
            peerValue: peerData?.ExecutivesCulturalDiversity,
            compare: (a, b) => (a && b ? a - b : 0),
            otherPeers: data.peers.map((p) => ({
              name: p.CommonName,
              value: p.ExecutivesCulturalDiversity,
            })),
            peerAverage:
              [...data.peers].reduce(
                (acc, p) => acc + (p.ExecutivesCulturalDiversity || 0),
                0
              ) / [...data.peers].length,
            peerMax: getHighest(
              data.peers.map((p) => p.ExecutivesCulturalDiversity)
            ),
          },
        ],
      },
    ];

    return sections;
  }, [data.company, data.peers, peerData]);

  const topPerformers = useMemo(() => {
    if (!data || !data.peers || !peerData) {
      return null;
    }
    const topPerformers: Record<string, string> = {};
    insightsSections.forEach(
      (s) =>
        (topPerformers[s.title] = sectionTopPerformer(
          data.company,
          peerData,
          s
        ))
    );
    return topPerformers;
  }, [data, peerData, insightsSections]);

  const displayedData = useMemo(() => {
    const data: DataResult[] = [];
    if (peerData) {
      data.push(peerData);
    }
    if (peerAverageDiagram) {
      data.push(peerAverageDiagram);
    }
    return data;
  }, [peerData, peerAverageDiagram]);

  return (
    <section className={"flex flex-col space-y-4 my-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Insights</h2>

        <span className={"text-neutral-500"}>
          Data retrieved for the last financial year, select a peer to get
          started.
        </span>
      </div>

      <div
        className={
          "grid grid-cols-5 sticky top-0 items-center gap-6 z-20 bg-white"
        }
      >
        <div className={"hidden md:block col-span-1"} />

        <div className={"col-span-2 md:col-span-1 flex justify-center"}>
          <span className={"whitespace-nowrap truncate"}>
            {data.company.CommonName}
          </span>
        </div>

        <div className={"col-span-1 flex justify-center"}>
          <div className={"flex space-x-2 items-center print:hidden"}>
            <SelectInput
              name={"Peers"}
              placeholder={"Select a peer"}
              items={data.peers.map((p) => ({
                id: p.RIC,
                label: p.CommonName,
              }))}
              value={selectedPeer}
              setValue={setSelectedPeer}
            />
            {selectedPeer ? (
              <button onClick={() => setSelectedPeer(null)}>
                <X className={"text-neutral-500"} />
              </button>
            ) : null}
          </div>

          <div className={"hidden print:block"}>
            {selectedPeer || "No peer selected."}
          </div>
        </div>

        <div className={"col-span-1 flex justify-center"}>
          <span className={"select-none"}>Ø Peer</span>
        </div>

        <div className={"col-span-1 flex justify-center"}>
          <span className={"select-none"}>Best</span>
        </div>
      </div>

      <div className={"flex flex-col space-y-8"}>
        <div className={"h-64"}>
          <ParentSize>
            {({ height, width }) => (
              <ESGPeerChart
                company={data.company}
                peers={displayedData}
                height={height}
                width={width}
                events
              />
            )}
          </ParentSize>
        </div>

        <div className={"flex flex-col space-y-8"}>
          {insightsSections.map((s, idx) => (
            <div
              key={s.title}
              className={"flex flex-col space-y-2 p-4 bg-neutral-50 rounded-lg"}
            >
              <div className={"flex items-center"}>
                <h2 className={"text-lg font-medium"}>{s.title}</h2>
                {topPerformers ? (
                  <span
                    className={"text-sm text-neutral-700 font-medium ml-auto"}
                  >
                    Top performer: {topPerformers[s.title]}
                  </span>
                ) : null}
              </div>

              {s.items.map((i) => (
                <div key={i.label} className={"grid grid-cols-5 gap-4"}>
                  <div className={"col-span-1 whitespace-nowrap"}>
                    <HoverCard.Root>
                      <HoverCard.Trigger asChild>
                        <div className={"flex items-center space-x-1"}>
                          <span className={"text-neutral-800 truncate"}>
                            {i.label}
                          </span>
                          <Info size={16} className={"shrink-0"} />
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="w-96 bg-white rounded shadow-md p-4 border border-neutral-300  "
                          sideOffset={5}
                        >
                          <div className={"flex flex-col spacey-2"}>
                            <div>
                              <div className="font-bold">{i.label}</div>
                            </div>
                            <div className="text-neutral-800">
                              {i.description}
                            </div>
                          </div>

                          <HoverCard.Arrow className="fill-white stroke-neutral-300" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  </div>

                  <div
                    className={classNames("col-span-1 flex justify-center", {
                      "text-green-500": i.compare(i.value, i.peerValue) > 0,
                      "text-red-500": i.compare(i.value, i.peerValue) < 0,
                    })}
                  >
                    <RenderValue value={i.value} kind={i.kind} />
                  </div>

                  <div
                    className={classNames("col-span-1 flex justify-center", {
                      "text-green-500": i.compare(i.value, i.peerValue) < 0,
                      "text-red-500": i.compare(i.value, i.peerValue) > 0,
                    })}
                  >
                    <RenderValue value={i.peerValue} kind={i.kind} />
                  </div>

                  <div className={"col-span-1 flex justify-center"}>
                    <RenderValue value={i.peerAverage} kind={i.kind} />
                  </div>

                  <div className={"col-span-1 flex justify-center"}>
                    <RenderValue value={i.peerMax} kind={i.kind} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RenderValue({
  value,
  kind,
}: {
  value?: number | null;
  kind: InsightsItem["kind"];
}) {
  if (typeof value !== "number") {
    return <MissingData />;
  }

  switch (kind) {
    case "number":
      return <Number value={value} />;
    case "percent":
      return <PercentNumber value={value} />;
  }
}
