import { Empty, Typography, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;

export const EmptyShelf = () => {
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const celebrate = () => {
    confetti({
      angle: randomInRange(55, 125),
      particleCount: randomInRange(150, 250),
      spread: randomInRange(350, 400),
      origin: { y: 0.5, x: 0.6 },
    });
  };

  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "3em 1em",
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Title level={3} style={{ marginTop: "1em" }}>
            No unread books detected.
          </Title>
        }
      />
      <Paragraph style={{ maxWidth: 500, margin: "1.5em auto" }}>
        Either you've conquered your entire Shelf of Shame 🏆
        <br />
        or you're hiding those unread books somewhere! 👀
      </Paragraph>
      <Button type="primary" icon={<SmileOutlined />} onClick={celebrate}>
        Bask in your glory
      </Button>
    </div>
  );
};
