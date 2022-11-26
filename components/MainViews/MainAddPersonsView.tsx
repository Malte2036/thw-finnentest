import { Person, SimplePerson } from "@/models/Person";
import { lang } from "@/utils/language/language";
import CreatePersonForm from "@/components/CreatePersonForm/CreatePersonForm";
import styles from "./MainAddPersonsView.module.scss";

export type MainAddPersonsViewProps = {
  persons: Person[];
  addPerson: (person: Person) => void;
  allSavedSimplePersons: SimplePerson[];
  setStarted: () => void;
};

export default function MainAddPersonsView({
  persons,
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
      {persons.length > 0 ? (
        <>
          <hr className={styles.line} />
          <div className={styles.personsContainer}>
            <h2>{lang("persons")}:</h2>
            <ul className={styles.persons}>
              {persons.map((p) => (
                <li key={p.name}>
                  {p.name} ({lang("startdruck")}: {p.druck.start} bar)
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStarted()}
              disabled={persons.length === 0}
            >
              {lang("start-test")}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
