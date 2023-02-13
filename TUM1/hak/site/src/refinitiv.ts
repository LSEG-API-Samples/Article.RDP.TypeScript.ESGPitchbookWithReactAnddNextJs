import { FundamentalAndReference, Search, Session } from "@refinitiv-data/data";
import { format, parseISO } from "date-fns";

export async function createSession() {
  // https://github.com/Refinitiv-API-Samples/Example.DataLibrary.TypeScript/blob/main/src/Common/session.ts
  const sess = Session.Platform.Definition({
    appKey: process.env.REFINITIV_APP_KEY!,
    userName: process.env.REFINITIV_USER_NAME!,
    password: process.env.REFINITIV_PASSWORD!,
    takeSignOnControl: true,
  }).getSession();

  return sess.open();
}

export interface SearchResult {
  DocumentTitle?: string;
  RIC?: string;
  PermID?: string;
  PI?: string;
}

export async function search(
  session: Session.Session,
  query: string
): Promise<SearchResult[]> {
  // https://github.com/Refinitiv-API-Samples/Example.DataLibrary.TypeScript/blob/main/src/2.Content/2.6-Search/search.ts
  const results = await retry(() =>
    Search.Definition({
      view: Search.View.EquityQuotes,
      query,
      select: ["DocumentTitle", "RIC", "PermID", "PI"],
    }).getData(session)
  );

  return Object.values(
    results.data.table as Record<string, unknown>
  ) as SearchResult[];
}

export interface SearchIndexResult {
  DocumentTitle?: string;
  RIC: string;
}

export async function searchIndicesByCountry(
  session: Session.Session,
  country: string
): Promise<SearchResult[]> {
  // https://community.developers.refinitiv.com/questions/69123/get-all-index-rics-for-a-particular-country.html
  const results = await retry(() =>
    Search.Definition({
      view: Search.View.IndexInstruments,
      filter: `RCSIndexCountryGroupLeaf eq '${country}'`,
      select: ["DocumentTitle", "RIC"],
    }).getData(session)
  );

  return Object.values(
    results.data.table as Record<string, unknown>
  ) as SearchResult[];
}

export async function withSession<T>(
  fn: (sess: Session.Session) => Promise<T>
) {
  const session = await createSession();
  try {
    return await fn(session);
  } finally {
    await session.close();
  }
}

/*
'SDate': '0',
    'EDate': '-3',
    'Frq': 'FY',
    'CH': 'IN;Fd',
    'RH': 'date'
 */

export interface DataResult {
  RIC: string;
  PermID: string;

  CommonName: string;
  BusinessSummary: string | null;
  HeadquartersCountry: string | null;
  PriceClose: number;
  Volume: number;

  MarketCap: number;
  EnterpriseValue: number;
  Revenue: number;
  EBITDA: number;

  ESGCombinedScore: number | null;
  ESGCombinedScoreIncludingControversies: number | null;
  ESGEnvironmentalScore: number | null;
  ESGGovernanceScore: number | null;
  ESGSocialScore: number | null;
  ESGControversiesScore: number | null;
  ESGResourceUseScore: number | null;
  ESGEmissionsScore: number | null;

  ESGReportingScope: number | null;

  ROICMean: number | null;

  EnergyUseTotal: number | null;
  WaterWithdrawalTotal: number | null;
  RenewableEnergyUseRatio: number | null;
  WasteTotal: number | null;
  CO2EquivalentEmissionsTotal: number | null;
  CO2EquivalentEmissionsDirectScope1: number | null;
  CO2EquivalentEmissionsIndirectScope2: number | null;
  CO2EquivalentEmissionsIndirectScope3: number | null;

  BoardGenderDiversity: number | null;
  BoardSpecificSkills: number | null;
  BoardCulturalDiversity: number | null;
  ExecutiveMembersGenderDiversity: number | null;
  ExecutivesCulturalDiversity: number | null;

  WorkforceScore: number | null;
  EmployeeSatisfaction: number | null;
  HumanRightsScore: number | null;
  DonationsRevenueInMillions: number | null;
}

