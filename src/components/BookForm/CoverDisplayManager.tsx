import { Form, Spin } from "antd";
import defaultCover from "../../assets/default_cover.png";
import { useCoverPreviewContext } from "./CoverPreviewContext";
import { LoadingOutlined } from "@ant-design/icons";

export const CoverDisplayManager = () => {
  const { coverLoading, coverData } = useCoverPreviewContext();

  if (coverLoading) {
    return (
      <Spin
        indicator={<LoadingOutlined spin />}
        style={{
          marginBottom: "10px",
        }}
      />
    );
  }

  if (!coverData) return;

  return (
    <Form.Item>
      <img src={coverData} alt="Book Cover" style={{ maxWidth: "100px" }} />
      {coverData === defaultCover && <p>Cover not found</p>}
    </Form.Item>
  );
};
