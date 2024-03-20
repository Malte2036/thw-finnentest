import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Person, SimplePerson } from "@/models/Person";
import { ScoreBoardData } from "@/models/ScoreBoardData";

import styles from "@/styles/MainPage.module.scss";
import { lang } from "@/utils/language/language";
import {
  getScoreBoardDatasFromStorage,
  removeScoreBoardDatasFromStorage,
  saveSimplePersonToStorage,
  getSimplePersonFromStorage,
} from "@/utils/save";
import MainStartedView from "@/components/MainViews/MainStartedView";
import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import MainWelcomeView from "@/components/MainViews/MainWelcomeView";
import MainAddPersonsView from "@/components/MainViews/MainAddPersonsView";
import { StationStatus } from "@/components/StationCard/StationView";
import Header from "@/components/Header/Header";

export enum Status {
  WELCOME,
  ADD_PERSONS,
  STARTED,
}

const MainPage: NextPage = () => {
  const [status, setStatus] = useState<Status>(Status.WELCOME);

  const [scoreBoardDatas, setScoreBoardDatas] = useState<ScoreBoardData[]>([]);

  const [allSavedSimplePersons, setAllSavedSimplePersons] = useState<
    SimplePerson[]
  >([]);

  async function updateAllSavedSimplePersons() {
    setAllSavedSimplePersons(await getSimplePersonFromStorage());
  }

  function resetTest() {
    removeScoreBoardDatasFromStorage();
    setStatus(Status.WELCOME);
    setScoreBoardDatas([]);
  }

  function getPersons(): Person[] {
    return scoreBoardDatas.map((data) => data.person);
  }

  useEffect(() => {
    getScoreBoardDatasFromStorage().then((savedScoreBoardProps) => {
      if (savedScoreBoardProps.length !== 0) {
        setScoreBoardDatas(savedScoreBoardProps);
        setStatus(Status.STARTED);
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

  function getMainView() {
    switch (status) {
      case Status.WELCOME:
        return (
          <MainWelcomeView
            startNextView={() => setStatus(Status.ADD_PERSONS)}
          />
        );
      case Status.ADD_PERSONS:
        return (
          <MainAddPersonsView
            addPerson={addPerson}
            allSavedSimplePersons={allSavedSimplePersons}
            persons={getPersons()}
            setStarted={() => setStatus(Status.STARTED)}
          />
        );
      case Status.STARTED:
        return (
          <MainStartedView
            scoreBoardDatas={scoreBoardDatas}
            resetTest={resetTest}
          />
        );
      default:
        return `Error: Status ${status} not found!`;
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Feuerwehr & THW Finnentest: Atemschutz Leistungstest App</title>
        <link rel="icon" href="/icon-256x256.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`${lang("app-description-leading")} ${lang(
            "app-description"
          )}`}
        />
      </Head>
      <main className={styles.main}>
        <Header shrinkHeader={status !== Status.WELCOME} />
        {getMainView()}

        <Footer />
      </main>
    </div>
  );
};

export default MainPage;
