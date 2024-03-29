import { useState } from "react";
import styles from "./StationView.module.scss";
import { lang } from "@/utils/language/language";
import Input from "../Input/Input";
import Button from "../Button/Button";

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
      <h2>{lang("finished")}</h2>
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
          label={lang("enddruck")}
          placeholder={lang("enddruck")}
          error={endDruckError}
        />
        <Button
          type="primary"
          data-umami-event="Submit End Druck"
          onClick={() => {
            if (endDruck === undefined || endDruck <= 0 || endDruck > 450) {
              setEndDruckError(lang("enddruck-error-range"));
              setEndDruck(undefined);
              return;
            }
            setEndDruckError(undefined);
            setEndDruckCallback(endDruck ?? 0);
          }}
          disabled={endDruck === undefined}
        >
          {lang("submit")}
        </Button>
      </div>
    </div>
  );
}
