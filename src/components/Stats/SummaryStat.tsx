import { Card, Statistic } from "antd";
import { ReactNode } from "react";

type SummaryStatProps = {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const SummaryStat = ({
  title,
  value,
  prefix,
  suffix,
}: SummaryStatProps) => {
  return (
    <Card
      style={{
        background: "#2a2a3c",
        color: "#ffffff",
        border: "none",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
        transition: "box-shadow 0.3s, transform 0.2s",
      }}
      bodyStyle={{
        padding: "1.2rem",
      }}
      hoverable
    >
      <div
        style={{
          color: "#aaaac4",
          fontSize: "0.875rem",
          marginBottom: "0.25rem",
        }}
      >
        {title}
      </div>
      <Statistic
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color: "#ffffff" }}
      />
    </Card>
  );
};
