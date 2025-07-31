import { Typography } from "antd";

const { Title } = Typography;

type ChartTitleProps = {
  text: string;
};

export const ChartTitle = ({ text }: ChartTitleProps) => {
  return (
    <Title level={3} style={{ fontWeight: 600 }}>
      {text}
    </Title>
  );
};
