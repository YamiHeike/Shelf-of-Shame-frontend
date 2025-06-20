import { Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AuthCredentials,
  AuthForm,
  useAuth,
  UserDto,
} from "../components/Auth";
import { backendRequest, setAuthToken } from "../utils";
import { type FormFieldError } from "../types";
import { useState } from "react";
import { FormButton } from "../components/ui/FormButton";
import { ValidatedField } from "../components";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<FormFieldError | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: AuthCredentials) => {
    setError(null);
    setSubmitted(true);
    try {
      const response = await backendRequest<UserDto, AuthCredentials>(
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
      setSubmitted(false);
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
      error={error}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <ValidatedField
          errorMsg={error?.message.includes("email") ? "Wrong email" : null}
        >
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
        </ValidatedField>
        <ValidatedField
          errorMsg={
            error?.message.includes("password") ? "Wrong password" : null
          }
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
        </ValidatedField>

        <Form.Item>
          <FormButton submitted={submitted} block preSubmitText="Sign In" />
        </Form.Item>
      </Form>
    </AuthForm>
  );
};
