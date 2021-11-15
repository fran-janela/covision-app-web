import Image from "next/image";
import styles from "../styles/components/CovisionIndex.module.css";
import covision_logo from "../public/covision-logo.png";

export const CovisionIndex = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <div className={styles.logo_image}>
          <Image
            alt="Covisiion Logo"
            src={covision_logo}
            height="200vw"
            width="200vw"
          />
        </div>
        <h1 className={styles.logo_title}>COVISION</h1>
      </div>
      <div className={styles.description_container}>
        <p className={styles.description}>
          Este é um site desenvolvido para a disciplina de{" "}
          <b>Tecnologias Web</b>. Neste é possível encontrar dados sobre os{" "}
          <b>casos de Covid</b> de quase todo o Planeta, tanto procurando por
          país, quanto por estado.
        </p>
      </div>
    </div>
  );
};
