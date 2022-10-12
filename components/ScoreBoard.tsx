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
    <>
      <h2>{person.name}</h2>
      startDruck: {person.druck.start}
      <br />
      endDruck: {person.druck.end}
      <br />
      l/min:{" "}
      {person.druck.end !== undefined && sumTimeSeconds !== undefined
        ? calcLPerMin(person, sumTimeSeconds!)
        : ""}
      <br />
      sumTime:{" "}
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
            {s.station.name} (
            {
              allStations
                .map((allS, index) => ({ index, station: allS }))
                .find((allS) => allS.station.name === s.station.name)?.index
            }
            ) :{" "}
            {s.time !== undefined && formatSecondsToMinutesAndSeconds(s.time)}
          </div>
        ))}
    </>
  );
}
