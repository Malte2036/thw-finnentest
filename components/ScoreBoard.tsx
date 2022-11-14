import styles from "../styles/ScoreBoard.module.css";
import { Person } from "../models/Person";
import { allStations, Station } from "../models/Station";
import { calcLPerMin, formatSecondsToMinutesAndSeconds } from "../utils/utils";

export type StationTime = {
  station: Station;
  time: number | undefined;
  passed: boolean | undefined;
};

export type ScoreBoardProps = {
  person: Person;
  stationTimes: StationTime[];
  sumTimeSeconds: number | undefined;
};

export default function ScoreBoard({
  person,
  sumTimeSeconds,
  stationTimes,
}: ScoreBoardProps) {
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
