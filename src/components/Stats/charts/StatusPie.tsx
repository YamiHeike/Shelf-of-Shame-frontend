import { Status, type UserShelfItemRecord } from "../../../types";
import { Pie, type PieConfig } from "@ant-design/charts";
import { toProperCase } from "../../../utils";
import { Typography } from "antd";

const { Title } = Typography;

type StatusPieProps = {
  data: UserShelfItemRecord[];
};

export const StatusPie = ({ data }: StatusPieProps) => {
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
        range: ["#ff4d4f", "#52c41a", "#faad14"],
      },
    },
  };

  return (
    <>
      <Title level={3} style={{ fontWeight: 100 }}>
        Book Count by Status
      </Title>
      <Pie {...config} />
    </>
  );
};
