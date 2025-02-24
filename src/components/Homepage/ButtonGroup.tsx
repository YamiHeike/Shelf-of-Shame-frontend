import { Row, Col, Tooltip, Button, Card, Grid } from "antd";
import {
  BookOutlined,
  BarChartOutlined,
  PlusOutlined,
  BulbOutlined,
} from "@ant-design/icons";

export const ButtonGroup = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Card style={{ marginTop: 20, borderRadius: 8 }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={12} sm={8} md={6}>
          <Tooltip title="Add a Book">
            <Button type="primary" icon={<PlusOutlined />} block>
              {screens.md ? null : "Add a Book"}
            </Button>
          </Tooltip>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Tooltip title="Browse Shelf">
            <Button type="default" icon={<BookOutlined />} block>
              {screens.md ? null : "Browse Shelf"}
            </Button>
          </Tooltip>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Tooltip title="View Stats">
            <Button type="dashed" icon={<BarChartOutlined />} block>
              {screens.md ? null : "View Stats"}
            </Button>
          </Tooltip>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Tooltip title="Get Recommendations">
            <Button type="link" icon={<BulbOutlined />} block>
              {screens.md ? null : "Get Recommendations"}
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};
