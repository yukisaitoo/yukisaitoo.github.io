import careerData from "@/data/career.json";
import educationData from "@/data/education.json";
import { careerSchema, educationSchema } from "@/lib/schemas.ts";
import styles from "./Experience.module.scss";
import Timeline from "./Timeline.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs.tsx";

const career = careerSchema.parse(careerData).career;
const education = educationSchema.parse(educationData).education;

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
