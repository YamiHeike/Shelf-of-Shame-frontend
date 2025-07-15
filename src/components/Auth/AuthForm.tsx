import { Card, Typography, message } from "antd";
import styles from "./AuthForm.module.scss";
import { ReactNode, useEffect } from "react";
import { FormFieldError } from "../../types";
import { motion } from "motion/react";

const MotionCard = motion(Card);

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
  const WRONG_PASS = "Wrong password";

  useEffect(() => {
    if (error && !error.errors && error.message !== WRONG_PASS) {
      messageApi.error(error.message);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      {contextHolder}

      <MotionCard
        className={styles.card}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <Typography.Title level={2} className={styles.title}>
          {title}
        </Typography.Title>
        <div className={styles.formWrapper}>{children}</div>
        <Typography.Text className={styles.footerText}>
          {footerText}
        </Typography.Text>
      </MotionCard>
    </div>
  );
};
