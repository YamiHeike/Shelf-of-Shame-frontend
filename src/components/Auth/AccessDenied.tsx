import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const AccessDenied = () => {
  const navigate = useNavigate();
  const { Title, Paragraph } = Typography;

  const handleLoginClick = () => {
    navigate(routes.LOGIN.path);
  };

  const handleSignupClick = () => {
    navigate(routes.SIGNUP.path);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100dvh - 65px)",
        background: "linear-gradient(135deg, #383677, #bf2633)",
      }}
    >
      <Card
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3}>Login Required</Title>
        <Paragraph>
          You need to log in to access this page. Please log in or sign up if
          you don't have an account.
        </Paragraph>
        <Button
          type="primary"
          onClick={handleLoginClick}
          style={{ marginRight: 8 }}
        >
          Log In
        </Button>
        <Button onClick={handleSignupClick}>Sign Up</Button>
      </Card>
    </div>
  );
};
