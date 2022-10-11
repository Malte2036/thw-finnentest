import { Station } from "../../models/Station";
import styles from "../../styles/StationView.module.css";
import { formatSecondsToMinutesAndSeconds } from "../../utils/utils";

export type MainStationCardProps = {
  station: Station;
  stationIndex: number;
  seconds: number;
  clickNextStation: () => void;
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
        Station {station.id} ({stationIndex}):
      </h2>
      <p>{station.description}</p>
      {formatSecondsToMinutesAndSeconds(seconds)}
      <br />
      <br />
      <button
        onClick={clickNextStation}
        className={seconds <= 0 ? styles.nextButtonTimeover : ""}
      >
        Start {seconds > 0 ? "Break" : "Next Station"}
      </button>
    </div>
  );
}
