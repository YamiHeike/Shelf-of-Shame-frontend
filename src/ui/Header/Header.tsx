import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

type HeaderProps = {
  text: string;
  style?: React.CSSProperties;
} & TitleProps;

export const Header = ({ text, style }: HeaderProps) => {
  return (
    <Typography.Title style={{ color: "#1890ff", ...style }}>
      {text}
    </Typography.Title>
  );
};
