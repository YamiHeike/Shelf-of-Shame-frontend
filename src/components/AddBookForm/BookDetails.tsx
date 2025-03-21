import { Form, Input, Select, Button, message, FormInstance, Spin } from "antd";
import { Genre } from "../../types";
import { FlexContainer } from "../ui";
import { HttpState } from "../../types/HttpState";
import { LoadingOutlined } from "@ant-design/icons";
import defaultCover from "../../assets/default_cover.png";

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
              form.setFieldsValue({ isbn: e.target.value });
            }}
          />
          <Button
            type="dashed"
            onClick={() => onFetchCoverUrl(form.getFieldValue("isbn"))}
          >
            Cover preview
          </Button>
        </FlexContainer>
      </Form.Item>

      {coverUrl.loading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          style={{
            marginBottom: "10px",
          }}
        />
      ) : (
        coverUrl.data && (
          <Form.Item>
            <img
              src={coverUrl.data}
              alt="Book Cover"
              style={{ maxWidth: "100px" }}
            />
            {coverUrl.data === defaultCover && <p>Cover not found</p>}
          </Form.Item>
        )
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
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter a description!" }]}
      >
        <Input.TextArea placeholder="Enter book description" rows={4} />
      </Form.Item>
    </>
  );
};
