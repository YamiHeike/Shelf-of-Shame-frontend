import styles from "./FlexContainer.module.scss";

type CenteredContainerProps = {
  children: React.ReactNode;
};

export const CenteredContainer = ({ children }: CenteredContainerProps) => {
  return <div className={styles.flexContainer}>{children}</div>;
};
