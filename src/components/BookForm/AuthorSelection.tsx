import { Form, Select, Input } from "antd";
import { Author } from "../../types";

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
        name="authorIds"
        rules={[
          {
            required: !isAuthorNotFound,
            min: 1,
            type: "array",
            message: "Please select at least one author!",
          },
        ]}
      >
        <Select
          placeholder="Search for an author"
          mode="multiple"
          showSearch
          optionFilterProp="children"
          filterOption={filterAuthors}
          disabled={isAuthorNotFound}
          options={authors.map((author) => ({
            label: `${author.firstName} ${author.lastName}`,
            value: author.id,
          }))}
        />
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
