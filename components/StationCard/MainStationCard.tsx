import { Dispatch, SetStateAction } from "react";
import { Station } from "../../models/Station";
import styles from "../../styles/StationView.module.css";
import { formatSecondsToMinutesAndSeconds } from "../../utils/utils";

export type MainStationCardProps = {
  station: Station;
  stationIndex: number;
  seconds: number;
  clickNextStation: (passed?: boolean) => void;
};

export default function MainStationCard({
  station,
  stationIndex,
  seconds,
  clickNextStation,
}: MainStationCardProps) {
  return (
    <div className={styles.card}>
      <h2>
        Station {station.name} ({stationIndex}):
      </h2>
      <p>{station.description}</p>
      <span className={seconds <= 0 ? styles.timeover : ""}>
        {formatSecondsToMinutesAndSeconds(seconds)}
      </span>
      <br />
      <br />

      <div className={seconds <= 0 ? styles.timeover : ""}>
        <button
          onClick={() => {
            clickNextStation(false);
          }}
        >
          Failed
        </button>
        <br />
        <br />
        <button onClick={() => clickNextStation(true)}>Passed</button>
      </div>
    </div>
  );
}
