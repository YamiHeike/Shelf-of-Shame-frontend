import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AuthCredentials,
  AuthForm,
  useAuth,
  UserDto,
} from "../components/Auth";
import { request, setAuthToken } from "../utils";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: AuthCredentials) => {
    console.log("Login Submitted:", values);
    try {
      const response = await request<UserDto, AuthCredentials>(
        "POST",
        "http://localhost:8080/login",
        values
      );
      setAuthToken(response.data.token);
      login(response.data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthForm
      title="Login to Your Account"
      footerText={
        <>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );
};
