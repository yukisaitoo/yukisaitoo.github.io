import { career } from "@/data/career.ts";
import styles from "./Timeline.module.scss";
import TimelineItem from "./TimelineItem.tsx";

export default function Timeline() {
  return (
    <ul className={styles.list}>
      {career.map((exp) => (
        <TimelineItem key={`${exp.name}-${exp.start}`} experience={exp} />
      ))}
    </ul>
  );
}
