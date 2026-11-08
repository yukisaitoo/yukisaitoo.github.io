import type { Experience } from "@/lib/types.ts";
import styles from "./Timeline.module.scss";
import TimelineItem from "./TimelineItem.tsx";
import { Card, CardContent } from "./ui/Card.tsx";

interface Props {
  experience: Experience[];
}

export default function Timeline({ experience }: Props) {
  return (
    <Card>
      <CardContent className={styles.content}>
        <ul className={styles.list}>
          {experience.map((exp) => (
            <TimelineItem key={`${exp.name}-${exp.start}`} experience={exp} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
