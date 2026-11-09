import { useEffect, useRef, useState } from "react";
import styles from "./SectionNav.module.scss";

export interface NavSection {
  id: string;
  label: string;
}

// A section becomes "current" once its top scrolls up past a line this far below
// the top of the window.
const LINE_PX = 160;

interface Measured {
  id: string;
  /** Distance from the top of the page to the section's top, in px. */
  top: number;
  /** Where a nav click scrolls the page to: `top` minus its scroll-margin-top. */
  scrollTo: number;
}

/**
 * Picks the current section for scroll position `y`.
 *
 * Each section switches on when its top reaches the line, or at the halfway point
 * between the previous section's click spot and the bottom of the page, whichever
 * comes first. The second rule exists because sections near the end of the page
 * may never reach the line (the page runs out of scroll), or only reach it right
 * at the bottom. Using the halfway point keeps two promises:
 * - The previous section still wins at its own click spot, so clicking it in the
 *   nav and then scrolling a pixel doesn't jump the highlight to the next one.
 * - The last section lights up before the very bottom wherever the page allows.
 */
function pickActive(sections: Measured[], y: number, maxScroll: number) {
  let current = sections[0]?.id ?? null;
  sections.forEach((section, i) => {
    let switchAt = section.top - LINE_PX;
    // A page too short to scroll keeps the plain line rule (About stays current).
    if (i > 0 && maxScroll > 0) {
      const prevSpot = Math.min(sections[i - 1].scrollTo, maxScroll);
      switchAt = Math.min(switchAt, (prevSpot + maxScroll) / 2);
    }
    // 1px of slack: scroll positions can be fractional at the very bottom.
    if (y >= switchAt - 1) current = section.id;
  });
  return current;
}

/**
 * Tracks the section the reader is looking at. Also returns `select`, for when a
 * nav link is clicked: the clicked section stays highlighted while the page scrolls
 * to it, so the highlight doesn't flicker through the sections in between. It also
 * covers a section whose click spot is past the bottom of the page: the page stops
 * short and the last section would otherwise win.
 *
 * `sections` should keep the same identity between renders (e.g. a module-level
 * constant), since the scroll listeners re-attach whenever it changes.
 */
function useActiveSection(sections: readonly NavSection[]) {
  // Starts null on the server and on the first browser render, so the prerendered
  // HTML and React's first render match. The real value arrives in the effect.
  const [active, setActive] = useState<string | null>(null);
  // True while a click-triggered scroll is running; scroll tracking pauses meanwhile.
  const locked = useRef(false);
  // Ends the current click's lock early. Only one lock exists at a time, so a
  // second click can't be cut short by the first click's leftover timer.
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
    // `scrollend` fires when the smooth scroll stops. Some browsers lack it, and it
    // never fires if the page is already in place, so a timer unlocks as a backup.
    window.addEventListener("scrollend", unlock);
    const fallback = setTimeout(unlock, 1000);
    releaseLock.current = unlock;
  };

  useEffect(() => {
    const ids = sections.map((s) => s.id);
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
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        measured.push({ id, top, scrollTo: Math.max(top - margin, 0) });
      }
      setActive(pickActive(measured, y, maxScroll));
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
                // Cmd/Ctrl/Shift/Alt-click opens a tab or window instead of
                // scrolling this page, so the highlight shouldn't move.
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
