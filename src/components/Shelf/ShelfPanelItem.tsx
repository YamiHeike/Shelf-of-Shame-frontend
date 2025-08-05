import React, { useEffect, useState } from "react";
import { Card, Tag, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { UserShelfItemRecord, Status } from "../../types";
import { fetchCoverUrl, toProperCase, truncate } from "../../utils";
import styles from "./ShelfPanelItem.module.scss";
import { ShelfItemMenu } from "./ShelfItemMenu";
import { StarRating } from "../../ui";
import { NotesIndicator } from "./NotesIndicator";
import { Link } from "react-router-dom";

const STATUS_COLORS: Record<Status, string> = {
  [Status.SHAME]: "volcano",
  [Status.GLORY]: "green",
  [Status.READING]: "blue",
};

type ShelfOfShameItemProps = {
  item: UserShelfItemRecord;
};

export const ShelfPanelItem: React.FC<ShelfOfShameItemProps> = ({ item }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchCoverUrl(item.book.isbn, true).then((url) => {
      if (active) setCoverUrl(url);
    });
    return () => {
      active = false;
    };
  }, [item.book.isbn]);

  const authors = item.book.authors
    .map((a) => `${a.firstName} ${a.lastName}`)
    .join(", ");

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
          style={{ width: "100%", height: 350, objectFit: "cover" }}
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
