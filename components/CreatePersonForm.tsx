import { useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/CreatePersonForm.module.css";
import { lang } from "../utils/language/language";
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

  const isStartDruckSet = startDruck !== undefined && !isNaN(startDruck);

  return (
    <div className={styles.form}>
      <SelectMenuInput
        value={name}
        setValue={setName}
        onChange={(e) => setName(e.target.value)}
        placeholder={lang("name")}
        items={allNames}
      />
      <Input
        value={isStartDruckSet ? startDruck : ""}
        type="number"
        onChange={(e) => {
          setStartDruck(
            !isNaN(Number.parseFloat(e.target.value))
              ? Number.parseFloat(e.target.value)
              : undefined
          );
        }}
        placeholder={lang("startdruck")}
        error={startDruckError}
      />
      <button
        onClick={() => {
          if (!isStartDruckSet || startDruck <= 0 || startDruck > 450) {
            setStartDruckError(lang("startdruck-error-range"));
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
        {lang("add")}
      </button>
    </div>
  );
}
