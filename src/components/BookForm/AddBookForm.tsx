import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import { Author, Genre, UserShelfItemValues } from "../../types";
import { FlexContainer, NotFoundSwitch } from "../../ui";
import { BookMetadata } from "./BookMetadata";
import { AuthorSelection } from "./AuthorSelection";
import { BookDetails } from "./BookDetails";
import { FormButton } from "../../ui/FormButton";
import { useFormValidationContext } from "../../store";
import { useCoverPreviewContext } from "./CoverPreviewContext";
import { useMessageContext } from "../../store/MessageContext";
import { useAddNewBookToShelfMutation } from "../../store/shelfApi";

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
  const [form] = Form.useForm<UserShelfItemValues>();
  const [submitted, setSubmitted] = useState(false);
  const [addBookToShelf] = useAddNewBookToShelfMutation();
  const [isAuthorNotFound, setIsAuthorNotFound] = useState(false);
  const { clearErrors, sendErrors } = useFormValidationContext();
  const messageApi = useMessageContext();

  const { resetPreview } = useCoverPreviewContext();

  const handleFinish = async (values: UserShelfItemValues) => {
    setSubmitted(true);
    clearErrors();
    try {
      console.log(values);
      await addBookToShelf(values);
      form.resetFields();
      resetPreview();
      setSubmitted(false);
      messageApi.success("Book added successfully!");
    } catch (e: any) {
      let errorMessage = "Something went wrong";

      if (e.response) {
        errorMessage = e.response?.data.message || errorMessage;
        sendErrors({
          message: e.response.data?.message || errorMessage,
          errors: e.response.data?.errors || undefined,
        });
      }
      messageApi.error(errorMessage || "An error occurred. Please try again.");
      setSubmitted(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <BookDetails genres={genres} form={form} />
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
  );
};
