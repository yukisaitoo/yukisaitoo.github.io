import LinkWithIcon from "@/components/LinkWithIcon.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <section className={styles.section}>
            <p className={`title ${styles.code}`}>404</p>
            <div className={styles.body}>
              <div className={styles.message}>
                <h1 className={`title ${styles.heading}`}>page not found...</h1>
                <p className={styles.hint}>Maybe I renamed or deleted it.</p>
              </div>
              <div className={styles.actions}>
                <LinkWithIcon
                  href="/"
                  text="back to home"
                  icon={<ArrowLeftIcon className={styles.icon} />}
                  position="left"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
