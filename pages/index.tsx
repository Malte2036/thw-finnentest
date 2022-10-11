import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import StationView from "../components/StationView";
import { Person } from "../models/Person";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [autoSkipOnTimerEnd, setAutoSkipOnTimerEnd] = useState<boolean>(false);

  const [persons, setPersons] = useState<Person[]>([]);

  function resetTest() {
    setStarted(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Finnentest</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Finnentest</h1>

        {started ? (
          persons.map((p) => (
            <StationView
              key={p.name}
              person={p}
              autoSkipOnTimerEnd={autoSkipOnTimerEnd}
              resetTestCallback={resetTest}
            />
          ))
        ) : (
          <>
            <CreatePersonForm
              addPerson={(name: string) =>
                setPersons((state) => [
                  ...state,
                  { name, druck: { start: undefined, end: undefined } },
                ])
              }
            />
            {persons.map((p) => (
              <div key={p.name}>
                {p.name}
                <br />
              </div>
            ))}
            <div
              onClick={() => setAutoSkipOnTimerEnd(!autoSkipOnTimerEnd)}
              className={styles.checkBoxContainer}
            >
              <input type="checkbox" defaultChecked={autoSkipOnTimerEnd} />{" "}
              autoSkipOnTimerEnd
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
