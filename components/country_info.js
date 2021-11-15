import styles from "../styles/components/CountryInfo.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import globe from "../public/globe.png";

export const CountryInfo = ({ data, population }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{`${data.location}`}</h1>
      <h2 className={styles.population}>
        <b className={styles.bold_spaced}>Population: </b>
        {population.population}
      </h2>
      <h3 className={styles.confirmed}>Confirmed</h3>
      <div className={styles.confirmed_data}>
        <p className={styles.confirmed_n}>{data.confirmed}</p>
        <p className={styles.confirmed_n_unit}>[pessoas]</p>
        <p className={styles.confirmed_p}>
          {Math.round((data.confirmed / population.population) * 1000000) /
            10000}
        </p>
        <p className={styles.confirmed_p_unit}>[%]</p>
      </div>
      <h3 className={styles.deaths}>Deaths</h3>
      <div className={styles.deaths_data}>
        <p className={styles.deaths_n}>{data.deaths}</p>
        <p className={styles.deaths_n_unit}>[pessoas]</p>
        <p className={styles.deaths_p}>
          {Math.round((data.deaths / population.population) * 1000000) / 10000}
        </p>
        <p className={styles.deaths_p_unit}>[%]</p>
      </div>
      <div className={styles.lastReported}>{data.lastReported}</div>
    </div>
  );
};
