import { ScoreBoardData } from "@/models/ScoreBoardData";
import styles from "./MainStartedView.module.scss";
import { lang } from "@/utils/language/language";
import { saveScoreBoardDataToStorage } from "@/utils/save";
import StationView from "../StationCard/StationView";
import Button from "../Button/Button";
import { useDialogContext } from "hooks/useDialog";
import Dialog from "../Dialog/Dialog";

export type MainStartedViewProps = {
  scoreBoardDatas: ScoreBoardData[];
  resetTest: () => void;
};

export default function MainStartedView({
  scoreBoardDatas,
  resetTest,
}: MainStartedViewProps) {
  const dialogContext = useDialogContext();
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
          dialogContext?.setDialog(
            <Dialog
              title={lang("reset-test")}
              footer={
                <>
                  <Button
                    type="secondary"
                    onClick={() => dialogContext?.closeDialog()}
                  >
                    {lang("cancel")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      resetTest();
                      dialogContext?.closeDialog();
                    }}
                  >
                    {lang("reset-test")}
                  </Button>
                </>
              }
            >
              {lang("reset-test-confirmation")}
            </Dialog>
          )
        }
      >
        {lang("reset-test")}
      </Button>
    </>
  );
}
