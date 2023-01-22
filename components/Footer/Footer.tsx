import styles from "./Footer.module.scss";
import { lang } from "@/utils/language/language";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <a href="https://thw-tools.de" target="_blank" rel="noreferrer">
          {lang("more-thw-tools")}
        </a>
      </div>
      <div>
        <a
          className={styles.copyrightName}
          href="https://thw-tools.de/impressum"
          target="_blank"
          rel="noreferrer"
        >
          ©2023 Malte Sehmer
        </a>
      </div>
    </div>
  );
}
