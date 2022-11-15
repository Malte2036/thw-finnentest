import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/StationView.module.css";
import BreakStationCard from "./StationCard/BreakStationCard";
import ScoreBoard, { ScoreBoardData, StationTime } from "./ScoreBoard";
import MainStationCard from "./StationCard/MainStationCard";
import FinishedStationCard from "./StationCard/FinishedStationCard";
import { allStations, Station } from "../models/Station";
import { milisecondsToSeconds } from "../utils/utils";
import { saveScoreBoardDataToStorage } from "../utils/save";

export enum StationStatus {
  BREAK,
  NO_BREAK,
}

export type StationViewProps = {
  scoreBoardData: ScoreBoardData;
};

export default function StationView({
  scoreBoardData: incommingScoreBoardData,
}: StationViewProps) {
  const [person, setPerson] = useState<Person>(incommingScoreBoardData.person);

  const [stationIndex, setStationIndex] = useState<number>(
    incommingScoreBoardData.stationTimes.length != 0
      ? incommingScoreBoardData.stationTimes.length - 1
      : 0
  );
  const [station, setStation] = useState<Station>(allStations[stationIndex]);

  const [nowTime, setNowTime] = useState<number>(
    milisecondsToSeconds(Date.now())
  );

  const [endStationTime, setEndStationTime] = useState<number>(
    incommingScoreBoardData.endStationTime !== undefined
      ? incommingScoreBoardData.endStationTime
      : nowTime + station.time
  );

  const seconds = endStationTime - nowTime;

  const [stationStatus, setStationStatus] = useState<StationStatus>(
    incommingScoreBoardData.stationStatus !== undefined
      ? incommingScoreBoardData.stationStatus
      : StationStatus.NO_BREAK
  );

  const [stationTimes, setStationTimes] = useState<StationTime[]>(
    incommingScoreBoardData.stationTimes
  );

  const [finished, setFinished] = useState<boolean>(
    incommingScoreBoardData.finished
  );

  const [startTimestamp] = useState<number>(
    incommingScoreBoardData.startTimestamp !== undefined
      ? incommingScoreBoardData.startTimestamp
      : Date.now()
  );
  const [endTimestamp, setEndTimestamp] = useState<number | undefined>(
    incommingScoreBoardData.endTimestamp
  );

  function updateStationTimes(passed: boolean) {
    setStationTimes((state) => [
      ...state.filter((s) => s.station.name !== station.name),
      {
        station: station,
        time: station.time - seconds,
        endTime: endStationTime,
        defaultTime: station.time,
        passed: passed,
      },
    ]);
  }

  useEffect(() => {
    if (stationIndex >= allStations.length) {
      setFinished(true);
      return;
    }
    setStation(allStations[stationIndex]);
  }, [stationIndex]);

  useEffect(() => {
    if (stationIndex >= allStations.length) {
      setEndTimestamp(Date.now());
      setFinished(true);
    }
  }, [stationStatus]);

  useEffect(() => {
    if (seconds <= 0 && stationStatus === StationStatus.BREAK) {
      //updateStationTimes();
      startNextStation();
    }
    if (finished) {
      return;
    }

    const interval = setInterval(
      () => setNowTime(milisecondsToSeconds(Date.now())),
      100
    );
    return () => clearInterval(interval);
  }, [nowTime]);

  function clickNextStation(passed?: boolean) {
    if (seconds > 0 && stationStatus == StationStatus.NO_BREAK) {
      if (passed === undefined)
        throw "clickNextStation: passed parameter is missing [a]";

      updateStationTimes(passed);
      setStationStatus(StationStatus.BREAK);
    } else {
      if (stationStatus == StationStatus.NO_BREAK) {
        if (passed === undefined)
          throw "clickNextStation: passed parameter is missing [b]";
        updateStationTimes(passed);
      }
      startNextStation();
    }
  }

  function startNextStation() {
    setStationIndex((state) => state + 1);

    setEndStationTime(milisecondsToSeconds(Date.now()) + station.time);
    setStationStatus(StationStatus.NO_BREAK);
  }

  function setEndDruckCallback(druck: number) {
    setPerson((state) => ({ ...state, druck: { ...state.druck, end: druck } }));
  }

  return (
    <div className={styles.mainContainer}>
      <ScoreBoard
        person={person}
        stationTimes={stationTimes}
        startTimestamp={startTimestamp}
        endTimestamp={endTimestamp}
        endStationTime={endStationTime}
        sumTimeSeconds={
          (endTimestamp ? milisecondsToSeconds(endTimestamp) : nowTime) -
          milisecondsToSeconds(startTimestamp)
        }
        stationStatus={stationStatus}
        finished={finished}
        save={(scoreBoardData: ScoreBoardData) => {
          saveScoreBoardDataToStorage(scoreBoardData);
        }}
      />

      {person.druck.end === undefined &&
        (!finished ? (
          stationStatus == StationStatus.BREAK ? (
            <BreakStationCard
              seconds={seconds}
              stationIndex={stationIndex}
              clickNextStation={clickNextStation}
            />
          ) : (
            <MainStationCard
              station={station}
              stationIndex={stationIndex}
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
