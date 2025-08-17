import { Card } from "antd";
import styles from "./RecommendationsPanel.module.scss";
import { UserShelfItemRecord } from "../../types";
import { fetchCoverUrl, retrieveAuthors } from "../../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RecommendationListItemProps = {
  item: UserShelfItemRecord;
};

export const RecommendationListItem = ({
  item,
}: RecommendationListItemProps) => {
  const [coverUrl, setCoverUrl] = useState<string>("");
  useEffect(() => {
    const loadCover = async () => {
      const cover = await fetchCoverUrl(item.book.isbn, true);
      setCoverUrl(cover);
    };
    loadCover();
  }, [item]);
  const navigate = useNavigate();

  return (
    <Card
      key={item.id}
      hoverable
      cover={<img src={coverUrl} className={styles.cover} />}
      style={{
        borderRadius: "8px",
        width: "250px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => navigate(`/shelf/${item.id}`)}
    >
      <Card.Meta
        title={item.book.title}
        description={`by ${retrieveAuthors(item.book.authors)}, difficulty: ${
          item.difficulty
        }`}
      />
    </Card>
  );
};
