import { Status } from "../../../types";
import { Pie, type PieConfig } from "@ant-design/charts";
import { toProperCase } from "../../../utils";
import { ChartTitle } from "./ChartTitle";
import { ChartColors } from "./colors";
import { useShelfDataContext } from "../ShelfDataContext";
import { ChartUnavailable } from "./ChartUnavailable";

export const StatusPie = () => {
  const { data } = useShelfDataContext();

  if (!data) {
    return <ChartUnavailable />;
  }

  const statusCounts = data.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    {
      [Status.SHAME]: 0,
      [Status.GLORY]: 0,
      [Status.READING]: 0,
    } as Record<Status, number>
  );

  const chartData = Object.entries(statusCounts).map(([status, value]) => ({
    type: toProperCase(status),
    value,
  }));

  const config: PieConfig = {
    data: chartData,
    angleField: "value",
    colorField: "type",
    color: ["#ff4d4f", "#52c41a", "#faad14"],
    label: {
      text: "type",
      labelHeight: 28,
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
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
      <ChartTitle text="Book Count by Status" />
      <Pie {...config} />
    </>
  );
};
