import { useState } from "react";
import styles from "../../styles/StationView.module.css";
import Input from "../Input";

export type FinishedStationCardProps = {
  setEndDruckCallback: (druck: number) => void;
};

export default function FinishedStationCard({
  setEndDruckCallback,
}: FinishedStationCardProps) {
  const [endDruck, setEndDruck] = useState<number | undefined>(undefined);
  const [endDruckError, setEndDruckError] = useState<string | undefined>();
  return (
    <div className={styles.card}>
      <h2>Beendet</h2>
      <label>Enddruck:</label>
      <div className={styles.endDruckContainer}>
        <Input
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
          error={endDruckError}
        />
        <button
          onClick={() => {
            if (endDruck === undefined || endDruck <= 0 || endDruck > 450) {
              setEndDruckError(
                "Der Enddruck muss zwischen 1 und 450 bar liegen."
              );
              setEndDruck(undefined);
              return;
            }
            setEndDruckError(undefined);
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
