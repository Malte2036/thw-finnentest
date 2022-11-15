import styles from "../styles/ScoreBoard.module.css";
import { Person } from "../models/Person";
import { allStations, Station } from "../models/Station";
import { calcLPerMin, formatSecondsToMinutesAndSeconds } from "../utils/utils";
import { useEffect } from "react";
import { StationStatus } from "./StationView";

export type StationTime = {
  station: Station;
  time: number | undefined;
  endTime: number | undefined;
  passed: boolean | undefined;
};

export type ScoreBoardData = {
  person: Person;
  stationTimes: StationTime[];
  startTimestamp: number | undefined;
  endTimestamp: number | undefined;
  endStationTime: number | undefined;
  stationStatus: StationStatus | undefined;
  finished: boolean;
};

export type ScoreBoardProps = ScoreBoardData & {
  sumTimeSeconds: number | undefined;
  save: (scoreBoardData: ScoreBoardData) => void;
};

export default function ScoreBoard({
  person,
  stationTimes,
  startTimestamp,
  endTimestamp,
  endStationTime,
  stationStatus,
  finished,
  sumTimeSeconds,
  save,
}: ScoreBoardProps) {
  useEffect(() => {
    if (save !== undefined) {
      save({
        person,
        stationTimes,
        startTimestamp,
        endTimestamp,
        endStationTime,
        stationStatus,
        finished,
      });
    }
  }, [
    person,
    stationTimes,
    startTimestamp,
    endTimestamp,
    endStationTime,
    stationStatus,
    finished,
  ]);

  return (
    <div>
      <h2>{person.name}</h2>
      Startdruck: {person.druck.start} bar
      <br />
      Enddruck:{" "}
      {person.druck.end !== undefined ? `${person.druck.end} bar` : ""}
      <br />
      Gesamtverbrauch:{" "}
      {person.druck.end !== undefined && sumTimeSeconds !== undefined
        ? `${calcLPerMin(person, sumTimeSeconds!)} l/min`
        : ""}
      <br />
      Gesamtzeit:{" "}
      {sumTimeSeconds !== undefined
        ? formatSecondsToMinutesAndSeconds(sumTimeSeconds)
        : ""}
      <br />
      <br />
      {stationTimes
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
