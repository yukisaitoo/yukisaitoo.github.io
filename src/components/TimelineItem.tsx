import type { Experience } from "@/lib/types.ts";
import Icon from "./Icon.tsx";
import styles from "./TimelineItem.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar.tsx";
import { Badge } from "./ui/Badge.tsx";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, title, logo, start, end, description, links } =
    experience;

  const avatar = (
    <Avatar className={styles.avatar}>
      <AvatarImage src={logo} alt={name} className={styles.avatarImage} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );

  return (
    <li className={styles.item}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}
        >
          {avatar}
        </a>
      ) : (
        <div className={styles.logo}>{avatar}</div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.name}>{name}</h2>
            {title && <p className={styles.title}>{title}</p>}
          </div>
          {start && (
            <time className={styles.dates}>
              <span>{start}</span>
              <span>{" - "}</span>
              <span>{end ? end : "Present"}</span>
            </time>
          )}
        </div>

        {description?.map((desc) => (
          <div key={desc} className={styles.description}>
            {desc}
          </div>
        ))}
      </div>
      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              <Badge title={link.name} className={styles.badge}>
                <Icon
                  name={link.icon}
                  aria-hidden="true"
                  className={styles.badgeIcon}
                />
                {link.name}
              </Badge>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
