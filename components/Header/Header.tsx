import classNames from "classnames";
import thwLogo from "@/public/THW.svg";
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
        <div className={styles.thwLogo} onClick={() => router.reload()}>
          <Image src={thwLogo} alt="THW Logo" fill />
        </div>
        <h1 className={styles.title} onClick={() => router.reload()}>
          {lang("app-title")}
        </h1>
      </div>
    </div>
  );
}
