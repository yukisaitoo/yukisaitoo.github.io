import { Outlet } from "react-router";
import Footer from "./Footer.tsx";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
