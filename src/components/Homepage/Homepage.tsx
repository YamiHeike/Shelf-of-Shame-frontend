import { appFeatures } from "./appFeatures";
import { Row } from "antd";
import Title from "antd/es/typography/Title";
import { PageTitle } from "../../ui/Header";
import { FeatureCard } from "../FeatureCard";

export const Homepage = () => {
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
          <FeatureCard feature={feature} key={index} />
        ))}
      </Row>
    </div>
  );
};
