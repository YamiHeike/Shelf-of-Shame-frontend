import { RecommendationsPanel } from "../components";
import { AuthPage } from "./AuthPage";
import styles from "./RecommendationsPage.module.scss";

export const RecommendationsPage = () => {
  return (
    <AuthPage
      Page={
        <section className={styles.container}>
          <RecommendationsPanel />
        </section>
      }
    />
  );
};
