import { Card, Tag, Typography } from "antd";
import styles from "./ShelfItemDetails.module.scss";
import { Header, StarRating } from "../../ui";
import { useCoverUrl } from "../../hooks";
import { retrieveAuthors, STATUS_COLORS, toProperCase } from "../../utils";
import { useUserShelfItemContext } from "../../store";

const { Text, Paragraph } = Typography;

export const ShelfItemDetails = () => {
  const item = useUserShelfItemContext();
  const coverUrl = useCoverUrl(item.book.isbn, true);
  const { title, genres, numberOfPages, description } = item.book;

  const authors = retrieveAuthors(item.book.authors);
  const hasNotes = item.notes?.trim() ?? "" !== "";

  return (
    <div className={styles.header}>
      <img src={coverUrl ?? ""} alt={title} className={styles.cover} />
      <div className={styles.headerInfo}>
        <div className={styles.tags}>
          <Tag
            color={STATUS_COLORS[item.status]}
            style={{ fontWeight: "bold" }}
          >
            {toProperCase(item.status)}
          </Tag>
          {genres.map((genre) => (
            <Tag key={genre.id} style={{ fontWeight: "bold" }}>
              {genre.name}
            </Tag>
          ))}
        </div>
        <Header text={title} className={styles.title} />

        <Text className={styles.authors}>{authors}</Text>
        <Paragraph>{numberOfPages} pages</Paragraph>
        <div>
          <Paragraph>Difficulty:</Paragraph>
          <StarRating baseScore={item.difficulty} />
        </div>
      </div>
      <div className={styles.content}>
        <Card title="Description" className={styles.section}>
          <p>{description}</p>
        </Card>
        {hasNotes && (
          <Card title="My Notes" className={styles.section}>
            <p>{item.notes}</p>
          </Card>
        )}
      </div>
    </div>
  );
};
