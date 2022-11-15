// db.ts
import Dexie, { Table } from "dexie";
import { ScoreBoardData } from "../models/ScoreBoardData";

export class MySubClassedDexie extends Dexie {
  scoreBoardDatas!: Table<ScoreBoardData>;

  constructor() {
    super("finnentestDatabase");
    this.version(1).stores({
      scoreBoardDatas:
        "name, person, stationTimes, startTimestamp, endTimestamp, endStationTime, stationStatus, finished", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
