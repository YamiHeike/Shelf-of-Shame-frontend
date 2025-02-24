import { Typography, Col, Grid } from "antd";

type GreeterProps = {
  username: string;
};

export const Greeter = ({ username }: GreeterProps) => {
  const { Title, Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Col xs={24} md={16}>
      <Title level={screens.sm ? 3 : 2}>Hello, {username}!</Title>
      <Text>Your Shelf of Shame awaits...</Text>
    </Col>
  );
};
