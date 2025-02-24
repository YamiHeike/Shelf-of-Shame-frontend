import { useAuth } from "../Auth";
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  List,
  Statistic,
  Grid,
  Button,
} from "antd";
import { BookOutlined, TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { Greeter } from "./Greeter";
import { ButtonGroup } from "./ButtonGroup";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export const AuthHomepage = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  // Mock Data
  const unreadBooks = 42;
  const booksFinished = 23;
  const longestBook = "War and Peace (1,225 pages)";
  const favoriteGenre = "Fantasy";
  const currentlyReading = [
    { title: "The Name of the Wind", author: "Patrick Rothfuss" },
    { title: "Dune", author: "Frank Herbert" },
  ];
  const motivationalQuotes = [
    "A reader lives a thousand lives before he dies. — George R.R. Martin",
    "Not all those who wander are lost. — J.R.R. Tolkien",
    "Reading is essential for those who seek to rise above the ordinary. — Jim Rohn",
    "I have always imagined that Paradise will be a kind of library. — Jorge Luis Borges",
  ];

  return user ? (
    <Layout style={{ minHeight: "calc(100vh - 65px)", background: "#f5f5f5" }}>
      {screens.lg && (
        <MotivationalQuotes motivationalQuotes={motivationalQuotes} />
      )}
      <Layout style={{ padding: screens.sm ? "10px" : "20px" }}>
        <Content>
          <Card
            style={{
              maxWidth: screens.md ? "90%" : 800,
              margin: "auto",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
              <Greeter username={user.username} />
              <Col xs={24} md={8}>
                <Statistic
                  title="Unread Books"
                  value={unreadBooks}
                  prefix={<FireOutlined style={{ color: "#ff4d4f" }} />}
                  valueStyle={{ color: "#ff4d4f", fontWeight: "bold" }}
                />
              </Col>
            </Row>
            <Card
              title="📖 Currently Reading"
              style={{ marginTop: 20, borderRadius: 8 }}
            >
              <List
                dataSource={currentlyReading}
                renderItem={(book) => (
                  <List.Item>
                    <BookOutlined
                      style={{ marginRight: 8, color: "#1890ff" }}
                    />
                    {book.title} by {book.author}
                  </List.Item>
                )}
              />
            </Card>
            <ButtonGroup />
            <Row justify="center" style={{ marginTop: 20 }}>
              <TrophyOutlined
                style={{ color: "#faad14", fontSize: 20, marginRight: 8 }}
              />
              <Text type="secondary">
                You can do it! Think of how nice buying new books will feel
                without this shameful pile! 📖🏆
              </Text>
            </Row>
          </Card>
        </Content>
      </Layout>
      {screens.lg && (
        <Sider
          width={250}
          theme="light"
          style={{ padding: 20, borderLeft: "1px solid #ddd" }}
        >
          <Title level={4}>📊 Your Stats</Title>
          <Statistic title="Books Finished" value={booksFinished} />
          <Statistic title="Longest Book" value={longestBook} />
          <Statistic title="Favorite Genre" value={favoriteGenre} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1em",
            }}
          >
            <Button type="primary">More</Button>
          </div>
        </Sider>
      )}
    </Layout>
  ) : (
    <p>Something went wrong</p>
  );
};
