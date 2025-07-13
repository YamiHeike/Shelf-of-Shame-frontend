import { Typography } from "antd";
import { Header } from "../Header";

type FeatureUnavailableNoticeProps = {
  title: string;
  message: string;
};

export const FeatureUnavailableNotice = ({
  title,
  message,
}: FeatureUnavailableNoticeProps) => {
  return (
    <>
      <Header level={3} text={title} />
      <Typography.Paragraph>{message}</Typography.Paragraph>
    </>
  );
};
