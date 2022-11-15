import { ScoreBoardData } from "../components/ScoreBoard";

export function saveScoreBoardDataToStorage(scoreBoardData: ScoreBoardData) {
  console.log(scoreBoardData);

  let datas = getScoreBoardDatasFromStorage() ?? [];

  datas = [
    ...datas.filter((data) => data.person.name !== scoreBoardData.person.name),
    scoreBoardData,
  ];
  localStorage.setItem("savedScoreBoardDatas", JSON.stringify(datas));
}

export function removeScoreBoardDatasFromStorage() {
  localStorage.removeItem("savedScoreBoardDatas");
}

export function getScoreBoardDatasFromStorage(): ScoreBoardData[] | undefined {
  const item = localStorage.getItem("savedScoreBoardDatas");
  return item !== null ? (JSON.parse(item) as ScoreBoardData[]) : undefined;
}
