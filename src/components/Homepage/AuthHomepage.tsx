import { useAuth } from "../Auth";
import { Layout, Card, Row, Col, Statistic, Grid } from "antd";

import { TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { Greeter } from "./Greeter";
import { ButtonGroup } from "./ButtonGroup";
import { CurrentlyReading } from "./CurrentlyReading";
import { StatisticsOverview } from "./StatisticsOverwiev";
import { FooterText } from "../ui";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AuthHomepage = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  // Mock Data
  const unreadBooks = 42;
  const booksFinished = 23;
  const longestBook = "War and Peace (1225 pages)";
  const favoriteGenre = "Fantasy";
  const currentlyReading = [
    { title: "The Name of the Wind", author: ["Patrick Rothfuss"] },
    { title: "Dune", author: ["Frank Herbert"] },
  ];
  const motivationalQuotes = [
    "A reader lives a thousand lives before he dies. — George R.R. Martin",
    "Not all those who wander are lost. — J.R.R. Tolkien",
    "Reading is essential for those who seek to rise above the ordinary. — Jim Rohn",
    "I have always imagined that Paradise will be a kind of library. — Jorge Luis Borges",
  ];

  return user ? (
    <Layout
      style={{
        minHeight: "calc(100vh - 65px)",
        background: "#f5f5f5",
      }}
    >
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
            <CurrentlyReading
              title={"📖 Currently Reading"}
              bookList={currentlyReading}
            />
            <ButtonGroup />
            <Row justify="center" style={{ marginTop: 20 }}>
              {screens.xxl && (
                <TrophyOutlined
                  style={{ color: "#faad14", fontSize: 20, marginRight: 8 }}
                />
              )}
              <FooterText
                text="You can do it! Think of how nice buying new books will feel
                without this shameful pile! 📖🏆"
              />
            </Row>
          </Card>
        </Content>
      </Layout>
      {screens.md && (
        <StatisticsOverview
          booksFinished={booksFinished}
          longestBook={longestBook}
          favoriteGenre={favoriteGenre}
        />
      )}
    </Layout>
  ) : (
    <p>Something went wrong</p>
  );
};
