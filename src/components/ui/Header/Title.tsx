import Title from "antd/es/typography/Title";
import styles from "./Header.module.scss";

type TitleProps = {
  text: string;
};

export const PageTitle = ({ text }: TitleProps) => {
  return (
    <Title
      level={1}
      className={styles["page-title"]}
      style={{ color: "#BF2633" }}
    >
      {text}
    </Title>
  );
};
