import type { Experience } from "@/lib/types.ts";
import styles from "./TimelineItem.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar.tsx";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, title, logo, start, end, location, summary, stack } =
    experience;

  const avatar = (
    <Avatar className={styles.avatar}>
      <AvatarImage src={logo} alt="" className={styles.avatarImage} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );

  return (
    <li className={styles.item}>
      {/* The company name is the link; the logo is decoration, so screen readers skip it. */}
      <div className={styles.logo} aria-hidden="true">
        {avatar}
      </div>
      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.meta}>
          <p>
            <time>{start}</time> – <time>{end ?? "Present"}</time>
          </p>
          {location && <p>{location}</p>}
        </div>
      </div>

      {summary && <p className={styles.summary}>{summary}</p>}

      {stack && stack.length > 0 && (
        <p className={styles.stack}>
          <span className="sr-only">Technologies: </span>
          {stack.join(" · ")}
        </p>
      )}
    </li>
  );
}
