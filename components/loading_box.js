import Image from "next/image";
import styles from "../styles/components/LoadingBox.module.css";
import covid from "../public/covid.png";

export const LoadingBox = () => {
  return (
    <div className={styles.main}>
      <Image
        alt="Loading Box"
        src={covid}
        className={styles.rotate}
        width="250vw"
        height="250vw"
      />
    </div>
  );
};
