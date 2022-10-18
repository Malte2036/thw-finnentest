import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/StationView.module.css";
import BreakStationCard from "./StationCard/BreakStationCard";
import ScoreBoard, { StationTime } from "./ScoreBoard";
import MainStationCard from "./StationCard/MainStationCard";
import FinishedStationCard from "./StationCard/FinishedStationCard";
import { allStations, Station } from "../models/Station";
import { milisecondsToSeconds } from "../utils/utils";

enum StationStatus {
  BREAK,
  NO_BREAK,
}

export type StationViewProps = {
  person: Person;
};

export default function StationView({
  person: incommingPerson,
}: StationViewProps) {
  const [person, setPerson] = useState<Person>(incommingPerson);

  useEffect(() => {
    setPerson(incommingPerson);
  }, [incommingPerson]);

  const [station, setStation] = useState<Station>(allStations[0]);
  const [stationIndex, setStationIndex] = useState<number>(0);

  const [endStationTime, setEndStationTime] = useState<number>(
    milisecondsToSeconds(Date.now()) + station.time
  );
  const [nowTime, setNowTime] = useState<number>(
    milisecondsToSeconds(Date.now())
  );

  const seconds = endStationTime - nowTime;

  const [stationStatus, setStationStatus] = useState<StationStatus>(
    StationStatus.NO_BREAK
  );

  const [stationTimes, setStationTimes] = useState<StationTime[]>([]);

  const [finished, setFinished] = useState<boolean>(false);

  const [startTimestamp] = useState<number>(Date.now());
  const [endTimestamp, setEndTimestamp] = useState<number | undefined>();

  function updateStationTimes(passed: boolean) {
    setStationTimes((state) => [
      ...state.filter((s) => s.station.name !== station.name),
      {
        station: station,
        time: station.time - seconds,
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
    if (stationStatus === StationStatus.BREAK) {
      //updateStationTimes();
      if (stationIndex + 1 >= allStations.length) {
        setEndTimestamp(Date.now());
        setFinished(true);
      }
    }
  }, [stationStatus]);

  useEffect(() => {
    setEndStationTime(milisecondsToSeconds(Date.now()) + station.time);
    setStationStatus(StationStatus.NO_BREAK);
  }, [station]);

  useEffect(() => {
    if (seconds <= 0 && stationStatus === StationStatus.BREAK) {
      //updateStationTimes();
      setStationIndex((state) => state + 1);
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
      setStationIndex((state) => state + 1);
      setStationStatus(StationStatus.NO_BREAK);
    }
  }

  function setEndDruckCallback(druck: number) {
    setPerson((state) => ({ ...state, druck: { ...state.druck, end: druck } }));
  }

  return (
    <div className={styles.mainContainer}>
      <ScoreBoard
        person={person}
        sumTimeSeconds={
          (endTimestamp ? milisecondsToSeconds(endTimestamp) : nowTime) -
          milisecondsToSeconds(startTimestamp)
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
