import styles from "../styles/ScoreBoard.module.css";
import { allStations, Station } from "../models/Station";
import { calcLPerMin, formatSecondsToMinutesAndSeconds } from "../utils/utils";
import { useEffect } from "react";
import { ScoreBoardData } from "../models/ScoreBoardData";

export type StationTime = {
  station: Station;
  time: number | undefined;
  endTime: number | undefined;
  passed: boolean | undefined;
};

export type ScoreBoardProps = {
  scoreBoardData: ScoreBoardData;
  sumTimeSeconds: number | undefined;
  save: (scoreBoardData: ScoreBoardData) => void;
};

export default function ScoreBoard({
  scoreBoardData,
  sumTimeSeconds,
  save,
}: ScoreBoardProps) {
  useEffect(() => {
    if (save !== undefined) {
      save(scoreBoardData);
    }
  }, [scoreBoardData, save]);

  return (
    <div>
      <h2>{scoreBoardData.person.name}</h2>
      Startdruck: {scoreBoardData.person.druck.start} bar
      <br />
      Enddruck:{" "}
      {scoreBoardData.person.druck.end !== undefined
        ? `${scoreBoardData.person.druck.end} bar`
        : ""}
      <br />
      Gesamtverbrauch:{" "}
      {scoreBoardData.person.druck.end !== undefined &&
      sumTimeSeconds !== undefined
        ? `${calcLPerMin(scoreBoardData.person, sumTimeSeconds!)} l/min`
        : ""}
      <br />
      Gesamtzeit:{" "}
      {sumTimeSeconds !== undefined
        ? formatSecondsToMinutesAndSeconds(sumTimeSeconds)
        : ""}
      <br />
      <br />
      {scoreBoardData.stationTimes
        .filter((s) => s.time !== undefined)
        .map((s) => (
          <div
            key={s.station.name}
            className={s.passed ? "" : styles.notPassed}
          >
            {!s.passed && "[nicht bestanden]"} {s.station.name} (
            {
              allStations
                .map((allS, index) => ({ index, station: allS }))
                .find((allS) => allS.station.name === s.station.name)?.index
            }
            ) :{" "}
            {s.time !== undefined && formatSecondsToMinutesAndSeconds(s.time)}
          </div>
        ))}
    </div>
  );
}
