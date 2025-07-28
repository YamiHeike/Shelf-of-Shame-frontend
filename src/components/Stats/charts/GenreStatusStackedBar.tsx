import { Column, ColumnConfig } from "@ant-design/charts";
import { Status, UserShelfItemRecord } from "../../../types";
import { toProperCase } from "../../../utils";
import { ChartTitle } from "./ChartTitle";
import { ChartColors } from "./colors";

type GenreStatusBarProps = {
  data: UserShelfItemRecord[];
};

export const GenreStatusBar = ({ data }: GenreStatusBarProps) => {
  const genreStatusCounts: Record<string, Record<Status, number>> = {};
  data.forEach((item) => {
    item.book.genres.forEach((genre) => {
      const genreName = toProperCase(genre.name);
      if (!genreStatusCounts[genre.name]) {
        genreStatusCounts[genreName] = {
          SHAME: 0,
          GLORY: 0,
          READING: 0,
        };
      }
      genreStatusCounts[genreName][item.status]++;
    });
  });

  const chartData = Object.entries(genreStatusCounts).flatMap(
    ([genre, statusMap]) =>
      Object.entries(statusMap).map(([status, count]) => ({
        genre,
        status: toProperCase(status),
        count,
      }))
  );

  const config: ColumnConfig = {
    data: chartData,
    xField: "genre",
    yField: "count",
    seriesField: "status",
    colorField: "status",
    legend: {
      color: {
        title: false,
        position: "right",
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
      <ChartTitle text="Books by Genre and Status" />
      <Column {...config} />
    </>
  );
};
