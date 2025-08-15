import { Button, Card, Typography } from "antd";
import { useState } from "react";
import styles from "./RecommendationsPanel.module.scss";
import { DifficultyRange, GenreSelector, Header } from "../../ui";

const { Text } = Typography;

export const RecommendationsPanel = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([
    1, 10,
  ]);

  const handleRecommend = () => {
    // TODO: add logic from API once it's done
    console.log("Recommend with:", { selectedGenres, difficultyRange });
  };

  return (
    <Card className={styles.panel}>
      <Header text="Pick your next Shelf of Shame Read" />
      <div className={styles.controls}>
        <div className={styles.control}>
          <Text strong>Preferred genres</Text>
          <GenreSelector
            value={selectedGenres}
            onChangeGenres={setSelectedGenres}
            className={styles.selector}
          />
        </div>
        <div className={styles.controls}>
          <DifficultyRange
            onChange={([min, max]: number[]) => setDifficultyRange([min, max])}
            minValue={difficultyRange[0]}
            maxValue={difficultyRange[1]}
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
