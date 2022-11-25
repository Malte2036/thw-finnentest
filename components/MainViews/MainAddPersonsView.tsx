import { Person, SimplePerson } from "@/models/Person";
import { lang } from "@/utils/language/language";
import CreatePersonForm from "@/components/CreatePersonForm/CreatePersonForm";
import styles from "./MainAddPersonsView.module.scss";

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
    <div className={styles.container}>
      <CreatePersonForm
        addPerson={addPerson}
        allNames={allSavedSimplePersons.map((p) => p.name)}
      />
      {getPersons().length > 0 ? (
        <>
          <hr className={styles.line} />
          <div className={styles.personsContainer}>
            <h2>{lang("persons")}:</h2>
            <div className={styles.persons}>
              {getPersons().map((p) => (
                <div key={p.name}>
                  &#8226; {p.name} ({lang("startdruck")}: {p.druck.start} bar)
                  <br />
                </div>
              ))}
            </div>
            <button
              onClick={() => setStarted()}
              disabled={getPersons().length === 0}
            >
              {lang("start-test")}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
