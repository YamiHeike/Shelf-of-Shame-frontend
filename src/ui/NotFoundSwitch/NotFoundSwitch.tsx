import { Form, Switch, SwitchProps } from "antd";

type NotFoundSwitchProps = {
  label: string;
  value: boolean;
  onToggle: (checked: boolean) => void;
} & SwitchProps;

export const NotFoundSwitch = ({
  onToggle,
  label,
  value,
  ...rest
}: NotFoundSwitchProps) => {
  return (
    <Form.Item label={label}>
      <Switch
        onChange={(checked) => onToggle(checked)}
        checked={value}
        {...rest}
      />
    </Form.Item>
  );
};
