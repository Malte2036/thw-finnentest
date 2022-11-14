import classNames from "classnames";
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
        Station: {station.name} ({stationIndex}):
      </h2>
      <p>{station.description}</p>
      <div className={seconds <= 0 ? styles.timeover : ""}>
        Verbleibende Zeit: {formatSecondsToMinutesAndSeconds(seconds)}
      </div>

      <div
        className={classNames(styles.buttonsContainer, {
          [styles.timeover]: seconds <= 0,
        })}
      >
        <button
          className={styles.secondaryButton}
          onClick={() => clickNextStation(false)}
        >
          Nicht geschafft
        </button>
        {seconds > -15 && (
          <button onClick={() => clickNextStation(true)}>Geschafft</button>
        )}
      </div>
    </div>
  );
}
