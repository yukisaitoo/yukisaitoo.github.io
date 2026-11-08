import styles from "./Footer.module.scss";
import ThemeMenu from "./ThemeMenu.tsx";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Yuki Saito ·{" "}
        <a href="mailto:saitoyukisaito@gmail.com" className="link">
          saitoyukisaito@gmail.com
        </a>
      </p>
      <ThemeMenu />
    </footer>
  );
}
