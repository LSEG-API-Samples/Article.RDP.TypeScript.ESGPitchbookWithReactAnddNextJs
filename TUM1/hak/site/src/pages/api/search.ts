// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { search, withSession } from "../../refinitiv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const queryText = req.body["query"];
  if (typeof queryText !== "string") {
    res.status(400).json({ error: "missing query parameter" });
    return;
  }

  const results = await withSession((s) => search(s, queryText));
  res.status(200).json(results);
}