const relevantFields = [
  "TR.RIC",
  "TR.UltimateParentId",
  "TR.TRESGScore",
  "TR.TRESGCScore",
  "TR.EnvironmentPillarScore",
  "TR.SocialPillarScore",
  "TR.GovernancePillarScore",
  "TR.TRESGCControversiesScore",
  "TR.TRESGResourceUseScore",
  "TR.TRESGEmissionsScore",
  "TR.BusinessSummary",
  "TR.CommonName",
  "TR.UltimateParentCountryHQ",
  "TR.PriceClose",
  "TR.Volume",
  "TR.F.MktCap",
  "TR.F.EV",
  "TR.InvtrRevenue",
  "TR.EBITDAActValue",
  "TR.CSRReportingScope",
  "TR.ROICMean(Period=FY1,RollPeriods=True)",
  "TR.EnergyUseTotal",
  "TR.WaterWithdrawalTotal",
  "TR.AnalyticRenewEnergyUse",
  "TR.WasteTotal",
  "TR.CO2EmissionTotal",
  "TR.CO2DirectScope1",
  "TR.CO2IndirectScope2",
  "TR.CO2IndirectScope3",
  "TR.AnalyticBoardFemale",
  "TR.AnalyticBoardSpecificSkills",
  "TR.AnalyticBoardCulturalDiversity",
  "TR.AnalyticExecutiveMembersGenderDiversity",
  "TR.AnalyticExecutivesCulturalDiversity",
  "TR.TRESGWorkforceScore",
  "TR.EmployeeSatisfaction",
  "TR.TRESGHumanRightsScore",
  "TR.AnalyticTotalDonations",
];

function rowToData(ric: string, row: Record<string, unknown>): DataResult {
  return {
    RIC: ric,
    PermID: row["TR.UltimateParentId"] as string,
    ESGCombinedScore: (row["TR.TRESGScore"] as number) || null,
    ESGCombinedScoreIncludingControversies:
      (row["TR.TRESGCScore"] as number) || null,
    ESGControversiesScore:
      (row["TR.TRESGCControversiesScore"] as number) || null,
    ESGEmissionsScore: (row["TR.TRESGEmissionsScore"] as number) || null,
    ESGEnvironmentalScore: (row["TR.EnvironmentPillarScore"] as number) || null,
    ESGGovernanceScore: (row["TR.GovernancePillarScore"] as number) || null,
    ESGResourceUseScore: (row["TR.TRESGResourceUseScore"] as number) || null,
    ESGSocialScore: (row["TR.SocialPillarScore"] as number) || null,
    BusinessSummary: (row["TR.BusinessSummary"] as string) || null,
    CommonName: row["TR.CommonName"] as string,
    HeadquartersCountry: (row["TR.UltimateParentCountryHQ"] as string) || null,
    PriceClose: row["TR.PriceClose"] as number,
    Volume: row["TR.Volume"] as number,
    EBITDA: row["TR.EBITDAActValue"] as number,
    EnterpriseValue: row["TR.F.EV"] as number,
    MarketCap: row["TR.F.MktCap"] as number,
    Revenue: row["TR.InvtrRevenue"] as number,
    ESGReportingScope: (row["TR.CSRReportingScope"] as number) || null,
    ROICMean: (row["TR.ROICMean"] as number) || null,
    EnergyUseTotal: (row["TR.EnergyUseTotal"] as number) || null,
    WaterWithdrawalTotal: (row["TR.WaterWithdrawalTotal"] as number) || null,
    RenewableEnergyUseRatio:
      (row["TR.AnalyticRenewEnergyUse"] as number) || null,
    WasteTotal: (row["TR.WasteTotal"] as number) || null,
    CO2EquivalentEmissionsTotal: (row["TR.CO2EmissionTotal"] as number) || null,
    CO2EquivalentEmissionsDirectScope1:
      (row["TR.CO2DirectScope1"] as number) || null,
    CO2EquivalentEmissionsIndirectScope2:
      (row["TR.CO2IndirectScope2"] as number) || null,
    CO2EquivalentEmissionsIndirectScope3:
      (row["TR.CO2IndirectScope3"] as number) || null,
    BoardGenderDiversity: (row["TR.AnalyticBoardFemale"] as number) || null,
    BoardSpecificSkills:
      (row["TR.AnalyticBoardSpecificSkills"] as number) || null,
    BoardCulturalDiversity:
      (row["TR.AnalyticBoardCulturalDiversity"] as number) || null,
    ExecutiveMembersGenderDiversity:
      (row["TR.AnalyticExecutiveMembersGenderDiversity"] as number) || null,
    ExecutivesCulturalDiversity:
      (row["TR.AnalyticExecutivesCulturalDiversity"] as number) || null,
    WorkforceScore: (row["TR.TRESGWorkforceScore"] as number) || null,
    EmployeeSatisfaction: (row["TR.EmployeeSatisfaction"] as number) || null,
    HumanRightsScore: (row["TR.TRESGHumanRightsScore"] as number) || null,
    DonationsRevenueInMillions:
      (row["TR.AnalyticTotalDonations"] as number) || null,
  };
}

