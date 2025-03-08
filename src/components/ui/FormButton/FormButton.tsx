import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";

type FormButtonProps = {
  submitted: boolean;
  preSubmitText: string;
  postSubmitText?: string;
};

export const FormButton = ({
  submitted,
  preSubmitText,
  postSubmitText = "Loading",
}: FormButtonProps) => {
  return (
    <Button type="primary" htmlType="submit" block disabled={submitted}>
      {!submitted ? (
        preSubmitText
      ) : (
        <div>
          {postSubmitText}
          <LoadingOutlined style={{ marginLeft: "0.5em" }} />
        </div>
      )}
    </Button>
  );
};
