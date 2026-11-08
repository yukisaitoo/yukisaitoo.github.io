import styles from "./Footer.module.scss";
import Socials from "./Socials.tsx";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Socials />
    </footer>
  );
}
