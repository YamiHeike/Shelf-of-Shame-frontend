import { useState } from "react";
import { RecommendationsPanel } from "../components";
import { AuthPage } from "./AuthPage";
import styles from "./RecommendationsPage.module.scss";
import { RecommendationsFilter } from "../types";

export const RecommendationsPage = () => {
  const [filters, setFilters] = useState<RecommendationsFilter>({});

  // TODO: add shelfApi query management logic, add recommendations display part
  // If necessary, modify onFilter so that data is downloaded only if there are filters (by default there's none)

  return (
    <AuthPage
      Page={
        <section className={styles.container}>
          <RecommendationsPanel onFilter={setFilters} filters={filters} />
          {/*<RecommendationsList />*/}
        </section>
      }
    />
  );
};
