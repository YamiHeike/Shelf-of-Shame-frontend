import { useUserShelfItemContext } from "../../store";
import { useCoverUrl } from "../../hooks";
import { retrieveAuthors } from "../../utils";

import styles from "./EditItem.module.scss";
import { Tag, Typography } from "antd";
import { Header } from "../../ui";

const { Text } = Typography;

export const EditItem = () => {
  const item = useUserShelfItemContext();
  const coverUrl = useCoverUrl(item.book.isbn);
  const authors = retrieveAuthors(item.book.authors);

  return (
    <div className={styles.header}>
      <img
        src={coverUrl || undefined}
        alt={item.book.title}
        className={styles.cover}
      />
      <div className={styles.info}>
        <Header text={item.book.title} />
        <Text
          style={{
            margin: "0.25rem 0 0.5rem",
            color: "#666",
          }}
        >
          {authors}
        </Text>
        <div className={styles.genres}>
          {item.book.genres.map((genre) => (
            <Tag
              key={genre.id}
              style={{
                margin: "0.25rem 0 0.5rem",
                height: "fit-content",
                marginBlock: "0.25em",
              }}
            >
              {genre.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
