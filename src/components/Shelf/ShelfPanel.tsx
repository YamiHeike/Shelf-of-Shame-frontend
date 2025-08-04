import { useState } from "react";
import {
  ErrorMessage,
  Header,
  Loading,
  ScrollToggleBottom,
  SpringButton,
} from "../../ui";
import { useAuth } from "../Auth";
import { useGetShelfPageQuery } from "../../store/shelfApi";
import { NoData } from "../../ui/NoData";
import { ShelfPanelItem } from "./ShelfPanelItem";
import { Button } from "antd";
import styles from "./ShelfPanel.module.scss";

export const ShelfPanel = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("ShelfPanel component requires authentication");
  }

  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, isError } = useGetShelfPageQuery({
    page: currentPage,
    size: 8,
  });

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (data && !data.last) setCurrentPage(currentPage + 1);
  };

  let content: React.ReactNode;

  if (isError) {
    content = <ErrorMessage />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (!data || data.content.length === 0) {
    content = <NoData />;
  } else {
    content = (
      <div>
        <ul className={styles.gridContainer}>
          {data.content.map((item) => (
            <li key={item.id}>
              <ShelfPanelItem item={item} />
            </li>
          ))}
        </ul>
        <div>
          {!data.first && <Button onClick={handlePrev}>Previous</Button>}
          {!data.last && <Button onClick={handleNext}>Next</Button>}
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Header
        text={`${user.username}'s Shelf of Shame`}
        style={{
          textAlign: "center",
        }}
      />
      <div>{content}</div>
      {data && <ScrollToggleBottom />}
    </section>
  );
};
