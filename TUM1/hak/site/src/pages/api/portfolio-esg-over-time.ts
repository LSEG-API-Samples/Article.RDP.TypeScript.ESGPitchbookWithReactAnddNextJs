import { NextApiRequest, NextApiResponse } from "next";
import { getESGScoreOverTimeMulti, withSession } from "../../refinitiv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const rics = req.body["rics"];
  if (!Array.isArray(rics)) {
    res.status(400).json({ error: "missing rics in body" });
    return;
  }

  const results = await withSession((s) => getESGScoreOverTimeMulti(s, rics));
  res.status(200).json(results);
}
