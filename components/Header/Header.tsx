import classNames from "classnames";
import logo from "@/public/icon-512x512.png";
import styles from "./Header.module.scss";
import Image from "next/image";
import { lang } from "@/utils/language/language";
import { useRouter } from "next/router";

export type HeaderProps = {
  shrinkHeader: boolean;
};
export default function Header({ shrinkHeader }: HeaderProps) {
  const router = useRouter();

  return (
    <div
      className={classNames(styles.header, {
        [styles.shrinkHeader]: shrinkHeader,
      })}
    >
      <div className={styles.headerContentContainer}>
        <div className={styles.headerLeftContentContainer}>
          <div className={styles.logo} onClick={() => router.reload()}>
            <Image src={logo} alt="Logo" fill />
          </div>
          <h1 className={styles.title} onClick={() => router.reload()}>
            {lang("app-title")}
          </h1>
        </div>
        <button
          data-umami-event="Click More THW Tools"
          className={styles.moreTHWToolsButton}
        >
          <a href="https://thw-tools.de" target="_blank" rel="noreferrer">
            {lang("more-thw-tools")}
          </a>
        </button>
      </div>
    </div>
  );
}
