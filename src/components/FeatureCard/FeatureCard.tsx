import { type AppFeatureType } from "../Homepage";
import styles from "./FeatureCard.module.scss";
import { Card, Col } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

type FeatureCardProps = {
  feature: AppFeatureType;
  key: number;
};

export const FeatureCard = ({ feature, key }: FeatureCardProps) => {
  return (
    <Col key={key} xs={24} sm={12} md={8} lg={6}>
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
  );
};
