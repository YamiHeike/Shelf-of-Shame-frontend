import { useAuth } from "../Auth";
import { Layout, Grid } from "antd";
import { MotivationalQuotes } from "./MotivationalQuotes";
import { StatisticsOverview } from "./StatisticsOverwiev";
import { ErrorMessage, Loading } from "../../ui";
import { useGetShelfQuery } from "../../store/shelfApi";
import { useLibraryData } from "../../hooks";
import { getCurrentReads, getStats } from "../../utils";
import { EmptyShelf } from "../Shelf";
import { ShelfCard } from "./ShelfCard";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AuthHomepage = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();

  const { data, error, isLoading } = useGetShelfQuery();
  const { genres } = useLibraryData();

  const isShelfEmpty = !data || data.length === 0;
  const hasShelfData = !!data && data.length > 0;
  const loading = isLoading || genres.loading;
  const errored = error || genres.error;

  let stats = null;
  let content = null;

  if (loading || !user) {
    content = <Loading />;
  } else if (errored) {
    content = <ErrorMessage />;
  } else if (isShelfEmpty) {
    content = <EmptyShelf />;
  } else if (hasShelfData) {
    const { unreadBooks, booksFinished, longestBook, favoriteGenre } =
      getStats(data);
    const currentReads = getCurrentReads(data);

    stats = screens.md && (
      <StatisticsOverview
        booksFinished={booksFinished}
        longestBook={longestBook}
        favoriteGenre={favoriteGenre}
      />
    );

    content =
      unreadBooks === 0 ? (
        <EmptyShelf />
      ) : (
        <ShelfCard
          unreadBooks={unreadBooks}
          currentReads={currentReads}
          username={user.username}
        />
      );
  }

  return (
    <Layout style={{ minHeight: "calc(100vh - 65px)" }}>
      {screens.lg && <MotivationalQuotes />}
      <Layout
        style={{
          padding: screens.sm ? "10px" : "20px",
          background: !screens.lg
            ? "linear-gradient(135deg, #383677, #a61b40)"
            : "inherit",
        }}
      >
        <Content>{content}</Content>
      </Layout>
      {stats}
    </Layout>
  );
};
