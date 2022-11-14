import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import StationView from "../components/StationView";
import { Person } from "../models/Person";

import thwLogo from "../public/THW.svg";
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
        <Image src={thwLogo} width={125} height={125} />
        <h1 className={styles.title}>Finnentest</h1>
        {!started && (
          <p className={styles.description}>
            Anwendung zum aufzeichnen und tracken des Finnentests. Der
            Finnentest ist ein standartisierter Leistungstest für
            Atemschutzgeräteträger. Mehr zum Finnentest{" "}
            <a
              href="https://www.ffw-egestorf.de/index.php/einsatzabteilung/ausbildungsberichte/125-finnentest-fuer-atemschutzgeraetetraeger"
              target="_blank"
            >
              hier
            </a>
            .
          </p>
        )}

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
            {persons.length > 0 && (
              <button
                onClick={() => setStarted(true)}
                disabled={persons.length === 0}
                className={styles.startTestButton}
              >
                Start Test
              </button>
            )}
          </>
        )}
        <div className={styles.footer}>
          <div className={styles.moreToolsLink}>
            <a href="https://thw.codelam.de" target="_blank">
              Mehr THW Tools
            </a>
          </div>
          <div>©2022 Malte Sehmer</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
