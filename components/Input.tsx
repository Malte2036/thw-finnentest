import styles from "@/styles/Input.module.scss";

export type InputProps<T> = {
  value: T;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
};

export default function Input({
  value,
  type = "string",
  label,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
}: InputProps<number | string>) {
  return (
    <div className={styles.container}>
      {label ? <label>{label}</label> : null}
      <input
        value={value}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <div className={styles.errorContainer}>{error}</div>}
    </div>
  );
}
