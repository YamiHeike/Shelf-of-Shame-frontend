import { Form, Input, Select } from "antd";
import { Status } from "../../types";
import { toProperCase } from "../../utils";

const { Option } = Select;

export const BookMetadata = () => {
  return (
    <>
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
        getValueFromEvent={(event) => Number(event.target.value) || undefined}
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
              {toProperCase(status)}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Notes" name="notes">
        <Input.TextArea placeholder="Enter any notes about the book" rows={4} />
      </Form.Item>
    </>
  );
};
