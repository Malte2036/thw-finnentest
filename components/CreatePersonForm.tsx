import { useState } from "react";
import { Person } from "../models/Person";
import styles from "../styles/CreatePersonForm.module.css";

export type CreatePersonFormProps = {
  addPerson: (person: Person) => void;
};

export default function CreatePersonForm({ addPerson }: CreatePersonFormProps) {
  const [name, setName] = useState<string>("");
  const [startDruck, setStartDruck] = useState<number | undefined>();
  return (
    <div className={styles.form}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={startDruck === undefined ? "" : startDruck}
        type="number"
        onChange={(e) => setStartDruck(Number.parseFloat(e.target.value))}
        placeholder="startDruck"
      />
      <button
        onClick={() => {
          addPerson({
            name,
            druck: { start: startDruck!, end: undefined },
          });
          setName("");
          setStartDruck(undefined);
        }}
        disabled={name.length == 0 || startDruck === undefined}
        className={styles.addButton}
      >
        Add
      </button>
    </div>
  );
}
