import { Slider } from "antd";
import styles from "./DifficultyRange.module.scss";
import { type SliderRangeProps } from "antd/es/slider";

type DifficultyRangeProps = {
  onChange: ([min, max]: number[]) => void;
  minValue?: number;
  maxValue?: number;
} & Omit<SliderRangeProps, "onChange" | "range" | "value" | "defaultValue">;

export const DifficultyRange = ({
  onChange,
  minValue,
  maxValue,
  ...rest
}: DifficultyRangeProps) => {
  const sliderProps: SliderRangeProps = {
    range: true,
    min: 1,
    max: 10,
    defaultValue: [1, 10],
    onChange,
    marks: { 1: "1", 5: "5", 10: "10" },
    className: styles.slider,
    ...rest,
  };

  if (minValue || maxValue) {
    sliderProps.value = [minValue ?? 1, maxValue ?? 10];
  }

  return <Slider {...sliderProps} />;
};
