import styles from "./Header.module.scss";
import ThemeMenu from "./ThemeMenu.tsx";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Nav links go here; the empty list keeps the theme menu right-aligned. */}
        <ul className={styles.links}></ul>
        <div className={styles.actions}>
          <ThemeMenu />
        </div>
      </nav>
    </header>
  );
}
