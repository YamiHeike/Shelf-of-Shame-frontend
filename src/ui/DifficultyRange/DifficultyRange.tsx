import { Slider } from "antd";
import styles from "./DifficultyRange.module.scss";
import { SliderBaseProps } from "antd/es/slider";

type DifficultyRangeProps = {
  onChange: ([min, max]: number[]) => void;
  minValue: number;
  maxValue: number;
} & SliderBaseProps;

export const DifficultyRange = ({
  onChange,
  minValue,
  maxValue,
  ...rest
}: DifficultyRangeProps) => {
  return (
    <Slider
      range
      min={1}
      max={10}
      defaultValue={[1, 10]}
      value={[minValue, maxValue]}
      onChange={onChange}
      marks={{ 1: "1", 5: "5", 10: "10" }}
      className={styles.slider}
      {...rest}
    />
  );
};
