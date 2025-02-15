import { useAuth } from "../components/Auth";
import { AuthHomepage, Homepage } from "../components/Homepage";
import styles from "./Home.module.scss";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.hero}>
      {isAuthenticated ? <AuthHomepage /> : <Homepage />}
    </main>
  );
};
