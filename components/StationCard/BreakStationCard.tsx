import classNames from "classnames";
import { allStations } from "@/models/Station";
import styles from "@/styles/StationView.module.css";
import { lang } from "@/utils/language/language";
import { formatSecondsToMinutesAndSeconds } from "@/utils/utils";

export type BreakStationCardProps = {
  seconds: number;
  stationIndex: number;
  clickNextStation: (passed?: boolean) => void;
};
export default function BreakStationCard({
  seconds,
  stationIndex,
  clickNextStation,
}: BreakStationCardProps) {
  return (
    <div className={`${styles.card} ${styles.break}`}>
      <h2>{lang("break")}:</h2>
      {lang("next-station")}:{" "}
      {allStations.length > stationIndex + 1 &&
        allStations[stationIndex + 1].name}{" "}
      ({stationIndex + 2}
      )
      <br />
      <br />
      {lang("remaining-break-time")}:{" "}
      {formatSecondsToMinutesAndSeconds(seconds)}
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => clickNextStation()}
          className={classNames(styles.secondaryButton, {
            [styles.timeover]: seconds <= 0,
          })}
        >
          {lang("start-next-station")}
        </button>
      </div>
    </div>
  );
}
