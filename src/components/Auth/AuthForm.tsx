import { Card, Typography, Alert, message } from "antd";
import styles from "./AuthForm.module.scss";
import { ReactNode, useEffect } from "react";
import { FormFieldError } from "../../types";

type AuthFormProps = {
  title: string;
  children: ReactNode;
  footerText: ReactNode;
  error?: FormFieldError | null;
};

export const AuthForm = ({
  title,
  children,
  footerText,
  error,
}: AuthFormProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error && !error.errors) {
      messageApi.error(error.message);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card className={styles.card}>
        <Typography.Title level={2} className={styles.title}>
          {title}
        </Typography.Title>
        {children}

        <Typography.Text className={styles.footerText}>
          {footerText}
        </Typography.Text>
      </Card>
    </div>
  );
};
