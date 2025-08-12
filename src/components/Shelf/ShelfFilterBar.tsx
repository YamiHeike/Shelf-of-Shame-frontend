import { Select, Slider, Typography } from "antd";
import { ShelfItemFilter, Status } from "../../types";
import styles from "./ShelfFilterBar.module.scss";
import { useLibraryData } from "../../hooks";
import { toProperCase } from "../../utils";

const { Title } = Typography;

type ShelfFilterBarProps = {
  onFilter: (filters: ShelfItemFilter) => void;
  filters: ShelfItemFilter;
};

export const ShelfFilterBar = ({ onFilter, filters }: ShelfFilterBarProps) => {
  const { genres } = useLibraryData();
  const genreOptions = genres.list.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));

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
        <Slider
          range
          min={1}
          max={10}
          defaultValue={[1, 10]}
          value={[filters.difficultyMin ?? 1, filters.difficultyMax ?? 10]}
          onChange={changeDifficultyRange}
          marks={{ 1: "1", 5: "5", 10: "10" }}
          className={styles.slider}
        />
        <Select
          mode="multiple"
          placeholder="Genres"
          options={genreOptions}
          allowClear
          value={filters.genres}
          onChange={changeGenres}
          className={styles.filterItem}
        />
      </div>
    </div>
  );
};
