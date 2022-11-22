import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export type StatisticsCountResult = {
  count: number;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StatisticsCountResult>
) => {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const count = await prisma.statistics.count({});

    res.status(200).json({ count });
  }
};
