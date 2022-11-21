import styles from "@/styles/ScoreBoard.module.css";
import { allStations, Station } from "@/models/Station";
import { calcLPerMin, formatSecondsToMinutesAndSeconds } from "@/utils/utils";
import { useEffect } from "react";
import { ScoreBoardData } from "@/models/ScoreBoardData";
import { lang } from "@/utils/language/language";

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
      {lang("startdruck")}: {scoreBoardData.person.druck.start} bar
      <br />
      {lang("enddruck")}:{" "}
      {scoreBoardData.person.druck.end !== undefined
        ? `${scoreBoardData.person.druck.end} bar`
        : ""}
      <br />
      {lang("total-consumption")}:{" "}
      {scoreBoardData.person.druck.end !== undefined &&
      sumTimeSeconds !== undefined
        ? `${calcLPerMin(scoreBoardData.person, sumTimeSeconds!)} l/min`
        : ""}
      <br />
      {lang("total-time")}:{" "}
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
            {!s.passed && `[${lang("not-passed")}]`} {s.station.name} (
            {(allStations
              .map((allS, index) => ({ index, station: allS }))
              .find((allS) => allS.station.name === s.station.name)?.index ??
              0) + 1}
            ):{" "}
            {s.time !== undefined && formatSecondsToMinutesAndSeconds(s.time)}
          </div>
        ))}
    </div>
  );
}
