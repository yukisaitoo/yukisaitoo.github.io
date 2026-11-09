import { site } from "@/data/site.ts";
import styles from "./Footer.module.scss";
import ThemeMenu from "./ThemeMenu.tsx";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        {site.name} ·{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
      </p>
      <ThemeMenu />
    </footer>
  );
}
