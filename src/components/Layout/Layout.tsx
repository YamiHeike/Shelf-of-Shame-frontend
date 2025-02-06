import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <main className={styles.appContainer}>
      <nav>Layout to be made</nav>
      <Outlet />
    </main>
  );
};
