import { Person, SimplePerson } from "@/models/Person";
import styles from "@/styles/Home.module.css";
import { lang } from "@/utils/language/language";
import CreatePersonForm from "./CreatePersonForm";

export type MainNotStartedViewProps = {
  getPersons: () => Person[];
  addPerson: (person: Person) => void;
  allSavedSimplePersons: SimplePerson[];
  setStarted: (started: boolean) => void;
};

export default function MainNotStartedView({
  getPersons,
  addPerson,
  allSavedSimplePersons,
  setStarted,
}: MainNotStartedViewProps) {
  return (
    <>
      <CreatePersonForm
        addPerson={addPerson}
        allNames={allSavedSimplePersons.map((p) => p.name)}
      />
      <div className={styles.persons}>
        {getPersons().map((p) => (
          <div key={p.name}>
            {p.name} ({lang("startdruck")}: {p.druck.start} bar)
            <br />
          </div>
        ))}
      </div>
      {getPersons().length > 0 && (
        <button
          onClick={() => setStarted(true)}
          disabled={getPersons().length === 0}
          className={styles.startTestButton}
        >
          {lang("start-test")}
        </button>
      )}
    </>
  );
}
