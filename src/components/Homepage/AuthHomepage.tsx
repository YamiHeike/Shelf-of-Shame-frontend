import { useAuth } from "../Auth";
import Title from "antd/es/typography/Title";
import { Card } from "antd";

export const AuthHomepage = () => {
  const { user } = useAuth();

  return <Card>{user && <Title>Hello, {user.username}!</Title>}</Card>;
};
