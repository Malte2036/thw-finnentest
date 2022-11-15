import { StationTime } from "../components/ScoreBoard";
import { StationStatus } from "../components/StationView";
import { Person } from "./Person";

export type ScoreBoardData = {
  name: string;
  person: Person;
  stationIndex: number;
  stationTimes: StationTime[];
  startTimestamp: number | undefined;
  endTimestamp: number | undefined;
  endStationTime: number | undefined;
  stationStatus: StationStatus | undefined;
  finished: boolean;
  sumTime: number | undefined;
};
