import { useEffect, useRef, useState } from "react";
import styles from "./SectionNav.module.scss";

export interface NavSection {
  id: string;
  label: string;
}

// A section counts as "current" once its top scrolls above an imaginary line.
// The line moves with scroll progress: 160px from the top of the window when the
// page is at the top, sliding down to the window's bottom edge at the end.
//
// Why it moves: a fixed line can't work at both ends. Set it low and, in a tall
// window, Skills is already above it before you scroll, so About never shows.
// Set it high and Projects, near the end of the page, can never scroll up far
// enough to reach it, so it only highlights once you hit the very bottom.
const LINE_AT_TOP_PX = 160;

/**
 * Tracks the section the reader is looking at. Also returns `select`, for when a
 * nav link is clicked: the clicked section stays highlighted while the page scrolls
 * to it. Without that, clicking a section near the bottom (one the page can't scroll
 * up to the top of the screen) would highlight whichever section is last instead.
 */
// Takes the ids joined into one string ("about,skills,…") rather than an array:
// a string compares by value, so the effect below re-runs exactly when the list
// of sections changes, and never just because a new array was created.
function useActiveSection(idsKey: string) {
  // Starts null on the server and on the first browser render, so the prerendered
  // HTML and React's first render match. The real value arrives in the effect.
  const [active, setActive] = useState<string | null>(null);
  // True while a click-triggered scroll is running; scroll tracking pauses meanwhile.
  const locked = useRef(false);

  const select = (id: string) => {
    setActive(id);
    locked.current = true;
    const unlock = () => {
      locked.current = false;
      window.removeEventListener("scrollend", unlock);
      clearTimeout(fallback);
    };
    // `scrollend` fires when the smooth scroll stops. Some browsers lack it, and it
    // never fires if the page is already in place, so a timer unlocks as a backup.
    window.addEventListener("scrollend", unlock);
    const fallback = setTimeout(unlock, 1000);
  };

  useEffect(() => {
    const ids = idsKey.split(",");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (locked.current) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      // 0 at the top of the page, 1 at the bottom (0 if the page doesn't scroll).
      const progress =
        maxScroll > 0
          ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
          : 0;
      const line =
        LINE_AT_TOP_PX + (window.innerHeight - LINE_AT_TOP_PX) * progress;

      // The current section is the last one whose top is above the line.
      let current: string | null = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    // Scroll fires many times per frame; batch to at most one update per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  return { active, select };
}

export default function SectionNav({ sections }: { sections: NavSection[] }) {
  const { active, select } = useActiveSection(
    sections.map((s) => s.id).join(","),
  );

  return (
    <nav className={styles.nav} aria-label="On this page">
      <ul className={styles.list}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={styles.link}
              aria-current={active === id ? "location" : undefined}
              onClick={() => select(id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
