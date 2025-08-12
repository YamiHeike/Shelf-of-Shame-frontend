import { Card } from "antd";
import { useUserShelfItemContext } from "../../store";
import styles from "./ShelfItemDetails.module.scss";

export const ShelfItemDetailsBody = () => {
  const { book, notes } = useUserShelfItemContext();
  const { description } = book;

  const hasNotes = notes?.trim() ?? "" !== "";

  return (
    <div className={styles.content}>
      <Card title="Description" className={styles.section}>
        <p>{description}</p>
      </Card>
      {hasNotes && (
        <Card title="My Notes" className={styles.section}>
          <p>{notes}</p>
        </Card>
      )}
    </div>
  );
};
