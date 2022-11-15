import styles from "../styles/Input.module.css";

type InputProps<T> = {
  value: T;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: any) => void;
};

export default function Input({
  value,
  type = "string",
  placeholder,
  error,
  onChange,
}: InputProps<number | string>) {
  return (
    <div>
      <input
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className={styles.errorContainer}>{error}</div>}
    </div>
  );
}
