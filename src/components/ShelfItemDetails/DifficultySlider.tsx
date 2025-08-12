import { Slider, Typography } from "antd";
import { useUserShelfItemContext } from "../../store";
import styles from "./EditItem.module.scss";

type DifficultySliderProps = {
  difficultyRef: React.RefObject<number>;
};

const { Text } = Typography;

export const DifficultySlider = ({ difficultyRef }: DifficultySliderProps) => {
  const { difficulty } = useUserShelfItemContext();

  return (
    <>
      <Text>Difficulty:</Text>
      <Slider
        min={1}
        max={10}
        defaultValue={difficulty}
        onChange={(val) => (difficultyRef.current = val)}
        marks={{ 1: "1", 5: "5", 10: "10" }}
        className={styles.slider}
      />
    </>
  );
};
