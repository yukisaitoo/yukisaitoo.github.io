import data from "@/data/socials.json";
import { socialSchema } from "@/lib/schemas.ts";
import Icon from "./Icon.tsx";
import styles from "./Socials.module.scss";

const socials = socialSchema.parse(data).socials;

export default function Socials() {
  return (
    <section className={styles.socials}>
      {socials.map((item) => (
        <div key={item.name}>
          <a
            href={item.href}
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
            title={item.name}
          >
            <span className="sr-only">{item.name}</span>
            <Icon name={item.icon} aria-hidden="true" className={styles.icon} />
          </a>
        </div>
      ))}
    </section>
  );
}
