import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./SignUp.module.scss";

export const SignupPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Typography.Title level={2} className={styles.title}>
          Create an Account
        </Typography.Title>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

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
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Typography.Text className={styles.footerText}>
          Already have an account? <a href="/login">Login</a>
        </Typography.Text>
      </Card>
    </div>
  );
};
