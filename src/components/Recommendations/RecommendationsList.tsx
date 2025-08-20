import { type UserShelfItemRecord } from "../../types";
import { NoData } from "../../ui/NoData";
import styles from "./RecommendationsPanel.module.scss";
import { RecommendationListItem } from "./RecommendationListItem";

type RecommendationsListProps = {
  recommendations: UserShelfItemRecord[];
};

export const RecommendationsList = ({
  recommendations,
}: RecommendationsListProps) => {
  return (
    <div className={styles.results}>
      {recommendations.length > 0 ? (
        recommendations.map((item) => {
          return <RecommendationListItem item={item} />;
        })
      ) : (
        <NoData />
      )}
    </div>
  );
};
