import Experience from "@/components/Experience.tsx";
import { FileDown } from "@/components/icons";
import Skills from "@/components/Skills.tsx";
import Socials from "@/components/Socials.tsx";
import { Button } from "@/components/ui/Button.tsx";
import WavingEmoji from "@/components/WavingEmoji.tsx";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <article className={styles.article}>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <h1 className={`title ${styles.heading}`}>
            hi yuki here <WavingEmoji emoji="👋" />
          </h1>
          <p className={styles.role}>Software Developer</p>
          <p className={styles.tagline}>
            I like to develop full-stack and explore local cafes.
          </p>
          <section className={styles.actions}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <span className={styles.resumeLabel}>Resume</span>
                <FileDown className={styles.resumeIcon} />
              </Button>
            </a>
            <Socials />
          </section>
        </div>
        <div className={styles.portrait}>
          <img
            className={styles.photo}
            src="/yuki.webp"
            alt="Yuki Saito"
            width={175}
            height={175}
            decoding="async"
            fetchPriority="high"
          />
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Available for work</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={`title ${styles.sectionTitle}`}>
          most used technologies
        </h2>
        <Skills />
      </section>

      <section className={styles.section}>
        <h2 className={`title ${styles.sectionTitle}`}>experience</h2>
        <Experience />
      </section>
    </article>
  );
}
