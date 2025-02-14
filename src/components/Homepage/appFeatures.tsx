import {
  BookOutlined,
  FolderOpenOutlined,
  BulbOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export const appFeatures = [
  {
    icon: <BookOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
    title: "Tackle Your Tsundoku",
    description:
      "Organize and track your unread books with ease, turning your ‘to-read’ pile into progress.",
  },
  {
    icon: <FolderOpenOutlined style={{ fontSize: "32px", color: "#52c41a" }} />,
    title: "Smart Book Categorization",
    description:
      "Sort your books by genre, difficulty, or personal tags to make choosing your next read effortless.",
  },
  {
    icon: <BulbOutlined style={{ fontSize: "32px", color: "#faad14" }} />,
    title: "Personalized Reading Suggestions",
    description:
      "Let the app recommend your next book based on your preferences and reading mood.",
  },
  {
    icon: (
      <CheckCircleOutlined style={{ fontSize: "32px", color: "#f5222d" }} />
    ),
    title: "Seamless Book Tracking",
    description:
      "Update progress, add comments, and keep track of your growing reading achievements.",
  },
];
