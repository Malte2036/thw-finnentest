// db.ts
import Dexie, { Table } from "dexie";
import { SimplePerson } from "../models/Person";
import { ScoreBoardData } from "../models/ScoreBoardData";

export class MySubClassedDexie extends Dexie {
  scoreBoardDatas!: Table<ScoreBoardData>;
  persons!: Table<SimplePerson>;

  constructor() {
    super("finnentestDatabase");
    this.version(2).stores({
      scoreBoardDatas:
        "name, person, stationTimes, startTimestamp, endTimestamp, endStationTime, stationStatus, finished", // Primary key and indexed props
      persons: "name",
    });
  }
}

export const db = new MySubClassedDexie();
