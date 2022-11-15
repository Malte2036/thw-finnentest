import { SimplePerson } from "../models/Person";
import { ScoreBoardData } from "../models/ScoreBoardData";
import { db } from "./db";

export async function saveScoreBoardDataToStorage(
  scoreBoardData: ScoreBoardData
) {
  await db.scoreBoardDatas.put(scoreBoardData);
}

export async function removeScoreBoardDatasFromStorage() {
  await db.scoreBoardDatas.clear();
}

export async function getScoreBoardDatasFromStorage(): Promise<
  ScoreBoardData[]
> {
  return await db.scoreBoardDatas.toArray();
}

export async function saveSimplePersonToStorage(person: SimplePerson) {
  await db.persons.put({ name: person.name });
}

export async function getSimplePersonFromStorage(): Promise<SimplePerson[]> {
  return await db.persons.toArray();
}
