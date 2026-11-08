import { skills } from "@/data/skills.ts";
import styles from "./Skills.module.scss";

export default function Skills() {
  return (
    <div className={styles.grid}>
      {skills.map((skill) => (
        <div className={styles.tile} key={skill.name}>
          <div
            className={styles.iconBox}
            style={{
              backgroundColor: skill.iconBg,
              padding: skill.iconBg ? "0.25rem" : "",
            }}
          >
            <img
              className={styles.icon}
              src={`/${skill.icon}`}
              alt={skill.name}
              width={40}
              height={40}
              decoding="async"
            />
          </div>
          <div className={styles.text}>
            <p className={styles.name}>{skill.name}</p>
            <p className={styles.description}>{skill.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
