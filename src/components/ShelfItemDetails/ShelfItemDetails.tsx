import { Card, Tag, Typography } from "antd";
import styles from "./ShelfItemDetails.module.scss";
import { UserShelfItemRecord } from "../../types";
import { Header, StarRating } from "../../ui";
import { useCoverUrl } from "../../hooks";
import { retrieveAuthors } from "../../utils";

type ShelfItemDetailsHeaderProps = {
  item: UserShelfItemRecord;
};

const { Text, Paragraph } = Typography;

export const ShelfItemDetails = ({ item }: ShelfItemDetailsHeaderProps) => {
  const coverUrl = useCoverUrl(item.book.isbn, true);
  const { title, genres, numberOfPages, description } = item.book;

  const authors = retrieveAuthors(item.book.authors);

  return (
    <div className={styles.header}>
      <img src={coverUrl ?? ""} alt={title} className={styles.cover} />
      <div className={styles.headerInfo}>
        <div className={styles.tags}>
          <Tag color="green">Glory</Tag>
          {genres.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
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
        <Card title="My Notes" className={styles.section}>
          <p>{item.notes}</p>
        </Card>
      </div>
    </div>
  );
};
