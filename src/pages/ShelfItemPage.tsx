import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { ShelfItemDetails } from "../components/ShelfItemDetails";
import styles from "./ShelfItemDetailsPage.module.scss";
import { useGetShelfItemQuery } from "../store/shelfApi";
import { ErrorMessage, Loading } from "../ui";

export const ShelfItemPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetShelfItemQuery(
    parseInt(id ?? "-1")
  );

  if (isLoading) return <Loading fullscreen />;
  if (isError) return <ErrorMessage fullscreen />;
  if (!data)
    return (
      <ErrorMessage
        title="Item not found"
        message={"Your shelf item was not found. Perhaps it was deleted"}
        fullscreen
      />
    );

  return (
    <AuthPage
      Page={
        <div className={styles.detailsPage}>
          <ShelfItemDetails item={data} />
          {/*<ShelfItemDetailsContent />*/}
        </div>
      }
    />
  );
};
