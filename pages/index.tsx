import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreatePersonForm from "../components/CreatePersonForm";
import StationView, { StationStatus } from "../components/StationView";
import { Person, SimplePerson } from "../models/Person";
import { ScoreBoardData } from "../models/ScoreBoardData";

import thwLogo from "../public/THW.svg";
import styles from "../styles/Home.module.css";
import {
  getScoreBoardDatasFromStorage,
  removeScoreBoardDatasFromStorage,
  saveSimplePersonToStorage,
  saveScoreBoardDataToStorage,
  getSimplePersonFromStorage,
} from "../utils/save";

const Home: NextPage = () => {
  const [started, setStarted] = useState<boolean>(false);

  const [scoreBoardDatas, setScoreBoardDatas] = useState<ScoreBoardData[]>([]);

  const [allSavedSimplePersons, setAllSavedSimplePersons] = useState<
    SimplePerson[]
  >([]);

  async function updateAllSavedSimplePersons() {
    setAllSavedSimplePersons(await getSimplePersonFromStorage());
  }

  const description =
    "Anwendung zum aufzeichnen und tracken des Finnentests. Der Finnentest ist ein standartisierter Leistungstest für Atemschutzgeräteträger der Feuerwehr oder des THW.";

  function resetTest() {
    removeScoreBoardDatasFromStorage();
    setStarted(false);
    setScoreBoardDatas([]);
  }

  function getPersons(): Person[] {
    return scoreBoardDatas.map((data) => data.person);
  }

  useEffect(() => {
    getScoreBoardDatasFromStorage().then((savedScoreBoardProps) => {
      if (savedScoreBoardProps.length !== 0) {
        setScoreBoardDatas(savedScoreBoardProps);
        setStarted(true);
      }
    });

    updateAllSavedSimplePersons();
  }, []);

  const addPerson = (person: Person) => {
    saveSimplePersonToStorage(person);

    setScoreBoardDatas((state) => [
      ...state.filter((s) => s.person.name !== person.name),
      {
        name: person.name,
        person,
        stationIndex: 0,
        stationTimes: [],
        startTimestamp: undefined,
        endTimestamp: undefined,
        endStationTime: undefined,
        stationStatus: StationStatus.NO_BREAK,
        finished: false,
        sumTime: undefined,
      },
    ]);

    updateAllSavedSimplePersons();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Finnentest</title>
        <link rel="icon" href="/icon-256x256.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
      </Head>
      <main className={styles.main}>
        <Image src={thwLogo} width={125} height={125} alt="THW Logo" />
        <h1 className={styles.title}>Finnentest</h1>
        {!started && (
          <p className={styles.description}>
            {description} Mehr zum Finnentest{" "}
            <a
              href="https://www.ffw-egestorf.de/index.php/einsatzabteilung/ausbildungsberichte/125-finnentest-fuer-atemschutzgeraetetraeger"
              target="_blank"
              rel="noreferrer"
            >
              hier
            </a>
            .
          </p>
        )}

        {started ? (
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
                window.confirm("Willst du wirklich den Test zurücksetzen?") &&
                resetTest()
              }
              className={styles.resetTestButton}
            >
              Test zurücksetzen
            </button>
          </>
        ) : (
          <>
            <CreatePersonForm
              addPerson={addPerson}
              allNames={allSavedSimplePersons.map((p) => p.name)}
            />
            <div className={styles.persons}>
              {getPersons().map((p) => (
                <div key={p.name}>
                  {p.name} (Startdruck: {p.druck.start} bar)
                  <br />
                </div>
              ))}
            </div>
            {scoreBoardDatas.length > 0 && (
              <button
                onClick={() => setStarted(true)}
                disabled={getPersons().length === 0}
                className={styles.startTestButton}
              >
                Test starten
              </button>
            )}
          </>
        )}
        <div className={styles.footer}>
          <div className={styles.moreToolsLink}>
            <a href="https://thw.codelam.de" target="_blank" rel="noreferrer">
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
