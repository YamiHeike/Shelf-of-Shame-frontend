import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";

export const ShelfItemPage = () => {
  const { id } = useParams();
  return <AuthPage Page={<h1>Item details for {id}</h1>} />;
};
