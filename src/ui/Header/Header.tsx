import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

type HeaderProps = {
  text: string;
} & TitleProps;

export const Header = ({ text }: HeaderProps) => {
  return (
    <Typography.Title style={{ color: "#1890ff" }}>{text}</Typography.Title>
  );
};
