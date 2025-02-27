import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AuthCredentials,
  AuthForm,
  useAuth,
  UserDto,
} from "../components/Auth";
import {
  getValidationErrorMessage,
  request,
  reset,
  setAuthToken,
} from "../utils";
import { type FormFieldError } from "../types";
import { useState } from "react";
import { FormAlert } from "../components/ui/FormAlert/FormAlert";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<FormFieldError | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: AuthCredentials) => {
    setError(null);
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
      if (e.response) {
        setError({
          message: e.response.data?.message || "Something went wrong",
          errors: e.response.data?.errors || undefined,
        });
      } else {
        setError({ message: "Something went wrong" });
      }
    }
  };

  let emailMsg: string | null = null;
  let passwordMsg: string | null = null;

  if (error) {
    emailMsg = getValidationErrorMessage(error, "email");
    passwordMsg = getValidationErrorMessage(error, "password");
  }

  return (
    <AuthForm
      title="Login to Your Account"
      footerText={
        <>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </>
      }
      error={error}
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
            onChange={() => reset(emailMsg)}
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
            onChange={() => reset(passwordMsg)}
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
