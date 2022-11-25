import { Person, SimplePerson } from "@/models/Person";
import { lang } from "@/utils/language/language";
import CreatePersonForm from "../CreatePersonForm";
import styles from "@/styles/MainAddPersonsView.module.scss";

export type MainAddPersonsViewProps = {
  getPersons: () => Person[];
  addPerson: (person: Person) => void;
  allSavedSimplePersons: SimplePerson[];
  setStarted: () => void;
};

export default function MainAddPersonsView({
  getPersons,
  addPerson,
  allSavedSimplePersons,
  setStarted,
}: MainAddPersonsViewProps) {
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
          onClick={() => setStarted()}
          disabled={getPersons().length === 0}
          className={styles.startTestButton}
        >
          {lang("start-test")}
        </button>
      )}
    </>
  );
}
