import { Column, ColumnConfig } from "@ant-design/charts";
import { toProperCase } from "../../../utils";
import { useShelfDataContext } from "../ShelfDataContext";
import { ChartUnavailable } from "./ChartUnavailable";
import { ChartTitle } from "./ChartTitle";
import { PALETTE } from "./colors";

type GenreBarProps = {
  limit: number;
};

export const GenreBar = ({ limit }: GenreBarProps) => {
  const { data } = useShelfDataContext();
  if (!data) {
    return <ChartUnavailable />;
  }

  const genreCounts = data.reduce((acc, curr) => {
    curr.book.genres.forEach((genre) => {
      const currGenre = genre.name;
      if (!acc[currGenre]) {
        acc[currGenre] = 0;
      }
      acc[currGenre]++;
    });
    return acc;
  }, {} as Record<string, number>);

  let chartData = Object.entries(genreCounts)
    .map(([genre, value]) => ({
      type: toProperCase(genre),
      value,
    }))
    .sort((first, second) => second.value - first.value);

  let othersCount: number = 0;

  if (chartData.length > limit) {
    othersCount = chartData
      .slice(limit)
      .reduce((acc, curr) => acc + curr.value, 0);
    chartData = chartData.slice(0, limit);
    chartData.push({
      type: "Others",
      value: othersCount,
    });
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
        range: PALETTE,
      },
    },
  };

  return (
    <>
      <ChartTitle text="Your Favorite Genres" />
      <Column {...config} />
    </>
  );
};
