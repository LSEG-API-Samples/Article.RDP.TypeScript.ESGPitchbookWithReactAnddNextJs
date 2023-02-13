// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDataStreamToken,
  getHistoricPricesFromDataStream,
} from "../../refinitiv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const rics = req.query["rics"];
  if (typeof rics !== "string") {
    res.status(400).json({ error: "missing rics parameter" });
    return;
  }

  await res
    .status(200)
    .json(
      await getHistoricPricesFromDataStream(
        await getDataStreamToken(),
        rics.split(","),
        "-5Y",
        "0D",
        "Q"
      )
    );
}
