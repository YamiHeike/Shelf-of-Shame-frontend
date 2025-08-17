import { useState } from "react";
import {
  ErrorMessage,
  Loading,
  RecommendationsList,
  RecommendationsPanel,
} from "../components";
import { AuthPage } from "./AuthPage";
import styles from "./RecommendationsPage.module.scss";
import { RecommendationsFilter } from "../types";
import { useGetRecommendationsQuery } from "../store/shelfApi";

export const RecommendationsPage = () => {
  const [filters, setFilters] = useState<RecommendationsFilter>({});
  const isFiltered = Object.keys(filters).length !== 0;

  const { data, isError, isLoading, isUninitialized } =
    useGetRecommendationsQuery(
      {
        ...filters,
        limit: 3,
      },
      {
        skip: !isFiltered,
      }
    );

  let content: React.ReactNode;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <ErrorMessage
        title="Could not fetch recommendations"
        message="Please, try again later"
      />
    );
  } else if (data) {
    content = <RecommendationsList recommendations={data} />;
  }

  return (
    <AuthPage
      Page={
        <section className={styles.container}>
          <RecommendationsPanel onFilter={setFilters} filters={filters} />
          {!isUninitialized && content}
        </section>
      }
    />
  );
};
