import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { Author, Book, Genre, Status } from "../../types";
import { FlexContainer, FooterText, Header, NotFoundSwitch } from "../ui";
import { BookMetadata } from "./BookMetadata";
import { AuthorSelection } from "./AuthorSelection";
import { BookDetails } from "./BookDetails";
import { fetchCoverUrl } from "../../utils";
import { HttpState } from "../../types/HttpState";

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
  const [messageApi, contextHolder] = message.useMessage();
  const [coverUrl, setCoverUrl] = useState<HttpState<string>>({
    loading: false,
    data: null,
    error: false,
  });

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
      setCoverUrl({
        loading: false,
        data: null,
        error: false,
      });
      messageApi.success("Book added successfully!");
    } catch (error) {
      messageApi.error("An error occurred. Please try again.");
    }
  };

  const handlePreview = async (isbn: string) => {
    if (!isbn || isbn.length !== 10) {
      messageApi.warning("Enter a ISBN-10 first");
      return;
    }
    setCoverUrl({
      loading: true,
      data: null,
      error: false,
    });
    const url = await fetchCoverUrl(isbn);
    if (url) {
      setCoverUrl({
        loading: false,
        data: url,
        error: false,
      });
    } else {
      setCoverUrl({
        loading: false,
        data: null,
        error: true,
      });
    }
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "75rem", margin: "0 auto" }}>
      {contextHolder}
      <Header level={3} text="Add Book to Your Shelf" />
      <Form form={form} onFinish={handleFinish} layout="vertical">
        {isBookNotFound ? (
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <BookDetails
                genres={genres}
                coverUrl={coverUrl}
                form={form}
                onFetchCoverUrl={(isbn) => handlePreview(isbn)}
              />
              <FlexContainer>
                <NotFoundSwitch
                  label="Didn't find your book?"
                  value={isBookNotFound}
                  onToggle={setIsBookNotFound}
                />
                <NotFoundSwitch
                  label="Author not found?"
                  value={isAuthorNotFound}
                  onToggle={setIsAuthorNotFound}
                />
              </FlexContainer>
              <AuthorSelection
                authors={authors}
                isAuthorNotFound={isAuthorNotFound}
                onToggleAuthorNotFound={setIsAuthorNotFound}
              />
            </Col>

            <Col xs={24} md={12}>
              <BookMetadata />
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 16]}>
            <Col xs={24}>
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
