import { formatSecondsToMinutesAndSeconds } from "../utils/utils";
import { allStations, Station } from "./StationView";

export type StationTime = {
  station: Station;
  time: number | undefined;
};

export type ScoreBoardProps = {
  stationTimes: StationTime[];
};

export default function ScoreBoard({ stationTimes }: ScoreBoardProps) {
  return (
    <>
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
