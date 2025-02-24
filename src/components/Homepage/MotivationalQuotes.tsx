import { Layout, Typography, List } from "antd";

type MotivationQuotesProps = {
  motivationalQuotes: string[];
};

export const MotivationalQuotes = ({
  motivationalQuotes,
}: MotivationQuotesProps) => {
  const { Title, Text } = Typography;
  const { Sider } = Layout;
  return (
    <Sider
      width={250}
      theme="light"
      style={{ padding: 20, borderRight: "1px solid #ddd" }}
    >
      <Title level={4}>✨ Need inspiration?</Title>
      <List
        dataSource={motivationalQuotes}
        renderItem={(quote) => (
          <List.Item>
            <Text italic>{quote}</Text>
          </List.Item>
        )}
      />
    </Sider>
  );
};