async function retry<T>(fn: () => Promise<T>, maxAttempts = 3) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (e) {
      console.error(e instanceof Error ? e.stack : e);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error("Failed to fetch data");
}

export async function getPeers(
  session: Session.Session,
  ric: string
): Promise<DataResult[]> {
  const result = await retry(() =>
    FundamentalAndReference.Definition({
      universe: [`Peers('${ric}')`],
      fields: relevantFields,
    }).getData(session)
  );

  const peerData = Array.from(
    Object.entries(result.data.table as Record<string, unknown>)
  ).map(([ric, data]) => rowToData(ric, data as Record<string, unknown>));

  return peerData;
}

export async function getData(
  session: Session.Session,
  ric: string,
  date?: string
): Promise<DataResult | null> {
  if (!date) {
    date = format(new Date(), "yyyy-MM-dd");
  }

  // https://github.com/Refinitiv-API-Samples/Example.DataLibrary.TypeScript/blob/main/src/2.Content/2.8-Fundamental/fundamental-reference.ts
  const result = await retry(() =>
    FundamentalAndReference.Definition({
      universe: [ric],
      fields: relevantFields,
      parameters: {
        SDate: date,
      },
    }).getData(session)
  );

  const row = (result.data.table as Record<string, unknown>)[ric] as Record<
    string,
    unknown
  >;
  if (!row) {
    return null;
  }

  return rowToData(ric, row);
}

export async function getDataMulti(
  session: Session.Session,
  rics: string[],
  date?: string
): Promise<DataResult[]> {
  if (!date) {
    date = format(new Date(), "yyyy-MM-dd");
  }

  // https://github.com/Refinitiv-API-Samples/Example.DataLibrary.TypeScript/blob/main/src/2.Content/2.8-Fundamental/fundamental-reference.ts
  const result = await retry(() =>
    FundamentalAndReference.Definition({
      universe: rics,
      fields: relevantFields,
      parameters: {
        SDate: date,
      },
    }).getData(session)
  );

  return Object.entries(result.data.table as Record<string, unknown>).map(
    ([ric, data]) => rowToData(ric, data as Record<string, unknown>)
  );
}

