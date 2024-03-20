import { lang } from "@/utils/language/language";
import styles from "./MainWelcomeView.module.scss";
import Button from "../Button/Button";

export type MainWelcomeViewProps = {
  startNextView: () => void;
};

export default function MainWelcomeView({
  startNextView,
}: MainWelcomeViewProps) {
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        <span className={styles.descriptionLeading}>
          {lang("app-description-leading")}
        </span>{" "}
        {lang("app-description")} <br /> {lang("app-description-more")}{" "}
        <a
          data-umami-event="View more information"
          href="https://www.ffw-egestorf.de/index.php/einsatzabteilung/ausbildungsberichte/125-finnentest-fuer-atemschutzgeraetetraeger"
          target="_blank"
          rel="noreferrer"
        >
          hier
        </a>
        .
      </p>
      <Button
        data-umami-event="Start Test"
        onClick={() => startNextView()}
        type="primary"
        className={styles.startButton}
      >
        {lang("start-test")}
      </Button>
    </div>
  );
}
