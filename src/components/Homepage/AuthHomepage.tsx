import { useAuth } from "../Auth";
import { Layout, Card, Row, Col, Statistic, Grid } from "antd";
import { TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { Greeter } from "./Greeter";
import { ButtonGroup } from "./ButtonGroup";
import { CurrentlyReading } from "./CurrentlyReading";
import { StatisticsOverview } from "./StatisticsOverwiev";
import { ErrorMessage, FooterText, Loading } from "../../ui";
import { BookOutline, Status } from "../../types";
import { useGetShelfQuery } from "../../store/shelfApi";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AuthHomepage = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  const { data, error, isLoading } = useGetShelfQuery();

  let content: React.ReactNode;
  let currentReads: BookOutline[] | null = null;
  let unreadBooks = 0;
  let booksFinished = 0;
  let longestBook = "-";
  let favoriteGenre = "-";

  // TODO: move to another file
  const motivationalQuotes = [
    "A reader lives a thousand lives before he dies. — George R.R. Martin",
    "Not all those who wander are lost. — J.R.R. Tolkien",
    "Reading is essential for those who seek to rise above the ordinary. — Jim Rohn",
    "I have always imagined that Paradise will be a kind of library. — Jorge Luis Borges",
  ];

  if (isLoading) {
    content = <Loading />;
  }

  //TODO: case of empty shelf, you need a separate component for that
  if (error) {
    content = <ErrorMessage />;
  }

  if (data) {
    currentReads = data
      .filter((item) => item.status === Status.READING)
      .map((item) => ({
        title: item.book.title,
        authors: item.book.authors,
        numberOfPages: item.book.numberOfPages,
      }));

    unreadBooks = data.filter((item) => item.status !== Status.GLORY).length;
    booksFinished = data.length - unreadBooks;
    const longestBookItemData = data.reduce((max, current) =>
      current.book.numberOfPages > max.book.numberOfPages ? current : max
    );
    longestBook = `${longestBookItemData.book.title} (${longestBookItemData.book.numberOfPages} pages)`;

    // TODO: refactor
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
      {screens.lg && (
        <MotivationalQuotes motivationalQuotes={motivationalQuotes} />
      )}
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
