// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { search, searchIndicesByCountry, withSession } from "../../refinitiv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const country = req.body["country"];
  if (typeof country !== "string") {
    res.status(400).json({ error: "missing country parameter" });
    return;
  }

  const results = await withSession((s) => searchIndicesByCountry(s, country));
  res.status(200).json(results);
}
