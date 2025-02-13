import { Homepage } from "../components/Homepage";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <main className={styles.hero}>
      <Homepage />
    </main>
  );
};
