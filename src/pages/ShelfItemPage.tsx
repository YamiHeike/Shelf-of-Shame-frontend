import { useParams } from "react-router-dom";
import { AuthPage } from "./AuthPage";

export const ShelfItemPage = () => {
  const { isbn } = useParams();
  return <AuthPage Page={<h1>Item details for {isbn}</h1>} />;
};
