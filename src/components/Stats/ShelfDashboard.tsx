import { Row, Col } from "antd";
import { ErrorMessage, Loading, ScrollToggleBottom } from "../../ui";
import { NoData } from "../../ui/NoData";
import { StatusPie } from "./charts/StatusPie";
import styles from "./ShelfDashBoard.module.scss";
import { stagger, useAnimate } from "motion/react";
import { GenreStatusBar } from "./charts/GenreStatusStackedBar";
import { useShelfDataContext } from "./ShelfDataContext";
import { GenreBar } from "./charts/GenreBar";
import { AvgDifficultyByStatus } from "./charts/AvgDifficultyByStatus";
import { DifficultyHistogram } from "./charts/DifficultyHistogram";
import { SummaryPanel } from "./SummaryPanel";
import { useEffect } from "react";

export const ShelfDashboard = () => {
  const { data, loading, errored } = useShelfDataContext();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!data) return;
    animate(
      ".ant-col",
      { opacity: [0, 1], y: [-20, 0] },
      { duration: 0.4, delay: stagger(0.15) }
    );
  }, [data, animate]);

  if (loading) {
    return <Loading fullscreen />;
  } else if (errored) {
    return <ErrorMessage />;
  } else if (!data) {
    return <NoData />;
  }

  return (
    <>
      <SummaryPanel />
      <div className={styles.dashboardContainer} ref={scope}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <AvgDifficultyByStatus />
          </Col>
          <Col xs={24} md={12}>
            <StatusPie />
          </Col>
          <Col xs={24} md={12}>
            <GenreBar limit={5} />
          </Col>
          <Col xs={24} md={12}>
            <DifficultyHistogram />
          </Col>
          <Col xs={24}>
            <GenreStatusBar />
          </Col>
        </Row>
        <ScrollToggleBottom />
      </div>
    </>
  );
};
