import { Button, Card, Typography } from "antd";
import styles from "./RecommendationsPanel.module.scss";
import { DifficultyRange, GenreSelector, Header } from "../../ui";
import { RecommendationsFilter } from "../../types";

const { Text } = Typography;

type RecommendationsPanelProps = {
  onFilter: (filters: RecommendationsFilter) => void;
  filters: RecommendationsFilter;
};

export const RecommendationsPanel = ({
  onFilter,
  filters,
}: RecommendationsPanelProps) => {
  // TODO: move to refs, so that changeGenres and changeDifficultyRange are triggered only on click
  const changeGenres = (values: string[]) => {
    onFilter({
      ...filters,
      genres: values,
    });
  };

  const changeDifficultyRange = ([min, max]: number[]) => {
    onFilter({
      ...filters,
      difficultyMin: min,
      difficultyMax: max,
    });
  };

  const handleRecommend = () => {
    console.log("Recommending with filters", filters);
  };

  return (
    <Card className={styles.panel}>
      <Header text="Pick your next Shelf of Shame Read" />
      <div className={styles.controls}>
        <div className={styles.control}>
          <Text strong>Preferred genres</Text>
          <GenreSelector
            value={filters.genres ?? []}
            onChangeGenres={changeGenres}
            className={styles.selector}
          />
        </div>
        <div className={styles.controls}>
          <DifficultyRange
            onChange={changeDifficultyRange}
            minValue={filters.difficultyMin ?? 1}
            maxValue={filters.difficultyMax ?? 10}
          />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleRecommend}
          className={styles.button}
        >
          Suggest Books
        </Button>
      </div>
    </Card>
  );
};
