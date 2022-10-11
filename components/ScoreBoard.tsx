import { Person } from "../models/Person";
import { allStations, Station } from "../models/Station";
import { formatSecondsToMinutesAndSeconds } from "../utils/utils";

export type StationTime = {
  station: Station;
  time: number | undefined;
};

export type ScoreBoardProps = {
  person: Person;
  stationTimes: StationTime[];
  sumTime: number | undefined;
};

function calcLPerMin(person: Person, sumTime: number) {
  const druckDiff = person.druck.start - person.druck.end!;
  const minutes = sumTime / 60;

  return ((6 * druckDiff) / 1.1 / minutes).toFixed(2);
}

export default function ScoreBoard({
  person,
  sumTime,
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
      {person.druck.end !== undefined && sumTime !== undefined
        ? calcLPerMin(person, sumTime!)
        : ""}
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
