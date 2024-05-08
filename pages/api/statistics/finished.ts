import type { NextApiRequest, NextApiResponse } from "next";
import sdk from "node-appwrite";

export const runtime = "edge";

export type StatisticsData = {
  startDruck: number;
  endDruck: number;
  sumTime: number;
};

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body as StatisticsData;

    let client = new sdk.Client();
    const databases = new sdk.Databases(client);

    client
      .setEndpoint(process.env.APPWRITE_ENDPOINT ?? "")
      .setProject(process.env.APPWRITE_PROJECTID ?? "")
      .setKey(process.env.APPWRITE_APIKEY ?? "");

    await databases.createDocument(
      process.env.APPWRITE_DATABASEID ?? "",
      process.env.APPWRITE_COLLECTIONID_STATISTICS ?? "",
      "unique()",
      body
    );

    res.status(200).end();
  }
}
