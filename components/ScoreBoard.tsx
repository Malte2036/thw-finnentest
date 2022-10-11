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

export default function ScoreBoard({ person, stationTimes }: ScoreBoardProps) {
  return (
    <>
      <h2>{person.name}</h2>
      startDruck: {person.druck.start}
      <br />
      endDruck: {person.druck.end}
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
