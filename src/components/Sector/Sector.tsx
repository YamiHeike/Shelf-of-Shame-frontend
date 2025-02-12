import { appFeatures } from "./appFeatures";
import { Card, Col, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import styles from "./Sector.module.scss";
import { PageTitle } from "../ui/Header";

export const Sector = () => {
  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <PageTitle text="Shelf of Shame" />
      <Title
        level={2}
        style={{
          marginBottom: "40px",
          color: "#DCE8F2",
          textShadow: "1px 1px 3px #BF455B",
        }}
      >
        Tired of ever-growing TBR? Join us!
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {appFeatures.map((feature, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                borderRadius: "8px",
                height: "100%",
                transition: "transform 0.3s ease-in-out",
              }}
              className={styles["feature-card"]}
            >
              <div style={{ marginBottom: "16px" }}>{feature.icon}</div>
              <Title level={4} style={{ marginBottom: "8px" }}>
                {feature.title}
              </Title>
              <Paragraph type="secondary" style={{ fontSize: "14px" }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
