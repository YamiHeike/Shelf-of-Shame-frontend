import { Select, Slider, Typography } from "antd";
import { Status } from "../../types";
import styles from "./ShelfFilterBar.module.scss";
import { useLibraryData } from "../../hooks";
import { toProperCase } from "../../utils";

const { Title } = Typography;

/*
const statusOptions = [
  { value: Status.SHAME, label: "Shame" },
  { value: Status.GLORY, label: "Glory" },
  { value: Status.READING, label: "Reading" },
]; */

export const ShelfFilterBar = () => {
  const { genres } = useLibraryData();
  const genreOptions = genres.list.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const statusOptions = Object.keys(Status).map((status) => ({
    value: status,
    label: toProperCase(status),
  }));

  return (
    <div className={styles.filterBar}>
      <Title level={5}>Filter your shelf</Title>
      <div className={styles.filterGroup}>
        <Select
          placeholder="Status"
          options={statusOptions}
          allowClear
          className={styles.filterItem}
        />
        <Slider
          range
          min={1}
          max={10}
          defaultValue={[1, 10]}
          marks={{ 1: "1", 5: "5", 10: "10" }}
          className={styles.slider}
        />
        <Select
          mode="multiple"
          placeholder="Genres"
          options={genreOptions}
          allowClear
          className={styles.filterItem}
        />
      </div>
    </div>
  );
};
