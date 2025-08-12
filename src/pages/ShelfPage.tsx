import { ShelfPanel } from "../components";
import { AuthPage } from "./AuthPage";

export const ShelfPage = () => {
  return <AuthPage Page={<ShelfPanel />} />;
};
