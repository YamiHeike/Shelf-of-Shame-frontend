import { Row, Col, Card } from "antd";
import {
  BookOutlined,
  BarChartOutlined,
  PlusOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { routes } from "../../routes";
import { TooltipNavButton } from "../ui";

export const ButtonGroup = () => {
  return (
    <Card style={{ marginTop: 20, borderRadius: 8 }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={12} sm={8} md={6}>
          <TooltipNavButton
            to={routes.ADD.path}
            title="Add a Book"
            Icon={<PlusOutlined />}
            type="primary"
            block
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <TooltipNavButton
            to={routes.SHELF.path}
            title="Browse Shelf"
            Icon={<BookOutlined />}
            block
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <TooltipNavButton
            to={routes.STATS.path}
            title="View Stats"
            type="dashed"
            Icon={<BarChartOutlined />}
            block
          />
        </Col>
        <Col xs={12} sm={8} md={6}>
          <TooltipNavButton
            to={routes.RECOMMENDATIONS.path}
            title="Recommendations"
            type="link"
            Icon={<BulbOutlined />}
            block
          />
        </Col>
      </Row>
    </Card>
  );
};
