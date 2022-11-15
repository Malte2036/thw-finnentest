import { useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/CreatePersonForm.module.css";
import Input from "./Input";
import SelectMenuInput from "./SelectMenuInput";

export type CreatePersonFormProps = {
  addPerson: (person: Person) => void;
  allNames: string[];
};

export default function CreatePersonForm({
  addPerson,
  allNames,
}: CreatePersonFormProps) {
  const [name, setName] = useState<string>("");
  const [startDruck, setStartDruck] = useState<number | undefined>();
  const [startDruckError, setStartDruckError] = useState<string | undefined>();

  return (
    <div className={styles.form}>
      <SelectMenuInput
        value={name}
        setValue={setName}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        items={allNames}
      />
      <Input
        value={startDruck === undefined ? "" : startDruck}
        type="number"
        onChange={(e) => {
          setStartDruck(Number.parseFloat(e.target.value));
        }}
        placeholder="Startdruck"
        error={startDruckError}
      />
      <button
        onClick={() => {
          if (!startDruck || startDruck <= 0 || startDruck > 450) {
            setStartDruckError(
              "Der Startdruck muss zwischen 0 und 450 bar sein"
            );
            setStartDruck(undefined);
            return;
          }
          addPerson({
            name,
            druck: { start: startDruck!, end: undefined },
          });
          setName("");
          setStartDruck(undefined);
          setStartDruckError(undefined);
        }}
        disabled={name.length == 0 || startDruck === undefined}
        className={styles.addButton}
      >
        Hinzufügen
      </button>
    </div>
  );
}
