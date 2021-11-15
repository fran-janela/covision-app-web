import axios from "axios";
import Head from "next/head";
import styles from "../styles/Search.module.css";
import { Toolbar } from "../components/toolbar";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading_box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import save from "../public/save.png";

export const Search = () => {
  const [filter, setFilter] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [cases, setCases] = useState();

  useEffect(() => {
    async function getProps() {
      const apiResponse = await fetch(
        `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats`,
        {
          headers: {
            "x-rapidapi-host": `${process.env.NEXT_PUBLIC_API_HOST}`,
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      const { data } = await apiResponse.json();

      const { covid19Stats } = data;

      setCases(covid19Stats);
      setLoaded(true);
    }
    getProps();
  }, []);

  async function handleChange(event) {
    setFilter(event.target.value);
  }
  async function handleSubmit({ country, province, confirmed, deaths }) {
    const myApiResponse = await axios
      .post(
        `https://covision-backend.herokuapp.com/api/bookmarks/`,
        {
          country: country,
          region: province,
          confirmed: confirmed,
          deaths: deaths,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      // .then((e) => console.log(e))
      .catch(() => null);
  }
  if (loaded && !!cases) {
    return (
      <>
        <Head>
          <title>Covision</title>
          <meta name="description" content="Covision frontend" />
          <link rel="icon" href="/covision-logo.ico" />
        </Head>
        <Toolbar />
        <div className={styles.container}>
          <div className={styles.serach_container}>
            <TextField
              label="Search for data   (Case-sensitive)"
              onChange={handleChange}
              className={styles.search_input}
              size="small"
            />
          </div>
          <div className={styles.main}>
            {cases
              .filter((e) => e.keyId.includes(filter))
              .map((info, index) => (
                <div
                  key={index}
                  className={styles.case_container}
                  id={info.keyId}
                >
                  <div className={styles.info_container}>
                    <h2 className={styles.country}>{info.country}</h2>
                    <h3 className={styles.province}>{info.province}</h3>
                    <p className={styles.confirmed}>{info.confirmed}</p>
                    <p className={styles.deaths}>{info.deaths}</p>
                  </div>
                  <div className={styles.save_container}>
                    <button
                      className={`btn ${styles.save_button}`}
                      onClick={() => handleSubmit(info)}
                    >
                      <Image
                        alt="Save Image"
                        src={save}
                        width="50vw"
                        height="50vw"
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={styles.body}>
      <Head>
        <title>Covision</title>
        <meta name="description" content="Covision frontend" />
        <link rel="icon" href="/covision-logo.ico" />
      </Head>
      <Toolbar />
      <div className={styles.container}>
        <LoadingBox />
      </div>
    </div>
  );
};

export default Search;
