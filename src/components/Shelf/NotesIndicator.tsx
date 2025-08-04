import { FileTextOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

type NotesIndicatorProps = {
  notes: string;
};

export const NotesIndicator = ({ notes }: NotesIndicatorProps) => {
  return (
    <Tooltip title={notes}>
      <FileTextOutlined
        style={{ color: "#888", cursor: "pointer", marginLeft: "auto" }}
        aria-label="Has notes"
      />
    </Tooltip>
  );
};
