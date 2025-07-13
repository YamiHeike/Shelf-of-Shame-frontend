import { Result, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  title?: string;
  message?: string;
  fullscreen?: boolean;
  onRetry?: () => void;
};

export const ErrorMessage = ({
  title = "Something went wrong",
  message = "We couldn't load your data. Please try again later.",
  fullscreen,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div
      className={`${styles.container}${
        fullscreen ? " " + styles.fullscreen : undefined
      }`}
    >
      <Result
        status="error"
        title={title}
        subTitle={message}
        extra={
          onRetry && (
            <Button icon={<ReloadOutlined />} type="primary" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      />
    </div>
  );
};
