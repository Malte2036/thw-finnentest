import classNames from "classnames";
import { allStations } from "@/models/Station";
import styles from "./StationView.module.scss";
import { lang } from "@/utils/language/language";
import { formatSecondsToMinutesAndSeconds } from "@/utils/utils";
import Button from "../Button/Button";

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
        <Button
          type={seconds <= 0 ? "secondary" : "primary"}
          data-umami-event="Click Start Next Station"
          onClick={() => clickNextStation()}
        >
          {lang("start-next-station")}
        </Button>
      </div>
    </div>
  );
}
