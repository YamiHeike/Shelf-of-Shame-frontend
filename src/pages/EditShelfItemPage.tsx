import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";

export const EditShelfItemPage = () => {
  const { id } = useParams();

  return (
    <AuthPage
      Page={
        <div>
          <h3>Edit item {id}</h3>
        </div>
      }
    />
  );
};
