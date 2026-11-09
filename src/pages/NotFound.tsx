import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <article className={styles.article}>
      <p className={styles.code}>404</p>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.hint}>It may have been renamed or removed.</p>
      <div className={styles.actions}>
        <Link to="/" className={`link ${styles.back}`}>
          <ArrowLeftIcon className={styles.icon} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </article>
  );
}
