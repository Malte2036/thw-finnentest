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
      <h2>Break</h2>
      Next Station:{" "}
      {allStations.length > stationIndex + 1 &&
        allStations[stationIndex + 1].name}{" "}
      ({stationIndex + 1}
      )
      <br />
      <br />
      {formatSecondsToMinutesAndSeconds(seconds)}
      <br />
      <br />
      <button
        onClick={() => clickNextStation()}
        className={seconds <= 0 ? styles.timeover : ""}
      >
        Start Next Station
      </button>
    </div>
  );
}
