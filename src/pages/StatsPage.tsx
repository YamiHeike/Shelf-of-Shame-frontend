import { ShelfDataContextProvider } from "../components/Stats";
import { ShelfDashboard } from "../components/Stats/ShelfDashboard";
import { AuthPage } from "./AuthPage";

export const StatsPage = () => {
  return (
    <AuthPage
      Page={
        <ShelfDataContextProvider>
          <ShelfDashboard />
        </ShelfDataContextProvider>
      }
    />
  );
};
