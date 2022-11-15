import classNames from "classnames";
import { allStations } from "../../models/Station";
import styles from "../../styles/StationView.module.css";
import { formatSecondsToMinutesAndSeconds } from "../../utils/utils";

export type BreakStationCard = {
  seconds: number;
  stationIndex: number;
  clickNextStation: (passed?: boolean) => void;
};
export default function BreakStationCard({
  seconds,
  stationIndex,
  clickNextStation,
}: BreakStationCard) {
  return (
    <div className={`${styles.card} ${styles.break}`}>
      <h2>Pause</h2>
      Nächste Station:{" "}
      {allStations.length > stationIndex + 1 &&
        allStations[stationIndex + 1].name}{" "}
      ({stationIndex + 2}
      )
      <br />
      <br />
      Verbleibende Zeit: {formatSecondsToMinutesAndSeconds(seconds)}
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => clickNextStation()}
          className={classNames(styles.secondaryButton, {
            [styles.timeover]: seconds <= 0,
          })}
        >
          Nächste Station starten
        </button>
      </div>
    </div>
  );
}
