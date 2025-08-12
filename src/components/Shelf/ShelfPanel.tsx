import { useState } from "react";
import { ErrorMessage, Header, Loading, ScrollToggleBottom } from "../../ui";
import { useAuth } from "../Auth";
import { useGetShelfPageQuery } from "../../store/shelfApi";
import { NoData } from "../../ui/NoData";
import { ShelfPanelItem } from "./ShelfPanelItem";
import { Button } from "antd";
import styles from "./ShelfPanel.module.scss";
import { UserShelfItemContextProvider } from "../../store";
import { ShelfFilterBar } from "./ShelfFilterBar";
import { PageParams, ShelfItemFilter } from "../../types";

export const ShelfPanel = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<ShelfItemFilter>({});

  if (!user) {
    throw new Error("ShelfPanel component requires authentication");
  }

  const [currentPage, setCurrentPage] = useState(0);

  const params: PageParams & ShelfItemFilter = { page: currentPage, size: 8 };

  if (filters.status) params.status = filters.status;
  if (filters.difficultyMax) params.difficultyMax = filters.difficultyMax;
  if (filters.difficultyMin) params.difficultyMin = filters.difficultyMin;
  if (filters.genres && filters.genres.length > 0)
    params.genres = filters.genres;

  const { data, isLoading, isError } = useGetShelfPageQuery(params);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (data && !data.last) setCurrentPage(currentPage + 1);
  };

  const handleFilter = (newFilters: ShelfItemFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: newFilters.status,
      difficultyMin: newFilters.difficultyMin,
      difficultyMax: newFilters.difficultyMax,
      genres: newFilters.genres,
    }));
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
              <UserShelfItemContextProvider item={item}>
                <ShelfPanelItem />
              </UserShelfItemContextProvider>
            </li>
          ))}
        </ul>
        <div>
          {!data.first && (
            <Button type="primary" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {!data.last && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
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
      <ShelfFilterBar onFilter={handleFilter} filters={filters} />
      <div>{content}</div>
      {data && data.content.length !== 0 && <ScrollToggleBottom />}
    </section>
  );
};
