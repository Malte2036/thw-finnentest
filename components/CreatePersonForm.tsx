import { useState } from "react";
import styles from "../styles/CreatePersonForm.module.css";

export type CreatePersonFormProps = {
  addPerson: (name: string) => void;
};

export default function CreatePersonForm({ addPerson }: CreatePersonFormProps) {
  const [name, setName] = useState<string>("");
  return (
    <div className={styles.form}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button
        onClick={() => addPerson(name)}
        disabled={name.length == 0}
        className={styles.addButton}
      >
        Add
      </button>
    </div>
  );
}
