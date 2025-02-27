import { AccessDenied, useAuth } from "../components";

type AuthPageProps = {
  Page: React.ReactNode;
};

export const AuthPage = ({ Page }: AuthPageProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? Page : <AccessDenied />;
};
