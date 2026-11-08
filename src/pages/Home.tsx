import { FileDown } from "@/components/icons";
import Projects from "@/components/Projects.tsx";
import SectionNav, { type NavSection } from "@/components/SectionNav.tsx";
import Skills from "@/components/Skills.tsx";
import Socials from "@/components/Socials.tsx";
import Timeline from "@/components/Timeline.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { career } from "@/data/career.ts";
import type { ReactNode } from "react";
import styles from "./Home.module.scss";

// One list drives both the side nav and the section ids, so they can't drift apart.
const sections = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const satisfies readonly NavSection[];

// The side nav also links to the intro at the top, which isn't a <Section>.
const navSections: NavSection[] = [
  { id: "about", label: "About" },
  ...sections,
];

type SectionId = (typeof sections)[number]["id"];

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const { label } = sections.find((s) => s.id === id)!;
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>
        {label}
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
              alt="Yuki Saito"
              width={60}
              height={60}
              decoding="async"
              fetchPriority="high"
            />
            <div>
              <h1 className={styles.name}>Yuki Saito</h1>
              <p className={styles.role}>Software Developer at Epic Systems</p>
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
          <Button variant="outline" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
              <FileDown className={styles.resumeIcon} aria-hidden="true" />
            </a>
          </Button>
          <Socials />
        </div>
      </section>

      <Section id="skills">
        <Skills />
      </Section>

      <Section id="experience">
        <Timeline experience={career} />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>
    </article>
  );
}
