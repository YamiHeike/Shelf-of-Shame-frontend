import { Form, Select, Input } from "antd";
import { Author } from "../../types";

const { Option } = Select;

interface AuthorSelectionProps {
  authors: Author[];
  isAuthorNotFound: boolean;
  onToggleAuthorNotFound: (value: boolean) => void;
}

export const AuthorSelection: React.FC<AuthorSelectionProps> = ({
  authors,
  isAuthorNotFound,
}) => {
  const filterAuthors = (input: string, option: any) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };

  return (
    <>
      <Form.Item
        label="Select Author"
        name="authorId"
        rules={[
          {
            required: !isAuthorNotFound,
            message: "Please select an author!",
          },
        ]}
      >
        <Select
          placeholder="Search for an author"
          showSearch
          optionFilterProp="children"
          filterOption={filterAuthors}
          disabled={isAuthorNotFound}
        >
          {authors.map((author) => (
            <Option key={author.id} value={author.id}>
              {`${author.firstName} ${author.lastName}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {isAuthorNotFound && (
        <>
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
        </>
      )}
    </>
  );
};
