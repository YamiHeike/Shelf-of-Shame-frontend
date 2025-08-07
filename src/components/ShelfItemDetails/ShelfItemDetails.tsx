import { Button, Tag, Typography } from "antd";
import styles from "./ShelfItemDetails.module.scss";
import { Header, SpringButton, StarRating } from "../../ui";
import { useCoverUrl } from "../../hooks";
import { retrieveAuthors, STATUS_COLORS, toProperCase } from "../../utils";
import { useUserShelfItemContext } from "../../store";
import { ShelfItemDetailsBody } from "./ShelfItemDetailsBody";
import { Link } from "react-router-dom";

const { Text, Paragraph } = Typography;

export const ShelfItemDetails = () => {
  const item = useUserShelfItemContext();
  const coverUrl = useCoverUrl(item.book.isbn, true);
  const { title, genres, numberOfPages } = item.book;

  const authors = retrieveAuthors(item.book.authors);

  return (
    <div className={styles.header}>
      <img src={coverUrl ?? ""} alt={title} className={styles.cover} />
      <div className={styles.headerInfo}>
        <div className={styles.tags}>
          <Tag
            color={STATUS_COLORS[item.status]}
            style={{ fontWeight: "bold", height: "fit-content" }}
          >
            {toProperCase(item.status)}
          </Tag>
          {genres.map((genre) => (
            <Tag
              key={genre.id}
              style={{ fontWeight: "bold", height: "fit-content" }}
            >
              {genre.name}
            </Tag>
          ))}
          <Link
            to="edit"
            style={{
              marginLeft: "auto",
            }}
          >
            <SpringButton>
              <Button type="primary">Edit</Button>
            </SpringButton>
          </Link>
        </div>
        <Header text={title} className={styles.title} />

        <Text className={styles.authors}>{authors}</Text>
        <Paragraph>{numberOfPages} pages</Paragraph>
        <div>
          <Paragraph>Difficulty:</Paragraph>
          <StarRating baseScore={item.difficulty} />
        </div>
      </div>
      <ShelfItemDetailsBody />
    </div>
  );
};
