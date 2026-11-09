import { useEffect, useRef, useState } from "react";
import styles from "./SectionNav.module.scss";

export interface NavSection {
  id: string;
  label: string;
}

// A section is current once its top passes this far below the viewport top.
const LINE_PX = 160;

interface Measured {
  id: string;
  top: number;
  /** top minus scroll-margin-top: where a nav click lands. */
  scrollTo: number;
}

// Sections near the bottom may never reach the line, so each also switches on
// halfway between the previous section's click spot and the max scroll.
function pickActive(sections: Measured[], y: number, maxScroll: number) {
  let current = sections[0]?.id ?? null;
  for (let i = 0; i < sections.length; i++) {
    let switchAt = sections[i].top - LINE_PX;
    if (i > 0 && maxScroll > 0) {
      const prevSpot = Math.min(sections[i - 1].scrollTo, maxScroll);
      switchAt = Math.min(switchAt, (prevSpot + maxScroll) / 2);
    }
    // 1px slack for fractional scroll positions.
    if (y >= switchAt - 1) current = sections[i].id;
  }
  return current;
}

// `select` pins the clicked section while the page scrolls to it, so the
// highlight doesn't flicker through the ones in between.
function useActiveSection(sections: readonly NavSection[]) {
  // null until the effect runs, to match the prerendered HTML.
  const [active, setActive] = useState<string | null>(null);
  const locked = useRef(false);
  const releaseLock = useRef<(() => void) | null>(null);

  const select = (id: string) => {
    releaseLock.current?.();
    setActive(id);
    locked.current = true;
    const unlock = () => {
      locked.current = false;
      window.removeEventListener("scrollend", unlock);
      clearTimeout(fallback);
      releaseLock.current = null;
    };
    window.addEventListener("scrollend", unlock);
    // scrollend isn't universal, and never fires if the page doesn't move.
    const fallback = setTimeout(unlock, 1000);
    releaseLock.current = unlock;
  };

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (locked.current) return;
      const y = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const measured: Measured[] = [];
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        measured.push({ id, top, scrollTo: Math.max(top - margin, 0) });
      }
      setActive(pickActive(measured, y, maxScroll));
    };

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
      releaseLock.current?.();
    };
  }, [sections]);

  return { active, select };
}

export default function SectionNav({
  sections,
}: {
  sections: readonly NavSection[];
}) {
  const { active, select } = useActiveSection(sections);

  return (
    <nav className={styles.nav} aria-label="On this page">
      <ul className={styles.list}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={styles.link}
              aria-current={active === id ? "location" : undefined}
              onClick={(e) => {
                // Modified clicks open a new tab; leave the highlight alone.
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                select(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
