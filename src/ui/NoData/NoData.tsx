import { Empty } from "antd";
import styles from "./NoData.module.scss";

export const NoData = () => {
  return (
    <div className={styles.container}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
};
