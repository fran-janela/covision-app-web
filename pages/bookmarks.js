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
      .get(
        "https://covision-backend.herokuapp.com/api/bookmarks/?format=json",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
      `https://covision-backend.herokuapp.com/api/bookmarks/${id}/`
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
                <h2 className={styles.country}>{info.country}</h2>
                <h3 className={styles.province}>{info.region}</h3>
                <p className={styles.confirmed}>{info.confirmed}</p>
                <p className={styles.deaths}>{info.deaths}</p>
                <button
                  className={`btn ${styles.delete}`}
                  onClick={() => handleDelete(info)}
                >
                  <Image
                    alt="Delete"
                    src={trash}
                    width="100vw"
                    height="100vw"
                  />
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
