import { Button, Tooltip, Grid } from "antd";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type TooltipNavButtonProps = {
  to: string;
  title: string;
  Icon: React.ReactNode;
} & ComponentProps<typeof Button>;

export const TooltipNavButton = ({
  to,
  title,
  Icon,
  ...rest
}: TooltipNavButtonProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Tooltip title={title}>
      <Link to={to}>
        <Button type="default" icon={Icon} {...rest}>
          {screens.md ? null : title}
        </Button>
      </Link>
    </Tooltip>
  );
};
