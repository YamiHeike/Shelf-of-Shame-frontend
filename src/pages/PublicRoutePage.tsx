import { Navigate } from "react-router-dom";
import { useAuth } from "../components";

type PublicRoutePageProps = {
  children: React.ReactNode;
};

export const PublicRoutePage = ({ children }: PublicRoutePageProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};
