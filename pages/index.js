import Head from "next/head";
import CountrySelect from "../components/autocomplete";
import { GlobalInfo } from "../components/global_info";
import { Toolbar } from "../components/toolbar";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading_box";
import { CovisionIndex } from "../components/covision_index";
import { CountryInfo } from "../components/country_info";

export const Home = () => {
  const [globalInfo, setGlobalInfo] = useState();
  const [searchData, setSearchData] = useState();
  const [populationData, setPopulationData] = useState();
  const [searched, setSearched] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    const countryData = await fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${event.target[0].value}`,
      {
        headers: {
          "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );

    const { data } = await countryData.json();

    setSearchData(data);

    const populationData = await fetch(
      `https://world-population.p.rapidapi.com/population?country_name=${event.target[0].value}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_POPULATION_HOST}`,
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_POPULATION_KEY}`,
        },
      }
    );
    const { body } = await populationData.json();
    console.log(body);
    setPopulationData(body);

    setSearched(true);
  }
  useEffect(() => {
    async function getGlobalInfo() {
      const apiResponse = await fetch(
        "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
        {
          headers: {
            "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      const { data } = await apiResponse.json();
      setGlobalInfo(data);
      setLoaded(true);
      console.log(data);
    }
    getGlobalInfo();
  }, []);

  if (!loaded) {
    return (
      <>
        <Head>
          <title>Covision</title>
          <meta name="description" content="Covision frontend" />
          <link rel="icon" href="/covision-logo.ico" />
        </Head>
        <Toolbar />
        <div className={styles.container}>
          <LoadingBox />
        </div>
      </>
    );
  } else {
    if (!searched) {
      return (
        <>
          <Head>
            <title>Covision</title>
            <meta name="description" content="Covision frontend" />
            <link rel="icon" href="/covision-logo.ico" />
          </Head>
          <Toolbar />
          <div className={styles.container}>
            <CovisionIndex />
            <GlobalInfo data={globalInfo} />
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <div className={styles.country_input}>
                <CountrySelect />
              </div>
              <button type="submit" className={`btn ${styles.button_area}`}>
                PROCURAR
              </button>
            </form>
          </div>
        </>
      );
    }

    if (searched && !!searchData) {
      return (
        <>
          <Head>
            <title>Covision</title>
            <meta name="description" content="Covision frontend" />
            <link rel="icon" href="/covision-logo.ico" />
          </Head>
          <Toolbar />
          <div className={styles.container}>
            <CovisionIndex />
            <GlobalInfo data={globalInfo} />
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <div className={styles.country_input}>
                <CountrySelect />
              </div>
              <button type="submit" className={`btn ${styles.button_area}`}>
                PROCURAR
              </button>
            </form>
            <CountryInfo data={searchData} population={populationData} />
          </div>
        </>
      );
    }
  }
};

export default Home;
