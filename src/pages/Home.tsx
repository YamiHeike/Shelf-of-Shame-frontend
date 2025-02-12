import { Sector } from "../components/Sector";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <main className={styles.hero}>
      <Sector />
    </main>
  );
};
