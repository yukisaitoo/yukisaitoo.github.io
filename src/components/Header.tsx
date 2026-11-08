import styles from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle.tsx";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Nav links go here; the empty list keeps the toggle right-aligned. */}
        <ul className={styles.links}></ul>
        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
