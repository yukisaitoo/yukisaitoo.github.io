import type { Experience } from "@/lib/types.ts";
import styles from "./Timeline.module.scss";
import TimelineItem from "./TimelineItem.tsx";

interface Props {
  experience: Experience[];
}

export default function Timeline({ experience }: Props) {
  return (
    <ul className={styles.list}>
      {experience.map((exp) => (
        <TimelineItem key={`${exp.name}-${exp.start}`} experience={exp} />
      ))}
    </ul>
  );
}
