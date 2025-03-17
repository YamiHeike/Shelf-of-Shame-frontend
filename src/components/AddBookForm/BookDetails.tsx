import { Form, Input, Select, Button, message, FormInstance } from "antd";
import { Genre } from "../../types";
import { FlexContainer } from "../ui";
import { HttpState } from "../../types/HttpState";

const { Option } = Select;

interface BookDetailsProps {
  genres: Genre[];
  coverUrl: HttpState<string>;
  onFetchCoverUrl: (isbn: string) => void;
  form: FormInstance<any>;
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  genres,
  coverUrl,
  onFetchCoverUrl,
  form,
}) => {
  return (
    <>
      <Form.Item
        label="Book Title"
        name="title"
        rules={[{ required: true, message: "Please enter the book title!" }]}
      >
        <Input placeholder="Enter book title" />
      </Form.Item>

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
              form.setFieldsValue({ isbn: e.target.value }); // Ensures the form updates
            }}
          />
          <Button
            type="dashed"
            onClick={() => {
              const isbn = form.getFieldValue("isbn"); // This will now return the correct value
              if (isbn) {
                onFetchCoverUrl(isbn);
              } else {
                message.warning("Please enter an ISBN first.");
              }
            }}
          >
            Cover preview
          </Button>
        </FlexContainer>
      </Form.Item>

      {coverUrl.data && (
        <Form.Item label="Book Cover">
          <img
            src={coverUrl.data}
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
    </>
  );
};
