import { projects } from "@/data/projects.ts";
import type { Preview } from "@/lib/types.ts";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./Projects.module.scss";

// Gap between the cursor and the preview card, in px.
const OFFSET = 24;
// Smallest gap kept between the card and the window's edges, in px.
const EDGE = 8;

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
    // Sized from the data, so the card has its final shape even before the file
    // loads (otherwise an unloaded image is 0px tall and the card a thin sliver).
    style: { aspectRatio: aspectOf(preview) },
  };
  return isVideo(preview.src) ? (
    // preload="auto" fetches it as soon as the media mounts, so it's ready by
    // the time the link is hovered. Muted + playsInline lets browsers play it
    // without a click.
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
  // The media only mounts once a mouse first enters the list, so phones never
  // download the previews. The card itself is always there, so the very first
  // hover can already position it.
  const [armed, setArmed] = useState(false);
  // href of the project whose link is hovered right now, or null.
  const [hovered, setHovered] = useState<string | null>(null);
  // href of the last project hovered. Unlike `hovered`, it isn't cleared when the
  // pointer leaves, so the card fades out with its media still inside instead of
  // collapsing to an empty box first.
  const [shown, setShown] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Play the hovered project's video from the start; pause every other one, and
  // pause everything while the card fades out.
  // Visitors who asked their OS for less motion see the first frame, still.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const video of card.querySelectorAll("video")) {
      if (hovered !== null && video.dataset.active === "true" && !calm) {
        video.currentTime = 0;
        // play() can be refused (e.g. power-saving modes); the first frame stays.
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [hovered]);

  // Moves the card with the cursor by writing CSS variables straight onto the
  // element. No React state, so moving the mouse doesn't re-render anything.
  const follow = (e: PointerEvent, preview: Preview) => {
    const card = cardRef.current;
    if (!card) return;
    // The card's height once this preview is showing, worked out from the data.
    // Measuring offsetHeight would be wrong on the first pointerenter, because
    // the card still holds the previous preview (or nothing) at that moment.
    const border = card.offsetWidth - card.clientWidth;
    const height = card.clientWidth / aspectOf(preview) + border;
    // To the right of the cursor, kept inside the window. (The card is hidden in
    // windows too narrow for it to fit beside the links; see the stylesheet.)
    const x = Math.max(
      EDGE,
      Math.min(e.clientX + OFFSET, window.innerWidth - card.offsetWidth - EDGE),
    );
    // Centered on the cursor, kept inside the window. If the window is shorter
    // than the card, the top edge wins.
    const y = Math.max(
      EDGE,
      Math.min(e.clientY - height / 2, window.innerHeight - height - EDGE),
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
        {projects.map(({ preview, ...project }) => (
          <li key={project.href} className={styles.item}>
            <h3 className={styles.name}>
              {/* The preview follows the cursor only while it's over the link. */}
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
                onPointerMove={preview ? (e) => follow(e, preview) : undefined}
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
        ))}
      </ul>

      {/* Decorative: the text above already describes each project. */}
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
