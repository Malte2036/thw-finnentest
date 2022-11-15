import { useEffect, useReducer, useState } from "react";
import styles from "../styles/StationView.module.css";
import BreakStationCard from "./StationCard/BreakStationCard";
import ScoreBoard, { StationTime } from "./ScoreBoard";
import MainStationCard from "./StationCard/MainStationCard";
import FinishedStationCard from "./StationCard/FinishedStationCard";
import { allStations, Station } from "../models/Station";
import { milisecondsToSeconds } from "../utils/utils";
import { saveScoreBoardDataToStorage } from "../utils/save";
import { ScoreBoardData } from "../models/ScoreBoardData";

export enum StationStatus {
  BREAK,
  NO_BREAK,
}

export type StationViewProps = {
  scoreBoardData: ScoreBoardData;
};

enum ScoreBoardDataActionKind {
  INCREMENT_STATION_INDEX,
  SET_STATION_STATUS,
  SET_STATION_TIMES,
  SET_END_DRUCK,
  SET_END_STATION_TIME,
  SET_END_TIMESTAMP,
  SET_FINISHED,
}

type ScoreBoardDataAction = {
  type: ScoreBoardDataActionKind;
  payload: any;
};

function scoreBoardDataReducer(
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
      return {
        ...state,
        person: {
          ...state.person,
          druck: { ...state.person.druck, end: action.payload },
        },
      };
    case ScoreBoardDataActionKind.SET_END_STATION_TIME:
      return {
        ...state,
        endStationTime:
          milisecondsToSeconds(Date.now()) +
          allStations[state.stationIndex + 1].time,
      };
    case ScoreBoardDataActionKind.SET_END_TIMESTAMP:
      return {
        ...state,
        endTimestamp: action.payload,
      };
    case ScoreBoardDataActionKind.SET_FINISHED:
      return {
        ...state,
        finished: action.payload as boolean,
      };

    default:
      throw new Error(`action kind: ${action.type} not found!`);
  }
}

export default function StationView({
  scoreBoardData: incommingScoreBoardData,
}: StationViewProps) {
  const [station, setStation] = useState<Station>(
    allStations[incommingScoreBoardData.stationIndex]
  );

  const [scoreBoardData, dispatchScoreboardData] = useReducer(
    scoreBoardDataReducer,
    (() => {
      let ret = incommingScoreBoardData;
      if (ret.endStationTime === undefined) {
        ret.endStationTime = milisecondsToSeconds(Date.now()) + station.time;
      }
      if (ret.startTimestamp === undefined) {
        ret.startTimestamp = Date.now();
      }
      return ret;
    })()
  );

  const [nowTime, setNowTime] = useState<number>(
    milisecondsToSeconds(Date.now())
  );

  const seconds = scoreBoardData.endStationTime! - nowTime;

  function updateStationTimes(passed: boolean) {
    const stationTime: StationTime = {
      station: station,
      time: station.time - seconds,
      endTime: scoreBoardData.endStationTime,
      passed: passed,
    };
    dispatchScoreboardData({
      type: ScoreBoardDataActionKind.SET_STATION_TIMES,
      payload: stationTime,
    });
  }

  useEffect(() => {
    if (scoreBoardData.stationIndex - 1 >= allStations.length) {
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_FINISHED,
        payload: true,
      });
      return;
    }
    setStation(allStations[scoreBoardData.stationIndex]);
  }, [scoreBoardData.stationIndex]);

  useEffect(() => {
    if (
      !scoreBoardData.finished &&
      scoreBoardData.stationIndex - 1 >= allStations.length
    ) {
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_END_TIMESTAMP,
        payload: Date.now(),
      });
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_FINISHED,
        payload: true,
      });
    }
  }, [scoreBoardData.stationStatus]);

  useEffect(() => {
    if (seconds <= 0 && scoreBoardData.stationStatus === StationStatus.BREAK) {
      //updateStationTimes();
      startNextStation();
    }
    if (scoreBoardData.finished) {
      return;
    }

    const interval = setInterval(
      () => setNowTime(milisecondsToSeconds(Date.now())),
      100
    );
    return () => clearInterval(interval);
  }, [nowTime]);

  function clickNextStation(passed?: boolean) {
    if (seconds > 0 && scoreBoardData.stationStatus == StationStatus.NO_BREAK) {
      if (passed === undefined)
        throw "clickNextStation: passed parameter is missing [a]";

      updateStationTimes(passed);
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_STATION_STATUS,
        payload: StationStatus.BREAK,
      });
    } else {
      if (scoreBoardData.stationStatus == StationStatus.NO_BREAK) {
        if (passed === undefined)
          throw "clickNextStation: passed parameter is missing [b]";
        updateStationTimes(passed);
      }
      startNextStation();
    }
  }

  function isLastStation() {
    return allStations.length - 1 <= scoreBoardData.stationIndex;
  }

  function startNextStation() {
    if (!isLastStation()) {
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_END_STATION_TIME,
        payload: undefined,
      });
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.INCREMENT_STATION_INDEX,
        payload: undefined,
      });
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_STATION_STATUS,
        payload: StationStatus.NO_BREAK,
      });
    } else {
      dispatchScoreboardData({
        type: ScoreBoardDataActionKind.SET_FINISHED,
        payload: true,
      });
    }
  }

  function setEndDruckCallback(druck: number) {
    dispatchScoreboardData({
      type: ScoreBoardDataActionKind.SET_END_DRUCK,
      payload: druck,
    });
  }

  return (
    <div className={styles.mainContainer}>
      <ScoreBoard
        scoreBoardData={scoreBoardData}
        sumTimeSeconds={
          (scoreBoardData.endTimestamp
            ? milisecondsToSeconds(scoreBoardData.endTimestamp)
            : nowTime) - milisecondsToSeconds(scoreBoardData.startTimestamp!)
        }
        save={(scoreBoardData: ScoreBoardData) => {
          saveScoreBoardDataToStorage(scoreBoardData);
        }}
      />

      {scoreBoardData.person.druck.end === undefined &&
        (!scoreBoardData.finished ? (
          scoreBoardData.stationStatus == StationStatus.BREAK ? (
            <BreakStationCard
              seconds={seconds}
              stationIndex={scoreBoardData.stationIndex}
              clickNextStation={clickNextStation}
            />
          ) : (
            <MainStationCard
              station={station}
              stationIndex={scoreBoardData.stationIndex}
              seconds={seconds}
              clickNextStation={clickNextStation}
            />
          )
        ) : (
          <FinishedStationCard setEndDruckCallback={setEndDruckCallback} />
        ))}
    </div>
  );
}
