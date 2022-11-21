import { SimplePerson } from "@/models/Person";
import { ScoreBoardData } from "@/models/ScoreBoardData";
import { db } from "./db";
import { milisecondsToSeconds, secondsToHours } from "./utils";

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
  const datas = await db.scoreBoardDatas.toArray();

  if (datas.length > 0 && datas[0].startTimestamp !== undefined) {
    const secondsSinceStart = milisecondsToSeconds(
      Date.now() - datas[0].startTimestamp
    );

    // clear after 12 hours
    if (secondsToHours(secondsSinceStart) > 12) {
      removeScoreBoardDatasFromStorage();
      return [];
    }
  }
  return datas;
}

export async function saveSimplePersonToStorage(person: SimplePerson) {
  await db.persons.put({ name: person.name });
}

export async function getSimplePersonFromStorage(): Promise<SimplePerson[]> {
  return await db.persons.toArray();
}
