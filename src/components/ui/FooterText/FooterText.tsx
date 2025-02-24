import { Typography } from "antd";

type FooterTextProps = {
  text: string;
};

export const FooterText = ({ text }: FooterTextProps) => {
  const { Text } = Typography;

  return <Text type="secondary">{text}</Text>;
};
