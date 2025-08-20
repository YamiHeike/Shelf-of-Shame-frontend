import { Select, Typography } from "antd";
import { ShelfItemFilter, Status } from "../../types";
import styles from "./ShelfFilterBar.module.scss";
import { toProperCase } from "../../utils";
import { DifficultyRange, GenreSelector } from "../../ui";

const { Title } = Typography;

type ShelfFilterBarProps = {
  onFilter: (filters: ShelfItemFilter) => void;
  filters: ShelfItemFilter;
};

export const ShelfFilterBar = ({ onFilter, filters }: ShelfFilterBarProps) => {
  const statusOptions = Object.keys(Status).map((status) => ({
    value: status,
    label: toProperCase(status),
  }));

  statusOptions.push({
    value: "",
    label: "All",
  });

  const changeStatus = (value: any) => {
    onFilter({
      ...filters,
      status: value.toUpperCase() ?? undefined,
    });
  };

  const changeDifficultyRange = ([min, max]: number[]) => {
    onFilter({
      ...filters,
      difficultyMin: min,
      difficultyMax: max,
    });
  };

  const changeGenres = (values: any) => {
    onFilter({
      ...filters,
      genres: values,
    });
  };

  return (
    <div className={styles.filterBar}>
      <Title level={5}>Filter your shelf</Title>
      <div className={styles.filterGroup}>
        <Select
          placeholder="Status"
          defaultValue={""}
          options={statusOptions}
          value={filters.status ?? ""}
          onChange={changeStatus}
          allowClear
          className={styles.filterItem}
        />
        <DifficultyRange
          onChange={changeDifficultyRange}
          minValue={filters.difficultyMin ?? 1}
          maxValue={filters.difficultyMax ?? 10}
        />
        <GenreSelector
          onChangeGenres={changeGenres}
          value={filters.genres}
          className={styles.filterItem}
        />
      </div>
    </div>
  );
};
