import { Form, Input, Select, Button, FormInstance } from "antd";
import { Genre } from "../../types";
import { FlexContainer, ValidatedField } from "../../ui";
import { useFormValidationContext } from "../../store";
import { CoverDisplayManager } from "./CoverDisplayManager";
import { useCoverPreviewContext } from "./CoverPreviewContext";

const { Option } = Select;

interface BookDetailsProps {
  genres: Genre[];
  form: FormInstance<any>;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ genres, form }) => {
  const { bookDescriptionLimit, getFieldErrorMessage, errors } =
    useFormValidationContext();
  const { getPreview } = useCoverPreviewContext();

  let titleMessage: string | null = null;
  let isbnMessage: string | null = null;
  let genreMessage: string | null = null;
  let pagesMessage: string | null = null;
  let descriptionMessage: string | null = null;

  if (errors) {
    titleMessage = getFieldErrorMessage("title");
    isbnMessage = getFieldErrorMessage("isbn");
    genreMessage = getFieldErrorMessage("genre");
    pagesMessage = getFieldErrorMessage("numberOfPages");
    descriptionMessage = getFieldErrorMessage("description");
  }

  return (
    <>
      <ValidatedField errorMsg={titleMessage}>
        <Form.Item
          label="Book Title"
          name="title"
          rules={[{ required: true, message: "Please enter the book title!" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>
      </ValidatedField>
      <ValidatedField errorMsg={isbnMessage}>
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
          <FlexContainer gap={15}>
            <Input
              placeholder="Enter ISBN-10"
              onChange={(e) => {
                form.setFieldsValue({ isbn: e.target.value });
              }}
            />
            <Button
              type="dashed"
              onClick={() => getPreview(form.getFieldValue("isbn"))}
            >
              Cover preview
            </Button>
          </FlexContainer>
        </Form.Item>
      </ValidatedField>
      <CoverDisplayManager />
      <ValidatedField errorMsg={genreMessage}>
        <Form.Item
          label="Genre"
          name="genre"
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
      </ValidatedField>
      <ValidatedField errorMsg={pagesMessage}>
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
      </ValidatedField>
      <ValidatedField errorMsg={descriptionMessage}>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea
            placeholder="Enter book description"
            rows={4}
            showCount={{
              formatter: ({ count }) => `${count}/${bookDescriptionLimit}`,
            }}
            maxLength={bookDescriptionLimit}
          />
        </Form.Item>
      </ValidatedField>
    </>
  );
};
