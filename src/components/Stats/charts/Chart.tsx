import styles from "./Chart.module.scss";

type ChartProps = {
  children: React.ReactNode;
};

export const Chart = ({ children }: ChartProps) => {
  return <div className={styles.chartWrapper}>{children}</div>;
};
