import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/StationView.module.css";
import BreakStationCard from "./StationCard/BreakStationCard";
import ScoreBoard, { StationTime } from "./ScoreBoard";
import MainStationCard from "./StationCard/MainStationCard";
import FinishedStationCard from "./StationCard/FinishedStationCard";
import { allStations, Station } from "../models/Station";

enum StationStatus {
  BREAK,
  NO_BREAK,
}

export type StationViewProps = {
  person: Person;
  autoSkipOnTimerEnd: boolean;
};

export default function StationView({
  person,
  autoSkipOnTimerEnd,
}: StationViewProps) {
  const [station, setStation] = useState<Station>(allStations[0]);
  const [stationIndex, setStationIndex] = useState<number>(0);

  const [seconds, setSeconds] = useState<number>(100);

  const [stationStatus, setStationStatus] = useState<StationStatus>(
    StationStatus.NO_BREAK
  );

  const [stationTimes, setStationTimes] = useState<StationTime[]>([]);

  const [finished, setFinished] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);

  const startTimestamp = Date.now();
  const [endTimestamp, setEndTimestamp] = useState<number | undefined>();

  function updateStationTimes() {
    setStationTimes((state) => [
      ...state.filter((s) => s.station.id !== station.id),
      {
        station: station,
        time: station.time - seconds,
        defaultTime: station.time,
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
    if (stationStatus === StationStatus.BREAK) {
      updateStationTimes();
      if (stationIndex + 1 >= allStations.length) {
        setFinished(true);
      }
    }
  }, [stationStatus]);

  useEffect(() => {
    setSeconds(station.time);
    setStationStatus(StationStatus.NO_BREAK);
  }, [station]);

  useEffect(() => {
    if (seconds <= 0 && autoSkipOnTimerEnd) {
      updateStationTimes();
      setStationIndex((state) => state + 1);
      return;
    }
    if (finished) {
      return;
    }

    const interval = setInterval(() => setSeconds((state) => state - 0.1), 100);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (finished) {
      setEndTimestamp(Date.now());
    }
  }, [finished]);

  function clickNextStation() {
    if (seconds > 0 && stationStatus == StationStatus.NO_BREAK) {
      setStationStatus(StationStatus.BREAK);
    } else {
      if (stationStatus == StationStatus.NO_BREAK) {
        updateStationTimes();
      }
      setStationIndex((state) => state + 1);
      setStationStatus(StationStatus.NO_BREAK);
    }
  }

  function setEndDruckCallback(druck: number) {
    person.druck.end = druck;
    setRefresh(!refresh);
  }

  return (
    <div className={styles.mainContainer}>
      <ScoreBoard
        person={person}
        sumTime={
          endTimestamp !== undefined
            ? (endTimestamp - startTimestamp) / 10
            : undefined
        }
        stationTimes={stationTimes}
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
