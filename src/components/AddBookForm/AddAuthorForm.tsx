import React from "react";
import { Form, Input } from "antd";

interface AddAuthorFormProps {
  onFinish: (values: { firstName: string; lastName: string }) => void;
}

const AddAuthorForm: React.FC<AddAuthorFormProps> = ({ onFinish }) => {
  return (
    <div>
      <h2>Add an Author</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter the author's first name!",
            },
          ]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter the author's last name!",
            },
          ]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAuthorForm;
