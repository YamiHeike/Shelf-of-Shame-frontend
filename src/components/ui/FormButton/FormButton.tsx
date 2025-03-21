import { LoadingOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

type FormButtonProps = {
  submitted: boolean;
  preSubmitText: string;
  postSubmitText?: string;
  block?: boolean;
} & ButtonProps;

export const FormButton = ({
  submitted,
  preSubmitText,
  postSubmitText = "Loading",
  ...rest
}: FormButtonProps) => {
  return (
    <Button type="primary" htmlType="submit" disabled={submitted} {...rest}>
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
