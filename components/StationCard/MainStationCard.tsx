import classNames from "classnames";
import { Station } from "@/models/Station";
import styles from "./StationView.module.scss";
import { lang } from "@/utils/language/language";
import { formatSecondsToMinutesAndSeconds } from "@/utils/utils";

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
        {lang("station")}: {station.name} ({stationIndex + 1}):
      </h2>
      <p>{station.description}</p>
      <div className={seconds <= 0 ? styles.timeover : ""}>
        {lang("remaining-time")}: {formatSecondsToMinutesAndSeconds(seconds)}
      </div>

      <div
        className={classNames(styles.buttonsContainer, {
          [styles.timeover]: seconds <= 0,
        })}
      >
        {seconds > -15 && (
          <button
            data-umami-event="Click Passed Station"
            onClick={() => clickNextStation(true)}
          >
            {lang("passed")}
          </button>
        )}
        <button
          data-umami-event="Click Not Passed Station"
          className={styles.secondaryButton}
          onClick={() => clickNextStation(false)}
        >
          {lang("not-passed")}
        </button>
      </div>
    </div>
  );
}
