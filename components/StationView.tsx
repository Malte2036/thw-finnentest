import { useEffect, useReducer, useState } from "react";
import styles from "@/styles/StationView.module.css";
import BreakStationCard from "./StationCard/BreakStationCard";
import ScoreBoard, { StationTime } from "./ScoreBoard";
import MainStationCard from "./StationCard/MainStationCard";
import FinishedStationCard from "./StationCard/FinishedStationCard";
import { allStations, Station } from "@/models/Station";
import { milisecondsToSeconds } from "@/utils/utils";
import { ScoreBoardData } from "@/models/ScoreBoardData";
import {
  ScoreBoardDataActionKind,
  scoreBoardDataReducer,
} from "./ScoreBoardDataReducer";

export enum StationStatus {
  BREAK,
  NO_BREAK,
}

export type StationViewProps = {
  scoreBoardData: ScoreBoardData;
  save: (scoreBoardData: ScoreBoardData) => void;
};

export default function StationView({
  scoreBoardData: incommingScoreBoardData,
  save,
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
    if (
      !scoreBoardData.finished &&
      scoreBoardData.stationIndex - 1 >= allStations.length
    ) {
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
        type: ScoreBoardDataActionKind.SET_FINISHED,
        payload: true,
      });
    }
  }, [scoreBoardData.stationStatus]);

  useEffect(() => {
    if (seconds <= 0 && scoreBoardData.stationStatus === StationStatus.BREAK) {
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
      if (!scoreBoardData.finished) {
        dispatchScoreboardData({
          type: ScoreBoardDataActionKind.SET_FINISHED,
          payload: true,
        });
      }
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
          scoreBoardData.finished
            ? scoreBoardData.sumTime
            : nowTime - milisecondsToSeconds(scoreBoardData.startTimestamp!)
        }
        save={save}
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
