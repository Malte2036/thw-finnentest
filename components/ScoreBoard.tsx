import { Person } from "../models/Person";
import { allStations, Station } from "../models/Station";
import { calcLPerMin, formatSecondsToMinutesAndSeconds } from "../utils/utils";

export type StationTime = {
  station: Station;
  time: number | undefined;
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
          <div key={s.station.id}>
            {s.station.id} (
            {
              allStations
                .map((allS, index) => ({ index, station: allS }))
                .find((allS) => allS.station.id === s.station.id)?.index
            }
            ) :{" "}
            {s.time !== undefined && formatSecondsToMinutesAndSeconds(s.time)}
          </div>
        ))}
    </>
  );
}
