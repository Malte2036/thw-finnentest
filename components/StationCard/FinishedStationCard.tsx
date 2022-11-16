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
      <h2>Beendet</h2>
      <label>Enddruck:</label>
      <div className={styles.endDruckContainer}>
        <input
          type={"number"}
          value={endDruck === undefined ? "" : endDruck}
          onChange={(e) =>
            setEndDruck(
              e.target.value.length != 0
                ? Number.parseFloat(e.target.value)
                : undefined
            )
          }
          placeholder="Enddruck"
        />
        <button
          onClick={() => {
            setEndDruckCallback(endDruck ?? 0);
          }}
          disabled={endDruck === undefined}
          className={styles.submitButton}
        >
          Absenden
        </button>
      </div>
    </div>
  );
}
