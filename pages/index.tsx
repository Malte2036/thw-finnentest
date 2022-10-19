import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Checkbox from "../components/Checkbox";
import CreatePersonForm from "../components/CreatePersonForm";
import StationView from "../components/StationView";
import { Person } from "../models/Person";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [started, setStarted] = useState<boolean>(false);

  const [persons, setPersons] = useState<Person[]>([]);

  function resetTest() {
    setStarted(false);
    setPersons([]);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Finnentest</title>
        <link rel="icon" href="/icon-256x256.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Finnentest</h1>

        {started ? (
          <>
            <div className={styles.stationViewsContainer}>
              {persons.map((p) => (
                <StationView key={p.name} person={p} />
              ))}
            </div>
            <button
              onClick={() => window.confirm("Reset Test?") && resetTest()}
              className={styles.resetTestButton}
            >
              Reset Test
            </button>
          </>
        ) : (
          <>
            <CreatePersonForm
              addPerson={(person: Person) => {
                if (!persons.map((p) => p.name).includes(person.name))
                  setPersons((state) => [...state, person]);
              }}
            />
            <div className={styles.persons}>
              {persons.map((p) => (
                <div key={p.name}>
                  {p.name}, startDruck: {p.druck.start}
                  <br />
                </div>
              ))}
            </div>
            <button
              onClick={() => setStarted(true)}
              disabled={persons.length === 0}
              className={styles.startTestButton}
            >
              Start Test
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
