import type { Experience } from "@/lib/schemas.ts";
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
          {experience.map((exp, id) => (
            <TimelineItem key={id} experience={exp} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
