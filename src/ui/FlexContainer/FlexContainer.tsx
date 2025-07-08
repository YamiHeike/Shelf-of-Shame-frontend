import styles from "./FlexContainer.module.scss";

type FlexContainerProps = {
  children: React.ReactNode;
  gap?: number;
};

export const FlexContainer = ({ children, gap }: FlexContainerProps) => {
  return (
    <div
      className={styles.flexContainer}
      style={{
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};
