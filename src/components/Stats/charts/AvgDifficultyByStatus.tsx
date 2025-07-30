import { Status } from "../../../types";
import { toProperCase } from "../../../utils";
import { useShelfDataContext } from "../ShelfDataContext";
import { ChartUnavailable } from "./ChartUnavailable";
import { Column, ColumnConfig } from "@ant-design/charts";
import { ChartColors } from "./colors";
import { ChartTitle } from "./ChartTitle";

type DifficultyPerStatusData = {
  [status in Status]: {
    sum: number;
    count: number;
  };
};

export const AvgDifficultyByStatus = () => {
  const { data } = useShelfDataContext();

  if (!data) {
    return <ChartUnavailable />;
  }

  const aggregation: DifficultyPerStatusData = data.reduce((acc, item) => {
    const status = item.status;
    const difficulty = item.difficulty;
    if (!acc[status]) {
      acc[status] = {
        sum: 0,
        count: 0,
      };
    }

    acc[status].sum += difficulty;
    acc[status].count++;
    return acc;
  }, {} as DifficultyPerStatusData);

  const chartData = Object.entries(aggregation).flatMap(
    ([status, { sum, count }]) => ({
      type: toProperCase(status),
      value: parseFloat((sum / count).toFixed(2)),
    })
  );

  if (!data) {
    return <ChartUnavailable />;
  }

  const config: ColumnConfig = {
    data: chartData,
    xField: "type",
    yField: "value",
    colorField: "type",
    legend: {
      color: {
        title: false,
        position: "bottom",
      },
    },
    scale: {
      color: {
        range: [ChartColors.SHAME, ChartColors.GLORY, ChartColors.READING],
      },
    },
  };

  return (
    <>
      <ChartTitle text="Avg. Difficulty per Status" />
      <Column {...config} />
    </>
  );
};
