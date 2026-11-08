import { Outlet } from "react-router";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
