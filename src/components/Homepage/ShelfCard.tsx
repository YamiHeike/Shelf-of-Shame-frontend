import { Card, Row, Col, Statistic } from "antd";
import { FireOutlined, TrophyOutlined } from "@ant-design/icons";
import { Greeter } from "./Greeter";
import { CurrentlyReading } from "./CurrentlyReading";
import { ButtonGroup } from "./ButtonGroup";
import { FooterText } from "../../ui";
import { Grid } from "antd";
import { BookOutline } from "../../types";

interface ShelfCardProps {
  unreadBooks: number;
  currentReads: BookOutline[];
  username: string;
}

const { useBreakpoint } = Grid;

export const ShelfCard = ({
  unreadBooks,
  currentReads,
  username,
}: ShelfCardProps) => {
  const screens = useBreakpoint();

  return (
    <Card
      style={{
        maxWidth: screens.md ? "min(85%, 80rem)" : "95%",
        margin: screens.sm ? "2em auto" : "auto",
        borderRadius: "0.5em",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Row align="middle" justify="space-between" gutter={[16, 16]}>
        <Greeter username={username} />
        <Col xs={24} md={8}>
          <Statistic
            title="Unread Books"
            value={unreadBooks}
            prefix={<FireOutlined style={{ color: "#ff4d4f" }} />}
            valueStyle={{ color: "#ff4d4f", fontWeight: "bold" }}
          />
        </Col>
      </Row>
      <CurrentlyReading
        title="📖 Currently Reading"
        bookList={currentReads || []}
      />
      <ButtonGroup />
      <Row justify="center" style={{ marginTop: 20 }}>
        {screens.xxl && (
          <TrophyOutlined
            style={{ color: "#faad14", fontSize: 20, marginRight: 8 }}
          />
        )}
        <FooterText text="You can do it! Think of how nice buying new books will feel without this shameful pile! 📖🏆" />
      </Row>
    </Card>
  );
};
