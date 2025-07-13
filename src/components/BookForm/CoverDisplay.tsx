import { Form } from "antd";
import defaultCover from "../../assets/default_cover.png";

type CoverDisplayProps = {
  coverUrl: string;
};

export const CoverDisplay = ({ coverUrl }: CoverDisplayProps) => {
  return (
    <Form.Item>
      <img src={coverUrl} alt="Book Cover" style={{ maxWidth: "100px" }} />
      {coverUrl === defaultCover && <p>Cover not found</p>}
    </Form.Item>
  );
};
