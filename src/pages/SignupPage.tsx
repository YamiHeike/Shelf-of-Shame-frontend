import { Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthForm, useAuth, User, UserDto } from "../components/Auth";
import {
  getValidationErrorMessage,
  backendRequest,
  setAuthToken,
} from "../utils";
import { type FormFieldError } from "../types";
import { useState } from "react";
import { FormButton } from "../ui/FormButton";
import { ValidatedField } from "../components";
import { PublicRoutePage } from "./PublicRoutePage";

export const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<FormFieldError | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: User) => {
    try {
      setError(null);
      setSubmitted(true);
      const response = await backendRequest<UserDto, User>(
        "POST",
        "http://localhost:8080/signup",
        {
          username: values.username,
          password: values.password,
          email: values.email,
        }
      );
      setAuthToken(response.data.token);
      login(response.data);
      navigate("/");
    } catch (e: any) {
      setSubmitted(false);
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
  let usernameMsg: string | null = null;
  let passwordMsg: string | null = null;

  if (error) {
    emailMsg = getValidationErrorMessage(error, "email");
    usernameMsg = getValidationErrorMessage(error, "username");
    passwordMsg = getValidationErrorMessage(error, "password");
  }

  return (
    <PublicRoutePage>
      <AuthForm
        title="Create an Account"
        footerText={
          <>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </>
        }
        error={error}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <ValidatedField errorMsg={usernameMsg}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
          </ValidatedField>
          <ValidatedField errorMsg={emailMsg}>
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
          <ValidatedField errorMsg={passwordMsg}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
          </ValidatedField>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <FormButton submitted={submitted} block preSubmitText="Sign Up" />
          </Form.Item>
        </Form>
      </AuthForm>
    </PublicRoutePage>
  );
};
