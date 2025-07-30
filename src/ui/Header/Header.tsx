import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

type HeaderProps = {
  text: string;
  style?: React.CSSProperties;
} & TitleProps;

export const Header = ({ text, style }: HeaderProps) => {
  return <Typography.Title style={{ ...style }}>{text}</Typography.Title>;
};
