import { socials } from "@/data/socials.ts";
import styles from "./Socials.module.scss";

export default function Socials() {
  return (
    <ul className={styles.socials} aria-label="Social links">
      {socials.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
            title={name}
          >
            <span className="sr-only">{name}</span>
            <Icon aria-hidden="true" className={styles.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
