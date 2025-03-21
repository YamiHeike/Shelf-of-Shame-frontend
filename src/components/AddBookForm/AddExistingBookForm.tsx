import { Button, Col, Form, message, Row, Select } from "antd";
import { AddExistingBookDto, Book } from "../../types";
import { NotFoundSwitch } from "../ui";
import { FormButton } from "../ui/FormButton";
import { useState } from "react";

type AddExistingBookProps = {
  isBookNotFound: boolean;
  onToggle: () => void;
  books: Book[];
};

const { Option } = Select;

export const AddExistingBookForm = ({
  isBookNotFound,
  books,
  onToggle,
}: AddExistingBookProps) => {
  const filterBooks = (input: string, option: any) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };

  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm<AddExistingBookDto>();
  const [messageApi, contextHolder] = message.useMessage();
  const handleFinish = async (values: AddExistingBookDto) => {
    setSubmitted(true);
    try {
      const bookDto: AddExistingBookDto = {
        isbn: values.isbn,
      };
      console.log("Adding book isbn:", bookDto.isbn);
      form.resetFields();
      messageApi.success("Book added! Make sure you read it one day!");
      setSubmitted(false);
    } catch (error) {
      console.log(error);
      message.error("An error has occurred. Please, try again");
      setSubmitted(false);
    }
  };

  return (
    <Form onFinish={handleFinish} form={form}>
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
          <Form.Item>
            <FormButton
              submitted={submitted}
              preSubmitText="Add to Shelf"
              postSubmitText="Adding..."
              style={{
                maxWidth: 200,
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
