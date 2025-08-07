import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import styles from "./EditShelfItemPage.module.scss";
import { useGetShelfItemQuery } from "../store/shelfApi";
import { ErrorMessage, Loading, ScrollToggleBottom } from "../ui";
import {
  FormValidationContextProvider,
  UserShelfItemContextProvider,
} from "../store";
import { EditItem } from "../components/ShelfItemDetails";
import { EditItemForm } from "../components/ShelfItemDetails";

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
            <FormValidationContextProvider>
              <EditItemForm />
            </FormValidationContextProvider>
          </div>
          <ScrollToggleBottom />
        </UserShelfItemContextProvider>
      }
    />
  );
};
