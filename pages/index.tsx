import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StationStatus } from "@/components/StationView";
import { Person, SimplePerson } from "@/models/Person";
import { ScoreBoardData } from "@/models/ScoreBoardData";

import thwLogo from "@/public/THW.svg";
import styles from "@/styles/Home.module.scss";
import { lang } from "@/utils/language/language";
import {
  getScoreBoardDatasFromStorage,
  removeScoreBoardDatasFromStorage,
  saveSimplePersonToStorage,
  getSimplePersonFromStorage,
} from "@/utils/save";
import MainStartedView from "@/components/MainStartedView";
import MainNotStartedView from "@/components/MainNotStartedView";
import Head from "next/head";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  const [started, setStarted] = useState<boolean>(false);

  const [scoreBoardDatas, setScoreBoardDatas] = useState<ScoreBoardData[]>([]);

  const [allSavedSimplePersons, setAllSavedSimplePersons] = useState<
    SimplePerson[]
  >([]);

  async function updateAllSavedSimplePersons() {
    setAllSavedSimplePersons(await getSimplePersonFromStorage());
  }

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
        <title>THW Finnentest</title>
        <link rel="icon" href="/icon-256x256.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={lang("app-description")} />
      </Head>
      <main className={styles.main}>
        <Image src={thwLogo} width={125} height={125} alt="THW Logo" />
        <h1 className={styles.title}>{lang("app-title")}</h1>
        {!started && (
          <p className={styles.description}>
            {lang("app-description")} {lang("app-description-more")}{" "}
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
          <MainStartedView
            scoreBoardDatas={scoreBoardDatas}
            resetTest={resetTest}
          />
        ) : (
          <MainNotStartedView
            getPersons={getPersons}
            addPerson={addPerson}
            allSavedSimplePersons={allSavedSimplePersons}
            setStarted={setStarted}
          />
        )}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
