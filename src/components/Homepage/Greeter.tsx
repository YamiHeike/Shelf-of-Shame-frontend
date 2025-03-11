import { Typography, Col, Grid } from "antd";
import { Header } from "../ui";

type GreeterProps = {
  username: string;
};

export const Greeter = ({ username }: GreeterProps) => {
  const { Title, Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Col xs={24} md={16}>
      <Header text={`Hello, ${username}!`} level={screens.sm ? 3 : 2} />
      <Text>Your Shelf of Shame awaits...</Text>
    </Col>
  );
};
