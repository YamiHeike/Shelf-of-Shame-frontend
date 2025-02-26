import { Alert } from "antd";

type FormAlertProps = {
  errorMsg: string;
};

export const FormAlert = ({ errorMsg }: FormAlertProps) => {
  return (
    <Alert
      message={errorMsg}
      type="error"
      style={{
        marginBottom: 24,
      }}
    />
  );
};
