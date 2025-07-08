import styles from "./RotatingLogo.module.scss";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

type RotatingLogoProps = {
  Icon: React.ElementType;
} & AntdIconProps;

export const RotatingLogo = ({ Icon, ...rest }: RotatingLogoProps) => {
  return <Icon className={styles.logo} {...rest} />;
};
