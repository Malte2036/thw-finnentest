import { Dispatch, SetStateAction, useState } from "react";
import styles from "./SelectMenuInput.module.scss";
import Input, { InputProps } from "../Input/Input";

type SelectMenuInputProps<T> = InputProps<T> & {
  items: T;
  setValue: Dispatch<SetStateAction<T>>;
};

export default function SelectMenuInput({
  items,
  setValue,
  value,
  type,
  label,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
}: SelectMenuInputProps<any>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      onBlur={(e: any) => {
        setTimeout(() => {
          setOpen(false);
          if (onBlur) onBlur(e);
        }, 250);
      }}
    >
      <Input
        value={value}
        type={type}
        label={label}
        placeholder={placeholder}
        error={error}
        onChange={onChange}
        onFocus={(e: any) => {
          setOpen(!open);
          if (onFocus) onFocus(e);
        }}
      />
      {open && (
        <div className={styles.selectItems}>
          {items
            .map((item: any) => String(item))
            .filter((item: string) =>
              item.toLowerCase().startsWith(value.toLowerCase())
            )
            .map((item: string) => (
              <div
                key={item}
                className={styles.item}
                role="button"
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
