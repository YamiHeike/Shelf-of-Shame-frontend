import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";

type FooterTextProps = {
  text: string;
} & TextProps;

export const FooterText = ({ text, ...rest }: FooterTextProps) => {
  const { Text } = Typography;

  return (
    <Text type="secondary" {...rest}>
      {text}
    </Text>
  );
};
