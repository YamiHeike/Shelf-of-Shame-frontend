import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import styles from "./EditShelfItemPage.module.scss";
import { useGetShelfItemQuery } from "../store/shelfApi";
import { ErrorMessage, Loading } from "../ui";
import { UserShelfItemContextProvider } from "../store";
import { EditItem } from "../components/ShelfItemDetails/EditItem";

export const EditShelfItemPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetShelfItemQuery(
    parseInt(id ?? "0")
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
        <UserShelfItemContextProvider item={data}>
          <div className={styles.container}>
            <EditItem />
            {/*<EditItemForm />*/}
          </div>
        </UserShelfItemContextProvider>
      }
    />
  );
};
