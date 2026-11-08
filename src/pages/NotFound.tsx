import LinkWithIcon from "@/components/LinkWithIcon.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <article className={styles.article}>
      <p className={styles.code}>404</p>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.hint}>It may have been renamed or removed.</p>
      <div className={styles.actions}>
        <LinkWithIcon
          href="/"
          text="Back to home"
          icon={<ArrowLeftIcon className={styles.icon} />}
          position="left"
        />
      </div>
    </article>
  );
}
