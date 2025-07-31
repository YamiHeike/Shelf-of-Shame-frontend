import { ColumnConfig, Histogram } from "@ant-design/charts";
import { useShelfDataContext } from "../ShelfDataContext";
import { ChartUnavailable } from "./ChartUnavailable";
import { ChartTitle } from "./ChartTitle";
import { toProperCase } from "../../../utils";
import { PALETTE } from "./colors";
import { Chart } from "./Chart";

export const DifficultyHistogram = () => {
  const { data } = useShelfDataContext();
  if (!data) {
    return <ChartUnavailable />;
  }

  const chartData = data.map((item) => ({
    id: item.book.isbn,
    difficulty: item.difficulty,
    status: toProperCase(item.status),
  }));

  const config: ColumnConfig = {
    data: chartData,
    binField: "difficulty",
    colorField: "status",
    stack: true,
    style: {
      inset: 0.5,
    },
    scale: {
      color: {
        range: PALETTE,
      },
    },
    legend: {
      color: {
        title: false,
        position: "top",
      },
    },
  };

  return (
    <Chart>
      <ChartTitle text="How Difficult Are Your Reads?" />
      <Histogram {...config} />
    </Chart>
  );
};
