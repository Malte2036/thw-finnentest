import { useEffect, useState } from "react";
import styles from "../styles/StationView.module.css";

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

export default function StationView() {
  const [station, setStation] = useState<Station>(allStations[0]);
  const [stationIndex, setStationIndex] = useState<number>(0);

  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (stationIndex >= allStations.length) {
      setStationIndex(0);
      return;
    }
    setStation(allStations[stationIndex]);
  }, [stationIndex]);

  useEffect(() => {
    setSeconds(station.time);
  }, [station]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((state) => state - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      <div className={styles.card}>
        <h2>Station {station.id}:</h2>
        <p>{station.description}</p>
        {seconds}s
        <br />
        <br />
        <button onClick={() => setStationIndex((state) => state + 1)}>
          Next
        </button>
      </div>
    </>
  );
}
