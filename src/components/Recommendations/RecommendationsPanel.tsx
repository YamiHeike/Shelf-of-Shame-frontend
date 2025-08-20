import { Button, Card, Typography } from "antd";
import styles from "./RecommendationsPanel.module.scss";
import { DifficultyRange, GenreSelector, Header } from "../../ui";
import { RecommendationsFilter } from "../../types";
import { useRef } from "react";

const { Text } = Typography;

type RecommendationsPanelProps = {
  onFilter: (filters: RecommendationsFilter) => void;
  filters: RecommendationsFilter;
};

export const RecommendationsPanel = ({
  onFilter,
  filters,
}: RecommendationsPanelProps) => {
  const genresRef = useRef<string[]>(filters.genres ?? []);
  const difficultyRangeRef = useRef<number[]>([
    filters.difficultyMin ?? 1,
    filters.difficultyMax ?? 10,
  ]);

  const changeGenres = (values: string[]) => {
    genresRef.current = values;
  };

  const changeDifficultyRange = ([min, max]: number[]) => {
    difficultyRangeRef.current = [min, max];
  };

  const handleRecommend = () => {
    const [min, max] = difficultyRangeRef.current;
    const newFilters: RecommendationsFilter = {
      ...filters,
      genres: genresRef.current,
      difficultyMin: min,
      difficultyMax: max,
    };

    console.log("Recommending with filters", newFilters);
    onFilter(newFilters);
  };

  return (
    <Card className={styles.panel}>
      <Header text="Pick your next Shelf of Shame Read" />
      <div className={styles.controls}>
        <div className={styles.control}>
          <Text strong>Preferred genres</Text>
          <GenreSelector
            onChangeGenres={changeGenres}
            className={styles.selector}
          />
        </div>
        <div className={styles.controls}>
          <DifficultyRange onChange={changeDifficultyRange} />
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
