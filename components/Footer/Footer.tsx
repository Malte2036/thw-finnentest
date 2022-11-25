import styles from "./Footer.module.scss";
import { lang } from "@/utils/language/language";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <a href="https://thw.codelam.de" target="_blank" rel="noreferrer">
          {lang("more-thw-tools")}
        </a>
      </div>
      <div>
        <a
          className={styles.copyrightName}
          href="https://github.com/Malte2036/thw-finnentest/"
          target="_blank"
          rel="noreferrer"
        >
          ©2022 Malte Sehmer
        </a>
      </div>
    </div>
  );
}
