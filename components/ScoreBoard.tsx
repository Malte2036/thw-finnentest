import { Person } from "../models/Person";
import { formatSecondsToMinutesAndSeconds } from "../utils/utils";
import { allStations, Station } from "./StationView";

export type StationTime = {
  station: Station;
  time: number | undefined;
};

export type ScoreBoardProps = {
  person: Person;
  stationTimes: StationTime[];
};
function sumStationTimes(stationTimes: StationTime[]): number {
  return stationTimes
    .filter((s) => s.time !== undefined)
    .map((s) => s.time as number)
    .reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
}

function calcLPerMin(person: Person, stationTimes: StationTime[]) {
  const druckDiff = person.druck.start - person.druck.end!;
  const minutes = sumStationTimes(stationTimes) / 60;

  return ((6 * druckDiff) / 1.1 / minutes).toFixed(2);
}

export default function ScoreBoard({ person, stationTimes }: ScoreBoardProps) {
  return (
    <>
      <h2>{person.name}</h2>
      startDruck: {person.druck.start}
      <br />
      endDruck: {person.druck.end}
      <br />
      {person.druck.end !== undefined ? (
        <>l/min: {calcLPerMin(person, stationTimes)}</>
      ) : (
        <></>
      )}
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
