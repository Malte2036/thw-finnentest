import { useState } from "react";
import styles from "../../styles/StationView.module.css";

export type FinishedStationCardProps = {
  setEndDruckCallback: (druck: number) => void;
};

export default function FinishedStationCard({
  setEndDruckCallback,
}: FinishedStationCardProps) {
  const [endDruck, setEndDruck] = useState<number | undefined>(undefined);
  return (
    <div className={styles.card}>
      <h2>Finished</h2>
      <label>endDruck:</label>
      <div className={styles.endDruckContainer}>
        <input
          type={"number"}
          value={endDruck === undefined ? "" : endDruck}
          onChange={(e) => setEndDruck(Number.parseFloat(e.target.value))}
          placeholder="endDruck"
        />
        <button
          onClick={() => {
            setEndDruckCallback(endDruck ?? 0);
          }}
          disabled={endDruck === undefined}
          className={styles.submitButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
