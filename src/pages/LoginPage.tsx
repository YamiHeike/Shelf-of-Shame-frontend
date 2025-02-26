import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AuthCredentials,
  AuthForm,
  useAuth,
  UserDto,
} from "../components/Auth";
import { getValidationErrorMessage, request, setAuthToken } from "../utils";
import { FormFieldError } from "../types";
import { useState } from "react";
import { FormAlert } from "../components/ui/FormAlert/FormAlert";

export const LoginPage = () => {
  const wrongPass = "Wrong password";
  const [form] = Form.useForm();
  const [error, setError] = useState<FormFieldError | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: AuthCredentials) => {
    try {
      const response = await request<UserDto, AuthCredentials>(
        "POST",
        "http://localhost:8080/login",
        values
      );
      setAuthToken(response.data.token);
      login(response.data);
      navigate("/");
    } catch (e: any) {
      console.log(e);
      if (e.response && e.response.data.message) {
        setError(e.response.data);
      } else {
        setError(e);
      }
    }
  };

  const handleChange = () => {
    if (error) {
      setError(null);
    }
  };

  let emailMsg;
  let passwordMsg;

  if (error) {
    emailMsg = getValidationErrorMessage(error, "email");
    passwordMsg = getValidationErrorMessage(error, "password");
    if (error.message === wrongPass) {
      passwordMsg = error.message;
    }
  }

  return (
    <AuthForm
      title="Login to Your Account"
      footerText={
        <>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </>
      }
      error={error?.message === wrongPass ? null : error}
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
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Item>
        {emailMsg && <FormAlert errorMsg="Wrong email" />}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Item>
        {passwordMsg && <FormAlert errorMsg="Wrong password" />}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );
};
