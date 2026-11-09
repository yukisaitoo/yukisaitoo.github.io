import { FileDown } from "@/components/icons";
import Projects from "@/components/Projects.tsx";
import SectionNav from "@/components/SectionNav.tsx";
import Skills from "@/components/Skills.tsx";
import Socials from "@/components/Socials.tsx";
import Timeline from "@/components/Timeline.tsx";
import { buttonClass } from "@/components/ui/buttonClass.ts";
import { career } from "@/data/career.ts";
import { site } from "@/data/site.ts";
import type { ReactNode } from "react";
import styles from "./Home.module.scss";

const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const currentRole = career[0];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <article className={styles.article}>
      <SectionNav sections={navSections} />
      <section id="about" className={styles.hero} aria-label="About">
        <div className={styles.header}>
          <div className={styles.identity}>
            <img
              className={styles.photo}
              src="/yuki.webp"
              alt={site.name}
              width={60}
              height={60}
              decoding="async"
              fetchPriority="high"
            />
            <div>
              <h1 className={styles.name}>{site.name}</h1>
              <p className={styles.role}>
                {currentRole.title} at {currentRole.name}
              </p>
            </div>
          </div>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Open to new roles
          </p>
        </div>

        <p className={styles.summary}>
          Currently building full-stack features for Epic’s 300M+ MyChart users.
        </p>

        <div className={styles.actions}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: "outline" })}
          >
            Resume
            <FileDown className={styles.resumeIcon} aria-hidden="true" />
          </a>
          <Socials />
        </div>
      </section>

      <Section id="skills" title="Skills">
        <Skills />
      </Section>

      <Section id="experience" title="Experience">
        <Timeline />
      </Section>

      <Section id="projects" title="Projects">
        <Projects />
      </Section>
    </article>
  );
}
