import { Typography, Layout, Button, Statistic } from "antd";
import { routes } from "../../routes";
import { Link } from "react-router-dom";

type StatisticsOverviewProps = {
  booksFinished: number;
  longestBook: string;
  favoriteGenre: string;
};

export const StatisticsOverview = ({
  booksFinished,
  longestBook,
  favoriteGenre,
}: StatisticsOverviewProps) => {
  const { Title } = Typography;
  const { Sider } = Layout;

  return (
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
        <Link to={routes.STATS.path}>
          <Button type="primary">More</Button>
        </Link>
      </div>
    </Sider>
  );
};
