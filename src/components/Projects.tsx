import { projects } from "@/data/projects.ts";
import type { Preview } from "@/lib/types.ts";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./Projects.module.scss";

const CURSOR_GAP = 24;
const EDGE_GAP = 8;

const isVideo = (src: string) => /\.(mp4|webm)$/.test(src);
const aspectOf = (p: Preview) => p.crop ?? p.width / p.height;

function PreviewMedia({
  preview,
  active,
}: {
  preview: Preview;
  active: boolean;
}) {
  const common = {
    className: styles.media,
    "data-active": active,
    style: { aspectRatio: aspectOf(preview) },
  };
  return isVideo(preview.src) ? (
    <video
      {...common}
      src={preview.src}
      muted
      loop
      playsInline
      preload="auto"
    />
  ) : (
    <img {...common} src={preview.src} alt="" decoding="async" />
  );
}

export default function Projects() {
  // Media mounts on the first mouse hover, so touch devices never download it.
  const [armed, setArmed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // Not cleared on leave, so the card fades out with its media still in it.
  const [shown, setShown] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const video of card.querySelectorAll("video")) {
      if (hovered !== null && video.dataset.active === "true" && !calm) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [hovered]);

  // Writes CSS vars directly so pointer moves don't re-render.
  const follow = (e: PointerEvent, preview: Preview) => {
    const card = cardRef.current;
    if (!card) return;
    // From the data, not offsetHeight: on enter the card still holds the old preview.
    const border = card.offsetWidth - card.clientWidth;
    const height = card.clientWidth / aspectOf(preview) + border;
    const x = Math.max(
      EDGE_GAP,
      Math.min(
        e.clientX + CURSOR_GAP,
        window.innerWidth - card.offsetWidth - EDGE_GAP,
      ),
    );
    const y = Math.max(
      EDGE_GAP,
      Math.min(e.clientY - height / 2, window.innerHeight - height - EDGE_GAP),
    );
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <>
      <ul
        className={styles.list}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setArmed(true);
        }}
      >
        {projects.map((project) => {
          const { preview } = project;
          return (
            <li key={project.href} className={styles.item}>
              <h3 className={styles.name}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse" || !preview) return;
                    follow(e, preview);
                    setHovered(project.href);
                    setShown(project.href);
                  }}
                  onPointerMove={preview && ((e) => follow(e, preview))}
                  onPointerLeave={() => setHovered(null)}
                >
                  {project.name}
                  <ArrowTopRightIcon
                    className={styles.arrow}
                    aria-hidden="true"
                  />
                </a>
              </h3>
              {project.forkOf && (
                <p className={styles.fork}>Fork of {project.forkOf}</p>
              )}
              <p className={styles.description}>{project.description}</p>
              <p className={styles.stack}>
                <span className="sr-only">Technologies: </span>
                {project.stack.join(" · ")}
              </p>
            </li>
          );
        })}
      </ul>

      <div
        ref={cardRef}
        className={styles.preview}
        data-visible={hovered !== null}
        aria-hidden="true"
      >
        {armed &&
          projects.map(
            (p) =>
              p.preview && (
                <PreviewMedia
                  key={p.href}
                  preview={p.preview}
                  active={p.href === shown}
                />
              ),
          )}
      </div>
    </>
  );
}
