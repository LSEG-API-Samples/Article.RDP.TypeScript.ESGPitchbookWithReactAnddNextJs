// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { search, withSession } from "../../refinitiv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const permIds = req.query["permIds"];
  if (typeof permIds !== "string") {
    res.status(400).json({ error: "missing query parameter" });
    return;
  }

  const params = new URLSearchParams();
  params.append("permIds", permIds);

  const resp = await fetch(
    `https://refinitiv-newsfetch.bruno.sh/data?${params.toString()}`
  );
  if (!resp.ok) {
    res.status(500).json({ error: "failed to fetch data" });
    return;
  }
  const data = await resp.json();

  res.status(200).json(data);
}
