import styles from "./Loading.module.scss";
import { Spin, Typography } from "antd";

type LoadingProps = {
  message?: string;
  fullscreen?: boolean;
};

export const Loading = ({
  message = "Loading...",
  fullscreen = false,
}: LoadingProps) => {
  return (
    <div
      className={`${styles.loadingContainer} ${
        fullscreen ? styles.fullscreen : ""
      }`}
    >
      <Spin size="large" />
      <Typography.Text className={styles.message}>{message}</Typography.Text>
    </div>
  );
};
