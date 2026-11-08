import { skills } from "@/data/skills.ts";
import styles from "./Skills.module.scss";

export default function Skills() {
  return (
    <ul className={styles.grid}>
      {skills.map((skill) => (
        <li className={styles.tile} key={skill.name}>
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
              alt=""
              width={40}
              height={40}
              decoding="async"
            />
          </div>
          {/* Flex column centered vertically, so a tile with no subtitle centers its name. */}
          <div className={styles.text}>
            <p className={styles.name}>{skill.name}</p>
            {skill.description && (
              <p className={styles.description}>{skill.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
