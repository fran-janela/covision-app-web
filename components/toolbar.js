import { useRouter } from "next/router";
import styles from "../styles/components/Toolbar.module.css";

export const Toolbar = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/search")}>Serach</div>
      <div onClick={() => router.push("/bookmarks")}>Bookmarks</div>
      <div
        onClick={() =>
          (window.location.href = "https://github.com/fran-janela")
        }
      >
        Credits
      </div>
    </div>
  );
};
