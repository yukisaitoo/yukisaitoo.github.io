import { useEffect, useRef, useState } from "react";
import styles from "./SectionNav.module.scss";

export interface NavSection {
  id: string;
  label: string;
}

// A section counts as "current" once its top passes this far down the screen.
const ACTIVE_LINE = 0.35;

/**
 * Tracks the section the reader is looking at. Also returns `select`, for when a
 * nav link is clicked: the clicked section stays highlighted while the page scrolls
 * to it. Without that, clicking a section near the bottom (one the page can't scroll
 * up to the top of the screen) would highlight whichever section is last instead.
 */
function useActiveSection(ids: string[]) {
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
    let frame = 0;

    const update = () => {
      frame = 0;
      if (locked.current) return;
      const line = window.innerHeight * ACTIVE_LINE;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      // The last section is often too short to ever reach the line, so at the very
      // bottom of the page it wins outright.
      let current: string | null = atBottom ? ids[ids.length - 1] : null;
      if (!current) {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
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
  }, [ids]);

  return { active, select };
}

export default function SectionNav({ sections }: { sections: NavSection[] }) {
  const [ids] = useState(() => sections.map((s) => s.id));
  const { active, select } = useActiveSection(ids);

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
