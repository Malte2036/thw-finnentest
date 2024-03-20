import { ScoreBoardData } from "@/models/ScoreBoardData";
import styles from "./MainStartedView.module.scss";
import { lang } from "@/utils/language/language";
import { saveScoreBoardDataToStorage } from "@/utils/save";
import StationView from "../StationCard/StationView";
import Button from "../Button/Button";

export type MainStartedViewProps = {
  scoreBoardDatas: ScoreBoardData[];
  resetTest: () => void;
};

export default function MainStartedView({
  scoreBoardDatas,
  resetTest,
}: MainStartedViewProps) {
  return (
    <>
      <div className={styles.stationViewsContainer}>
        {scoreBoardDatas.map((data) => (
          <StationView
            key={data.person.name}
            scoreBoardData={data}
            save={(scoreBoardData: ScoreBoardData) => {
              saveScoreBoardDataToStorage(scoreBoardData);
            }}
          />
        ))}
      </div>
      <Button
        type="secondary"
        data-umami-event="Reset Test"
        onClick={() =>
          window.confirm(lang("reset-test-confirmation")) && resetTest()
        }
      >
        {lang("reset-test")}
      </Button>
    </>
  );
}
