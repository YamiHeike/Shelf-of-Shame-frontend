import React, { useState } from "react";
import { Form, message, Row, Col, Typography, Flex } from "antd";
import {
  Author,
  Book,
  CreateAuthorDto,
  Genre,
  UserShelfItemDto,
} from "../../types";
import { FlexContainer, NotFoundSwitch } from "../../ui";
import { BookMetadata } from "./BookMetadata";
import { AuthorSelection } from "./AuthorSelection";
import { BookDetails } from "./BookDetails";
import { backendRequest, fetchCoverUrl } from "../../utils";
import { HttpState } from "../../types/HttpState";
import { FormButton } from "../../ui/FormButton";
import { useFormValidationContext } from "./FormValidationContext";
import { NoData } from "../../ui/NoData";

interface AddBookFormProps {
  authors: Author[];
  genres: Genre[];
  isBookNotFound: boolean;
  onToggle: () => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  authors,
  genres,
  isBookNotFound,
  onToggle,
}) => {
  const [form] = Form.useForm<UserShelfItemDto>();
  const [submitted, setSubmitted] = useState(false);
  const [isAuthorNotFound, setIsAuthorNotFound] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    // errors,
    // getFieldErrorMessage,
    clearErrors,
    sendErrors,
  } = useFormValidationContext();

  const [coverUrl, setCoverUrl] = useState<HttpState<string>>({
    loading: false,
    data: null,
    error: false,
  });

  const handleFinish = async (values: any) => {
    setSubmitted(true);
    clearErrors();
    let addAuthorResponse;

    if (isAuthorNotFound) {
      addAuthorResponse = await backendRequest<Author, CreateAuthorDto>(
        "POST",
        "http://localhost:8080/authors/new",
        {
          firstName: values.firstName,
          lastName: values.lastName,
        }
      );
    }

    try {
      const book: Book = {
        title: values.title,
        authors: isAuthorNotFound
          ? [
              addAuthorResponse?.data ?? {
                id: -1,
                firstName: "",
                lastName: "",
              },
            ]
          : authors.filter((author) => author.id === values.authorId),
        numberOfPages: values.numberOfPages,
        isbn: values.isbn,
        description: values.description,
        genres: [parseInt(values.genre)],
      };

      await backendRequest<Book, Book>(
        "POST",
        "http://localhost:8080/books/new",
        book
      );

      const bookDto: UserShelfItemDto = {
        book,
        notes: values.notes,
        difficulty: values.difficulty,
        status: values.status,
      };

      console.log(
        "Adding book:",
        bookDto.book,
        bookDto.notes,
        bookDto.difficulty,
        bookDto.status
      );

      form.resetFields();
      setCoverUrl({
        loading: false,
        data: null,
        error: false,
      });
      setSubmitted(false);
      messageApi.success("Book added successfully!");
    } catch (e: any) {
      if (e.response) {
        sendErrors({
          message: e.response.data?.message || "Something went wrong",
          errors: e.response.data?.errors || undefined,
        });
      }
      messageApi.error("An error occurred. Please try again.");
      setSubmitted(false);
    }
  };

  // TODO: consider moving down

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
    <>
      {contextHolder}
      <Form form={form} onFinish={handleFinish} layout="vertical">
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
                onToggle={() => {
                  onToggle();
                  clearErrors();
                }}
              />
              <NotFoundSwitch
                label="Author not found?"
                value={isAuthorNotFound}
                onToggle={setIsAuthorNotFound}
              />
            </FlexContainer>
            <AuthorSelection
              authors={authors}
              isAuthorNotFound={isAuthorNotFound || authors.length === 0}
              onToggleAuthorNotFound={setIsAuthorNotFound}
            />
          </Col>

          <Col xs={24} md={12}>
            <BookMetadata />
          </Col>
        </Row>
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
      </Form>
    </>
  );
};
