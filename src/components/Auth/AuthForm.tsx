import { Card, Typography } from "antd";
import styles from "./AuthForm.module.scss";
import { ReactNode } from "react";

type AuthFormProps = {
  title: string;
  children: ReactNode;
  footerText: ReactNode;
};

export const AuthForm = ({ title, children, footerText }: AuthFormProps) => {
  return (
    <div className={styles.container}>
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
