import styles from "@/styles/Checkbox.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type CheckboxProps = {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  label: string;
};

export default function Checkbox({
  checked,
  setChecked,
  label,
}: CheckboxProps) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />{" "}
      {label}
    </div>
  );
}
