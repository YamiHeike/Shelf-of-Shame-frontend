import { Empty, Typography, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const EmptyShelf = () => {
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
        or you're hiding those unread books somewhere 👀
      </Paragraph>
      <Button
        type="primary"
        icon={<SmileOutlined />}
        onClick={() => {
          // Optional: trigger refetch or open modal
        }}
      >
        Bask in your glory
      </Button>
    </div>
  );
};
