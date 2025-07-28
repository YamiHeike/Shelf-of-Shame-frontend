import { Row, Col } from "antd";
import { useLibraryData } from "../../hooks";
import { useGetShelfQuery } from "../../store/shelfApi";
import { ErrorMessage, Header, Loading } from "../../ui";
import { NoData } from "../../ui/NoData";
import { StatusPie } from "./charts/StatusPie";
import styles from "./ShelfDashBoard.module.scss";

// import { GenreBar } from "./charts/GenreBar";
// import { DifficultyHistogram } from "./charts/DifficultyHistogram";
// import { AvgDifficultyByStatus } from "./charts/AvgDifficultyByStatus";
import { GenreStatusBar } from "./charts/GenreStatusStackedBar";

export const ShelfDashboard = () => {
  // TODO: wrap the data in context, otherwise all of these components will have the same props
  const { data, error, isLoading } = useGetShelfQuery();
  const { genres } = useLibraryData();

  const loading = isLoading || genres.loading;
  const errored = error || genres.error;

  if (loading) {
    return <Loading />;
  } else if (errored) {
    return <ErrorMessage />;
  } else if (!data) {
    return <NoData />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header level={2} text="Your Shelf Stats" />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <StatusPie data={data} />
        </Col>
        {/*<Col xs={24} md={12}>
          <GenreBar />
        </Col>
        <Col xs={24} md={12}>
          <DifficultyHistogram />
        </Col>
        <Col xs={24} md={12}>
          <AvgDifficultyByStatus />
        </Col> */}
        <Col xs={24}>
          <GenreStatusBar data={data} />
        </Col>
      </Row>
    </div>
  );
};
