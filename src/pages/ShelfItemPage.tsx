import { useParams, useSearchParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { ShelfItemDetails } from "../components/ShelfItemDetails";
import styles from "./ShelfItemDetailsPage.module.scss";
import { useGetShelfItemQuery } from "../store/shelfApi";
import { ErrorMessage, Loading } from "../ui";
import { UserShelfItemContextProvider } from "../store";
import { useEffect, useRef } from "react";
import { useMessageContext } from "../store/MessageContext";

export const ShelfItemPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetShelfItemQuery(
    parseInt(id ?? "-1")
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const messageApi = useMessageContext();
  const messageShown = useRef<boolean>(false);
  const edited = searchParams.get("edited") === "true";

  useEffect(() => {
    if (edited && !messageShown.current) {
      messageApi.success("Your changes were saved!");
      messageShown.current = true;
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("edited");
      setSearchParams(newParams);
    }
  }, [edited, messageApi, searchParams, setSearchParams]);

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
          <div className={styles.detailsPage}>
            <ShelfItemDetails />
          </div>
        </UserShelfItemContextProvider>
      }
    />
  );
};
