import { useAuth } from "../Auth";
import { Layout, Card, Row, Col, Statistic, Grid } from "antd";
import { TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { Greeter } from "./Greeter";
import { ButtonGroup } from "./ButtonGroup";
import { CurrentlyReading } from "./CurrentlyReading";
import { StatisticsOverview } from "./StatisticsOverwiev";
import { ErrorMessage, FooterText, Loading } from "../../ui";
import { useGetShelfQuery } from "../../store/shelfApi";
import { useLibraryData } from "../../hooks";
import { getCurrentReads, getStats } from "../../utils";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AuthHomepage = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  const { data, error, isLoading } = useGetShelfQuery();
  const { genres } = useLibraryData();

  let content: React.ReactNode;
  let stats: React.ReactNode;

  if (isLoading || genres.loading) {
    content = <Loading />;
  }

  //TODO: Empty shelf component
  if (error || genres.error) {
    content = <ErrorMessage />;
  }

  if (data) {
    const { unreadBooks, booksFinished, longestBook, favoriteGenre } =
      getStats(data);
    const currentReads = getCurrentReads(data);

    stats = (
      <StatisticsOverview
        booksFinished={booksFinished}
        longestBook={longestBook}
        favoriteGenre={favoriteGenre}
      />
    );
    content = (
      <Content>
        <Card
          style={{
            maxWidth: screens.md ? "min(85%, 80rem)" : "95%",
            margin: screens.sm ? "2em auto" : "auto",
            borderRadius: "0.5em",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Greeter username={user!.username} />
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
            bookList={currentReads || []}
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
    );
  }

  return user ? (
    <Layout
      style={{
        minHeight: "calc(100vh - 65px)",
      }}
    >
      {screens.lg && <MotivationalQuotes />}
      <Layout
        style={{
          padding: screens.sm ? "10px" : "20px",
          background: !screens.lg
            ? "linear-gradient(135deg, #383677, #a61b40)"
            : "inherit",
        }}
      >
        {content}
      </Layout>
      {screens.md && stats && stats}
    </Layout>
  ) : (
    <p>Something went wrong</p>
  );
};
