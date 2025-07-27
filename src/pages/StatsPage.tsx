import { ShelfDashboard } from "../components/Stats/ShelfDashboard";
import { AuthPage } from "./AuthPage";

export const StatsPage = () => {
  return <AuthPage Page={<ShelfDashboard />} />;
};
