import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { NavMenu } from "./NavMenu";

export const Layout = () => {
  return (
    <main className={styles.appContainer}>
      <NavMenu />
      <Outlet />
    </main>
  );
};
