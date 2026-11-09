import type { Experience } from "@/lib/types.ts";
import styles from "./TimelineItem.module.scss";

// "2023-07" -> "Jul 2023". A bare "YYYY-MM" string parses as UTC midnight, so
// format in UTC too; otherwise visitors west of UTC would see the previous month.
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (iso: string) => monthFormat.format(new Date(iso));

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, title, logo, start, end, location, summary, stack } =
    experience;

  return (
    <li className={styles.item}>
      {/* The company name is the link; the logo is decoration, so screen readers skip it. */}
      <div className={styles.logo}>
        <img
          className={styles.logoImage}
          src={logo}
          alt=""
          width={40}
          height={40}
          decoding="async"
        />
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
            <time dateTime={start}>{formatMonth(start)}</time> –{" "}
            {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
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
