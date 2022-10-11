import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/StationView.module.css";
import { formatSecondsToMinutesAndSeconds } from "../utils/utils";
import ScoreBoard, { StationTime } from "./ScoreBoard";

export const allStations: Station[] = [
  {
    id: "Gehen",
    description:
      "Gehen ohne und mit zwei Kanistern (Zeit: 4min) 100m gehen mit Kanister (je 16,6 kg) und 100m gehen ohne Kanister",
    time: 4 * 60,
  },
  {
    id: "Treppe",
    description:
      "Stufen rauf und heruntersteigen (Zeit: 3,5 min) ca. 180 Stufen (90 rauf und 90 hinunter)",
    time: 3.5 * 60,
  },
  {
    id: "Reifen",
    description:
      "Hämmern eines LKW-Reifen (Zeit: 2 min) Mit einem Vorschlaghammer (ca. 6kg) muss ein LKW-Reifen (ca. 47kg) über eine Strecke von drei Metern geschlagen werden.",
    time: 2 * 60,
  },
  {
    id: "Hindernis",
    description:
      "Unterkriechen und übersteigen von Hindernissen (Zeit: 3 min)\nAuf einer Länge von acht Metern werden mit einem Abstand von zwei Metern 60cm hohe Hindernisse aufgebaut.  Diese Hindernisse müssen in drei Durchläufen abwechselnd unterkrochen bzw. überstiegen werden.",
    time: 3 * 60,
  },
  {
    id: "Schlauch",
    description:
      "C-Schlauch einfach rollen (Zeit: 2min) Ein C-Schlauch muss einfach aufgerollt werden. Dabei darf sich das Ende nicht von der Stelle bewegen.",
    time: 2 * 60,
  },
];

export type Station = {
  id: string;
  description: string;
  time: number;
};

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

  const [endDruck, setEndDruck] = useState<number | undefined>(undefined);

  function updateStationTimes() {
    setStationTimes((state) => [
      ...state.filter((s) => s.station.id !== station.id),
      { station: station, time: station.time - seconds },
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
    const interval = setInterval(() => setSeconds((state) => state - 1), 100);
    return () => clearInterval(interval);
  }, [seconds]);

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

  return (
    <div className={styles.mainContainer}>
      <ScoreBoard person={person} stationTimes={stationTimes} />

      {!finished ? (
        stationStatus == StationStatus.BREAK ? (
          <div className={`${styles.card} ${styles.break}`}>
            <h2>Break</h2>
            Next Station:{" "}
            {allStations.length > stationIndex + 1 &&
              allStations[stationIndex + 1].id}{" "}
            ({stationIndex + 1}
            )
            <br />
            <br />
            {formatSecondsToMinutesAndSeconds(seconds)}
            <br />
            <br />
            <button onClick={clickNextStation}>Start Next Station</button>
          </div>
        ) : (
          <div className={styles.card}>
            <h2>
              Station {station.id} ({stationIndex}):
            </h2>
            <p>{station.description}</p>
            {formatSecondsToMinutesAndSeconds(seconds)}
            <br />
            <br />
            <button onClick={clickNextStation}>
              Start {seconds > 0 ? "Break" : "Next Station"}
            </button>
          </div>
        )
      ) : (
        <div className={styles.card}>
          <h2>Finished</h2>
          <label>endDruck:</label>
          <div className={styles.endDruckContainer}>
            <input
              type={"number"}
              value={endDruck}
              onChange={(e) => setEndDruck(Number.parseFloat(e.target.value))}
              placeholder="endDruck"
            />
            <br />
            <button
              onClick={() => (person.druck.end = endDruck)}
              disabled={endDruck === undefined || endDruck == person.druck.end}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
