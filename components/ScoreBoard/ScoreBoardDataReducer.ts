import { ScoreBoardData } from "@/models/ScoreBoardData";
import { allStations } from "@/models/Station";
import { StatisticsData } from "@/pages/api/statistics/finished";
import { milisecondsToSeconds } from "@/utils/utils";
import { StationStatus } from "../StationCard/StationView";
import { StationTime } from "./ScoreBoard";

export enum ScoreBoardDataActionKind {
  INCREMENT_STATION_INDEX,
  SET_STATION_STATUS,
  SET_STATION_TIMES,
  SET_END_DRUCK,
  SET_END_STATION_TIME,
  SET_FINISHED,
}

export type ScoreBoardDataAction = {
  type: ScoreBoardDataActionKind;
  payload: any;
};

export function scoreBoardDataReducer(
  state: ScoreBoardData,
  action: ScoreBoardDataAction
): ScoreBoardData {
  switch (action.type) {
    case ScoreBoardDataActionKind.INCREMENT_STATION_INDEX:
      return {
        ...state,
        stationIndex: state.stationIndex + 1,
      };
    case ScoreBoardDataActionKind.SET_STATION_STATUS:
      return {
        ...state,
        stationStatus: action.payload as StationStatus,
      };
    case ScoreBoardDataActionKind.SET_STATION_TIMES:
      const stationTime = action.payload as StationTime;
      return {
        ...state,
        stationTimes: [
          ...state.stationTimes.filter(
            (s) => s.station.name !== stationTime.station.name
          ),
          stationTime,
        ],
      };
    case ScoreBoardDataActionKind.SET_END_DRUCK:
      const endDruck = action.payload;

      fetch("api/statistics/finished", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endDruck: endDruck,
          startDruck: state.person.druck.start,
          sumTime: state.sumTime,
        } as StatisticsData),
      });

      return {
        ...state,
        person: {
          ...state.person,
          druck: { ...state.person.druck, end: endDruck },
        },
      };
    case ScoreBoardDataActionKind.SET_END_STATION_TIME:
      return {
        ...state,
        endStationTime:
          milisecondsToSeconds(Date.now()) +
          allStations[state.stationIndex + 1].time,
      };
    case ScoreBoardDataActionKind.SET_FINISHED:
      const finished = action.payload as boolean;
      if (state.finished === finished) {
        throw new Error(
          `SET_FINISHED: Person ${state.name} is already finished=${state.finished}.`
        );
      }

      const endTimestamp = milisecondsToSeconds(Date.now());
      return {
        ...state,
        finished: finished,
        endTimestamp: endTimestamp,
        sumTime: endTimestamp - milisecondsToSeconds(state.startTimestamp!),
      };

    default:
      throw new Error(`action kind: ${action.type} not found!`);
  }
}
