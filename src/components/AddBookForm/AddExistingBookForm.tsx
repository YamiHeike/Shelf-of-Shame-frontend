import { Button, Col, Form, message, Row, Select } from "antd";
import { AddExistingBookDto, Book } from "../../types";
import { NotFoundSwitch } from "../ui";

type AddExistingBookProps = {
  isBookNotFound: boolean;
  onToggle: () => void;
  onAddBook: (isbn: string) => void;
  books: Book[];
};

const { Option } = Select;

export const AddExistingBookForm = ({
  isBookNotFound,
  books,
  onToggle,
  onAddBook,
}: AddExistingBookProps) => {
  const filterBooks = (input: string, option: any) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };

  const [form] = Form.useForm<AddExistingBookDto>();
  const [messageApi, contextHolder] = message.useMessage();
  const handleFinish = async (values: AddExistingBookDto) => {
    try {
      const bookDto: AddExistingBookDto = {
        isbn: values.isbn,
      };
      onAddBook(bookDto.isbn);
      form.resetFields();
      messageApi.success("Book added! Be sure to read it one day!");
    } catch (error) {
      console.log(error);
      message.error("An error has occurred. Please, try again");
    }
  };

  return (
    <Form onFinish={handleFinish}>
      {contextHolder}
      <Row gutter={[24, 16]}>
        <Col xs={16}>
          <Form.Item
            name="isbn"
            label="Select a book"
            rules={[
              {
                required: !isBookNotFound,
                message: "Select the book to add",
              },
            ]}
          >
            <Select
              placeholder="Search for books"
              showSearch
              optionFilterProp="children"
              filterOption={filterBooks}
            >
              {books.map((book) => {
                const authorNames = book.author.map(
                  (author) => `${author.firstName} ${author.lastName}`
                );
                const authors = authorNames.join(", ");

                return (
                  <Option key={book.isbn} value={book.isbn}>
                    {`${book.title} (${authors})`}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <NotFoundSwitch
            label="Didn't find your book?"
            value={isBookNotFound}
            onToggle={onToggle}
          />
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", maxWidth: "200px" }}
        >
          Add to Shelf
        </Button>
      </Form.Item>
    </Form>
  );
};
