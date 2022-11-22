import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export type StatisticsData = {
  startDruck: number;
  endDruck: number;
  sumTime: number;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body as StatisticsData;

    const prisma = new PrismaClient();
    await prisma.statistics.create({
      data: body,
    });

    res.status(200).end();
  }
};
