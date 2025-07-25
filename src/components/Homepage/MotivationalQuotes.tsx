import { Layout, Typography, List } from "antd";
import { MOTIVATIONAL_QUOTES } from "../../constants";

export const MotivationalQuotes = () => {
  const { Title, Text } = Typography;
  const { Sider } = Layout;
  return (
    <Sider
      width={250}
      theme="light"
      style={{
        padding: 20,
        borderRight: "1px solid #ddd",
        background: "linear-gradient(135deg, #383677, #a61b40)",
      }}
    >
      <Title level={4} style={{ color: "#DCE0F2" }}>
        ✨ Need inspiration?
      </Title>
      <List
        dataSource={MOTIVATIONAL_QUOTES}
        renderItem={(quote) => (
          <List.Item>
            <Text italic style={{ color: "#DCE0F2" }}>
              {quote}
            </Text>
          </List.Item>
        )}
      />
    </Sider>
  );
};
