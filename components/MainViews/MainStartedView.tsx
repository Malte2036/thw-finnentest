import { ScoreBoardData } from "@/models/ScoreBoardData";
import styles from "../Home.module.scss";
import { lang } from "@/utils/language/language";
import { saveScoreBoardDataToStorage } from "@/utils/save";
import StationView from "../StationCard/StationView";

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
      <button
        onClick={() =>
          window.confirm(lang("reset-test-confirmation")) && resetTest()
        }
        className={styles.resetTestButton}
      >
        {lang("reset-test")}
      </button>
    </>
  );
}
