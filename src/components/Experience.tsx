import { career } from "@/data/career.ts";
import { education } from "@/data/education.ts";
import styles from "./Experience.module.scss";
import Timeline from "./Timeline.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs.tsx";

export default function Experience() {
  return (
    <Tabs defaultValue="work">
      <TabsList className={styles.tabsList}>
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={career} />
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education} />
      </TabsContent>
    </Tabs>
  );
}
