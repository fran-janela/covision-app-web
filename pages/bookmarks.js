import Head from "next/head";
import styles from "../styles/Bookmarks.module.css";
import { Toolbar } from "../components/toolbar";
import Image from "next/image";
import trash from "../public/trash.png";
import { useEffect, useState } from "react";
import { LoadingBox } from "../components/loading_box";
import axios from "axios";

export const Bookmarks = () => {
  const [cases, setCases] = useState();
  const [loaded, setLoaded] = useState(false);

  async function getCasesInfo() {
    const apiResponse = await axios
      .get("http://127.0.0.1:8000/api/bookmarks/?format=json", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch(() => null);

    // console.log(apiResponse);
    setCases(apiResponse);
    setLoaded(true);
  }

  useEffect(() => {
    getCasesInfo();
  }, []);

  async function handleDelete({ id }) {
    console.log(id);
    const apiResponse = await axios.delete(
      `http://127.0.0.1:8000/api/bookmarks/${id}/`
    );
    window.location.reload();
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
          <div className={styles.main}>
            {cases.map((info, index) => (
              <div key={index} className={styles.case_container} id={index}>
                <div className={styles.date}>
                  {info.createdAt.split("T")[0]}
                </div>
                <h2 className={styles.country}>{info.country}</h2>
                <p className={styles.region}>{info.region}</p>
                <div className={styles.confirmed}>
                  <p className={styles.confirmed_title}>CONFIRMED</p>
                  <p className={styles.confirmed_data}>{info.confirmed}</p>
                </div>
                <div className={styles.deaths}>
                  <p className={styles.deaths_title}>DEATHS</p>
                  <p className={styles.deaths_data}>{info.deaths}</p>
                </div>
                <button
                  className={`btn ${styles.delete}`}
                  onClick={() => handleDelete(info)}
                >
                  <Image alt="Delete" src={trash} width={25} height={25} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
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
};

export default Bookmarks;
