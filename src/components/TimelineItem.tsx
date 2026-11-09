import type { Experience } from "@/lib/types.ts";
import styles from "./TimelineItem.module.scss";

// "YYYY-MM" parses as UTC; format in UTC so it doesn't shift a month.
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const formatMonth = (iso: string) => monthFormat.format(new Date(iso));

export default function TimelineItem({
  experience,
}: {
  experience: Experience;
}) {
  const { name, href, title, logo, start, end, location, summary, stack } =
    experience;

  return (
    <li className={styles.item}>
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
          <p>{location}</p>
        </div>
      </div>

      <p className={styles.summary}>{summary}</p>

      <p className={styles.stack}>
        <span className="sr-only">Technologies: </span>
        {stack.join(" · ")}
      </p>
    </li>
  );
}
