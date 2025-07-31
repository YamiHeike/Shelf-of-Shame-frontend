import { Col, Row } from "antd";
import { useShelfDataContext } from "./ShelfDataContext";
import styles from "./SummaryPanel.module.scss";
import { Status } from "../../types";
import {
  BookOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { SummaryStat } from "./SummaryStat";
import { Header } from "../../ui";

export const SummaryPanel = () => {
  const { data } = useShelfDataContext();
  if (!data) return null;

  const totalBooks = data.length;
  const finished = data.filter((b) => b.status === Status.GLORY).length;
  const inProgress = data.filter((b) => b.status === Status.READING).length;
  const shame = data.filter((b) => b.status === Status.SHAME).length;
  const totalPages = data
    .filter((item) => item.status === Status.READING)
    .reduce((sum, b) => sum + (b.book.numberOfPages ?? 0), 0);
  const avgDifficulty =
    data.reduce((sum, b) => sum + b.difficulty, 0) / totalBooks;

  return (
    <div className={styles.summaryPanel}>
      <Header
        level={2}
        text="Your Shelf Stats"
        style={{ color: "#BF2633", textAlign: "center", marginBottom: "2rem" }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="Total Books"
            value={totalBooks}
            prefix={<BookOutlined />}
          />
        </Col>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="Finished"
            value={finished}
            prefix={<TrophyOutlined />}
          />
        </Col>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="In Progress"
            value={inProgress}
            prefix={<ClockCircleOutlined />}
          />
        </Col>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="Shame Pile"
            value={shame}
            prefix={<WarningOutlined />}
          />
        </Col>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="Pages Read"
            value={totalPages}
            prefix={<FileTextOutlined />}
          />
        </Col>
        <Col xs={12} md={8} lg={4}>
          <SummaryStat
            title="Avg. Difficulty"
            value={avgDifficulty.toFixed(2)}
            prefix={<BarChartOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};
