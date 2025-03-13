import React, { useState } from "react";
import { Form, Input, Button, Select, message, Row, Col, Switch } from "antd";
import { Author, Book, Genre, Status } from "../../types";
import { FooterText, Header, NotFoundSwitch } from "../ui";
import axios from "axios";

const { Option } = Select;

interface AddBookFormProps {
  onAddBook: (
    book: Book,
    difficulty: number,
    status: Status,
    notes: string
  ) => void;
  authors: Author[];
  genres: Genre[];
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onAddBook,
  authors,
  genres,
}) => {
  const [form] = Form.useForm();
  const [isAuthorNotFound, setIsAuthorNotFound] = useState(false);
  const [isBookNotFound, setIsBookNotFound] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");

  const handleFinish = async (values: any) => {
    try {
      const book: Book = {
        title: values.title,
        author: isAuthorNotFound
          ? [{ id: -1, firstName: values.firstName, lastName: values.lastName }]
          : authors.filter((author) => author.id === values.authorId),
        numberOfPages: values.numberOfPages,
        isbn: values.isbn,
        description: values.description,
      };

      onAddBook(book, values.difficulty, values.status, values.notes);

      form.resetFields();
      setCoverUrl("");
      message.success("Book added successfully!");
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const fetchCoverUrl = async (isbn: string) => {
    try {
      const response = await axios.get(
        `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(response.data);
        setCoverUrl(imageUrl);
        form.setFieldsValue({ coverUrl: imageUrl });
      } else {
        message.warning("No cover found for this ISBN.");
        setCoverUrl("");
      }
    } catch (error) {
      message.error("Failed to fetch cover");
      setCoverUrl("");
    }
  };

  const filterAuthors = (input: string, option: any) => {
    return option.children.toLowerCase().includes(input.toLowerCase());
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "75rem", margin: "0 auto" }}>
      <Header level={3} text="Add Book to Your Shelf" />
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {isBookNotFound ? (
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Book Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter the book title!" },
                ]}
              >
                <Input placeholder="Enter book title" />
              </Form.Item>
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
              <NotFoundSwitch
                label="Author not found?"
                value={isAuthorNotFound}
                onToggle={setIsAuthorNotFound}
              />
              {isAuthorNotFound && (
                <div>
                  <Header text="Add an Author" level={4} />

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
                </div>
              )}

              <Form.Item
                label="ISBN-10"
                name="isbn"
                rules={[
                  { required: true, message: "Please enter the ISBN-10!" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please enter a valid 10-digit ISBN.",
                  },
                ]}
              >
                <Input
                  placeholder="Enter ISBN-10"
                  onChange={(e) => {
                    if (e.target.value.length === 10) {
                      fetchCoverUrl(e.target.value);
                    }
                  }}
                />
              </Form.Item>

              {coverUrl && (
                <Form.Item label="Book Cover">
                  <img
                    src={coverUrl}
                    alt="Book Cover"
                    style={{ maxWidth: "100px" }}
                  />
                </Form.Item>
              )}

              <Form.Item
                label="Genre"
                name="genreId"
                rules={[{ required: true, message: "Please select a genre!" }]}
              >
                <Select placeholder="Select a genre">
                  {genres.map((genre) => (
                    <Option key={genre.id} value={genre.id}>
                      {genre.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Number of Pages"
                name="numberOfPages"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of pages!",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter number of pages" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter a description!" },
                ]}
              >
                <Input.TextArea placeholder="Enter book description" rows={4} />
              </Form.Item>
              <Form.Item
                label="Perceived Difficulty (1-10)"
                name="difficulty"
                rules={[
                  { required: true, message: "Please enter the difficulty!" },
                  {
                    type: "number",
                    min: 1,
                    max: 10,
                    message: "Difficulty must be between 1 and 10!",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter difficulty (1-10)"
                  min={1}
                  max={10}
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select placeholder="Select a status">
                  {Object.values(Status).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Notes" name="notes">
                <Input.TextArea
                  placeholder="Enter any notes about the book"
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              {/* Found & Not Found logic should be placed within this Row Col structure */}

              <Form.Item
                label="Select a book"
                rules={[
                  {
                    required: !isBookNotFound,
                    message: "Select the book to add",
                  },
                ]}
              >
                <Input placeholder="Search books" name="book_title" />
              </Form.Item>
              <NotFoundSwitch
                label="Didn't find your book?"
                value={isBookNotFound}
                onToggle={setIsBookNotFound}
              />
            </Col>
          </Row>
        )}

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
      <FooterText text="Tracking all of your unread books makes creating a reading plan way easier! ✨" />
    </div>
  );
};
