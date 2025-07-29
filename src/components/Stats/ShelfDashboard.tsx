import { Row, Col } from "antd";
import { ErrorMessage, Header, Loading } from "../../ui";
import { NoData } from "../../ui/NoData";
import { StatusPie } from "./charts/StatusPie";
import styles from "./ShelfDashBoard.module.scss";

import { GenreStatusBar } from "./charts/GenreStatusStackedBar";
import { useShelfDataContext } from "./ShelfDataContext";

export const ShelfDashboard = () => {
  const { data, loading, errored } = useShelfDataContext();

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
          <StatusPie />
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
          <GenreStatusBar />
        </Col>
      </Row>
    </div>
  );
};
