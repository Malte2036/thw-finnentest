import { useState } from "react";
import { Person } from "@/models/Person";
import styles from "./CreatePersonForm.module.scss";
import { lang } from "@/utils/language/language";
import Input from "../Input/Input";
import SelectMenuInput from "../SelectMenuInput/SelectMenuInput";
import Button from "../Button/Button";

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
      <h2>{lang("add-person")}:</h2>
      <SelectMenuInput
        value={name}
        setValue={setName}
        onChange={(e) => setName(e.target.value)}
        label={lang("name")}
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
        label={lang("startdruck")}
        placeholder={lang("startdruck")}
        error={startDruckError}
      />
      <Button
        type="primary"
        data-umami-event="Create Person"
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
      >
        {lang("add-person")}
      </Button>
    </div>
  );
}
