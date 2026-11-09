import { projects } from "@/data/projects.ts";
import type { Project } from "@/lib/types.ts";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./Projects.module.scss";

// Gap between the cursor and the preview card, in px.
const OFFSET = 24;

const isVideo = (src: string) => /\.(mp4|webm)$/.test(src);

function PreviewMedia({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const { preview, previewAspect } = project;
  if (!preview) return null;
  const common = {
    className: styles.media,
    "data-active": active,
    style: previewAspect ? { aspectRatio: previewAspect } : undefined,
  };
  return isVideo(preview) ? (
    // preload="auto" fetches it as soon as the media mounts, so it's ready by
    // the time the link is hovered. Muted + playsInline lets browsers play it
    // without a click.
    <video {...common} src={preview} muted loop playsInline preload="auto" />
  ) : (
    <img {...common} src={preview} alt="" decoding="async" />
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
  const follow = (e: PointerEvent) => {
    const card = cardRef.current;
    if (!card) return;
    // Not enough room on the right? Put the card on the cursor's left instead.
    const flip = e.clientX + OFFSET + card.offsetWidth > window.innerWidth;
    card.style.setProperty(
      "--x",
      `${flip ? e.clientX - OFFSET - card.offsetWidth : e.clientX + OFFSET}px`,
    );
    card.style.setProperty("--y", `${e.clientY}px`);
  };

  return (
    <>
      <ul
        className={styles.list}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setArmed(true);
        }}
      >
        {projects.map((project) => (
          <li key={project.href} className={styles.item}>
            <h3 className={styles.name}>
              {/* The preview follows the cursor only while it's over the link. */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse" || !project.preview) return;
                  follow(e);
                  setHovered(project.href);
                  setShown(project.href);
                }}
                onPointerMove={project.preview ? follow : undefined}
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
          projects.map((p) => (
            <PreviewMedia key={p.href} project={p} active={p.href === shown} />
          ))}
      </div>
    </>
  );
}
