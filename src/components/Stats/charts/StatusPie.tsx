import { Status } from "../../../types";
import { Pie, type PieConfig } from "@ant-design/charts";
import { toProperCase } from "../../../utils";
import { ChartTitle } from "./ChartTitle";
import { PALETTE } from "./colors";
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
        position: "top",
        rowPadding: 5,
      },
    },
    scale: {
      color: {
        range: PALETTE,
      },
    },
  };

  return (
    <>
      <ChartTitle text="How Shameful is Your Shelf?" />
      <Pie {...config} />
    </>
  );
};