export async function getDataStreamToken() {
  return retry(async () => {
    const sp = new URLSearchParams();
    sp.set("username", process.env.REFINITIV_USER_NAME!);
    sp.set("password", process.env.REFINITIV_PASSWORD!);

    try {
      const res = await fetch(
        `https://product.datastream.com/DSWSClient/V1/DSService.svc/rest/Token?${sp.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();

      if (typeof data.TokenValue !== "string") {
        throw new Error(`Failed to get token`);
      }

      return data.TokenValue;
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
}

interface RawDatastreamResponse {
  AdditionalResponses: Array<{
    Key: string;
    Value: string;
  }>;
  DataTypeNames: null;
  DataTypeValues: Array<{
    DataType: string;
    SymbolValues: Array<{
      Currency: string;
      Symbol: string;
      Type: number;
      Value: Array<number | null>;
    }>;
  }>;
  Dates: Array<string>;
}

async function queryDatastream(
  token: string,
  instrument: string,
  datatypes: string[],
  start: string,
  end: string,
  datekind: "TimeSeries",
  freq: string
) {
  return retry(async () => {
    // https://product.datastream.com/DswsClient/Docs/AboutRestSvc.aspx
    // https://product.datastream.com/DswsClient/Docs/Default.aspx
    // https://product.datastream.com/DswsClient/Docs/AboutSoapSvc.aspx
    //  https://product.datastream.com/navigator/AdvanceHelpFiles/Functions/WebHelp/HFUNC.htm#t=Introduction.htm
    const sp = new URLSearchParams();
    sp.append("instrument", instrument);
    sp.append("datatypes", datatypes.join(","));
    sp.append("start", start);
    sp.append("end", end);
    sp.append("datekind", datekind);
    sp.append("freq", freq);
    sp.append("token", token);

    try {
      const res = await fetch(
        `https://product.datastream.com/DSWSClient/V1/DSService.svc/rest/Data?${sp.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      let respText = await res.text();

      if (!res.ok) {
        throw new Error(
          `Failed to query datastream: ${res.statusText}: ${respText}`
        );
      }

      // Replace NaN with null (sometimes, values are missing)
      respText = respText.replace(/NaN/g, "null");

      const data: RawDatastreamResponse = JSON.parse(respText);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
}

export interface DatastreamResponse {
  dates: Array<string>;
  dataTypes: Array<{
    dataType: string;
    symbolValues: Array<{
      currency: string;
      symbol: string;
      ric: string;
      type: number;
      value: Array<number | null>;
    }>;
  }>;
}

export async function getHistoricPricesFromDataStream(
  token: string,
  rics: string[],
  start: string,
  end: string,
  freq: string
) {
  const data = await queryDatastream(
    token,
    rics.map((r) => `<${r}>`).join(","),
    ["PH", "PL"],
    start,
    end,
    "TimeSeries",
    freq
  );

  const res: DatastreamResponse = {
    dates: data.Dates.map((d) => {
      // format /Date(1664755200000+0000)/
      const dateStr = d
        .replace("/Date(", "")
        .replace(")/", "")
        .replace("+0000", "");
      return new Date(parseInt(dateStr)).toISOString();
    }),
    dataTypes: data.DataTypeValues.map((d) => ({
      dataType: d.DataType,
      symbolValues: d.SymbolValues.map((s) => ({
        currency: s.Currency,
        symbol: s.Symbol,
        ric: s.Symbol.replace("<", "").replace(">", ""),
        type: s.Type,
        value: s.Value,
      })),
    })),
  };
  return res;
}

export interface ControversyData {
  ric: string;
  date: string;
  url: string;
  title: string;
  abstract: string;
  publisher: string;
}

export async function getControversies(
  session: Session.Session,
  ric: string
): Promise<ControversyData[]> {
  // https://github.com/Refinitiv-API-Samples/Example.DataLibrary.TypeScript/blob/main/src/2.Content/2.8-Fundamental/fundamental-reference.ts
  const controversies = await retry(async () => {
    const getDataFor = async (name: string) => {
      const res = await FundamentalAndReference.Definition({
        universe: [ric],
        fields: [
          `TR.ControvEnv(Period=FY0,AddSource=True,SDate=0D,EDate=-2,Frq=FY).${name}`,
        ],
      }).getData(session);
      return Object.entries(res.data.table as Record<string, unknown>).map(
        ([k, v]: any) => v["TR.ControvEnv"]
      );
    };

    const fields = [
      "esgsourcetitle",
      "esgsourceurl",
      "esgsourcetitle",
      "esgsourceabstract",
      "esgsourcepublisher",
      "esgsourcedate",
    ];

    const controversies: ControversyData[] = [];

    const controversyDataForFields: Record<string, unknown[]> = {};
    for (const field of fields) {
      controversyDataForFields[field.replace("esgsource", "")] = await retry(
        () => getDataFor(field)
      );
    }

    const items = Object.values(controversyDataForFields)[0].length;

    for (let i = 0; i < items; i++) {
      const item: ControversyData = {
        ric,
        date: controversyDataForFields["date"][i] as string,
        url: controversyDataForFields["url"][i] as string,
        title: controversyDataForFields["title"][i] as string,
        abstract: controversyDataForFields["abstract"][i] as string,
        publisher: controversyDataForFields["publisher"][i] as string,
      };
      if (!item.date || !item.title) {
        continue;
      }
      controversies.push(item);
    }

    return controversies;
  });

  return controversies.sort((a, b) => {
    return parseISO(b.date).getTime() - parseISO(a.date).getTime();
  });
}

// export async function getNews(session: Session.Session, ric: string) {
//   const res = await retry(async () => {
//     return await News.Headlines.Definition({
//       query: `${ric}`,
//       count: 10,
//       sort: SortDirection.NewToOld,
//       relevance: Relevancy.High,
//       dateTo: new Date().toISOString(),
//       dateFrom: subMonths(new Date(), 1).toISOString(),
//     }).getData(session);
//   });
//   console.log(res);
//
//   return res;
// }

export interface ESGScore {
  ric: string;
  date: number;
  scoreCombined: number;
  scoreEnvironmental: number;
  scoreSocial: number;
  scoreGovernance: number;
}

export async function getESGScoreOverTime(
  session: Session.Session,
  ric: string
) {
  const result = await retry(async () => {
    return FundamentalAndReference.Definition({
      universe: [ric],
      fields: [
        "TR.TRESGScore",
        "TR.EnvironmentPillarScore",
        "TR.SocialPillarScore",
        "TR.GovernancePillarScore",
        "TR.TRESGCScore.date", // this is a hack so we can get the date, using two fields of the same name unfortunately does not work
      ],
      parameters: {
        SDate: "0",
        EDate: "-4",
        Frq: "FY",
      },
    }).getData(session);
  });

  return Object.entries(result.data.table as Record<string, unknown>).map(
    ([_, v]: any) => {
      const score: ESGScore = {
        ric: v.instrument,
        date: parseISO(v["TR.TRESGCScore"]).getTime(),
        scoreCombined: v["TR.TRESGScore"],
        scoreEnvironmental: v["TR.EnvironmentPillarScore"],
        scoreSocial: v["TR.SocialPillarScore"],
        scoreGovernance: v["TR.GovernancePillarScore"],
      };
      return score;
    }
  );
}

export async function getESGScoreOverTimeMulti(
  session: Session.Session,
  rics: string[]
) {
  const result = await retry(async () => {
    return FundamentalAndReference.Definition({
      universe: rics,
      fields: [
        "TR.TRESGScore",
        "TR.EnvironmentPillarScore",
        "TR.SocialPillarScore",
        "TR.GovernancePillarScore",
        "TR.TRESGCScore.date", // this is a hack so we can get the date, using two fields of the same name unfortunately does not work
      ],
      parameters: {
        SDate: "0",
        EDate: "-4",
        Frq: "FY",
      },
    }).getData(session);
  });

  return Object.entries(result.data.table as Record<string, unknown>).map(
    ([_, v]: any) => {
      const score: ESGScore = {
        ric: v.instrument,
        date: parseISO(v["TR.TRESGCScore"]).getTime(),
        scoreCombined: v["TR.TRESGScore"],
        scoreEnvironmental: v["TR.EnvironmentPillarScore"],
        scoreSocial: v["TR.SocialPillarScore"],
        scoreGovernance: v["TR.GovernancePillarScore"],
      };
      return score;
    }
  );
}
