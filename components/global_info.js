import styles from "../styles/components/GlobalInfo.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import globe from "../public/globe.png";

export const GlobalInfo = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image alt="Covisiion Logo" src={globe} height="200vw" width="200vw" />
      </div>
      <div className={styles.info_board}>
        <h1
          className={styles.title}
        >{`${data.location} Covid Information Board`}</h1>
        <h2 className={styles.confirmed}>
          <b className={styles.bold_spaced}>Confirmed: </b> {data.confirmed}
        </h2>
        <p className={styles.deaths}>
          <b className={styles.bold_spaced}>Deaths: </b>
          <b className={styles.red_decor}>{data.deaths}</b>
        </p>
        <p
          className={styles.lastReported}
        >{`Last Report: ${data.lastReported}`}</p>
      </div>
    </div>
  );
};
