import { Card, Tag, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  retrieveAuthors,
  STATUS_COLORS,
  toProperCase,
  truncate,
} from "../../utils";
import styles from "./ShelfPanelItem.module.scss";
import { ShelfItemMenu } from "./ShelfItemMenu";
import { StarRating } from "../../ui";
import { NotesIndicator } from "./NotesIndicator";
import { Link } from "react-router-dom";
import { useCoverUrl } from "../../hooks";
import { useUserShelfItemContext } from "../../store";

export const ShelfPanelItem = () => {
  const item = useUserShelfItemContext();
  const coverUrl = useCoverUrl(item.book.isbn);
  const authors = retrieveAuthors(item.book.authors);

  const descriptionSnippet = truncate(item.book.description || "", 120);
  const hasNotes = item.notes?.trim() ?? "" !== "";

  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <img
          alt={`${item.book.title} cover`}
          src={coverUrl || undefined}
          style={{
            width: "100%",
            height: 350,
            aspectRatio: "2 / 3",
          }}
        />
      }
      bodyStyle={{ padding: 0 }}
    >
      <div className={styles.cardBody}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{item.book.title}</h3>
          <Dropdown overlay={<ShelfItemMenu />} trigger={["click"]}>
            <Button
              type="text"
              icon={<MoreOutlined style={{ fontSize: 18 }} />}
            />
          </Dropdown>
        </div>
        <h4 className={styles.authors} title={authors}>
          {authors}
        </h4>
        <p className={styles.description}>Difficulty:</p>
        <StarRating baseScore={item.difficulty} />
        <p className={styles.description} title={item.book.description}>
          {descriptionSnippet}
        </p>
        <div className={styles.meta}>
          <Tag
            color={STATUS_COLORS[item.status]}
            style={{ fontWeight: "bold" }}
          >
            {toProperCase(item.status)}
          </Tag>
          {item.book.genres.map((genre) => (
            <Tag key={genre.id} color="default" style={{ fontWeight: "bold" }}>
              {genre.name}
            </Tag>
          ))}
          {hasNotes && <NotesIndicator notes={item.notes} />}
        </div>

        <Link to={`${item.id}`}>
          <Button type="primary" style={{ marginTop: "auto" }}>
            More
          </Button>
        </Link>
      </div>
    </Card>
  );
};
