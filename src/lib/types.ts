import type { LucideIcon } from "lucide-react";

export interface IconLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  /** Where the skill gets used. Optional: a tile without one shows just the name. */
  description?: string;
  /** Path under public/, e.g. "/react.svg". */
  icon: string;
  /** Background behind the icon, for logos that need one to read well. */
  iconBg?: string;
}

export interface Experience {
  name: string;
  href?: string;
  title: string;
  logo: string;
  /** Year and month, "YYYY-MM". Shown as "Jul 2023". */
  start: string;
  /** Same format as start. Leave out for a current role ("Present"). */
  end?: string;
  location?: string;
  /** One or two plain sentences on what the time there was about. Not résumé bullets. */
  summary?: string;
  /** Tech used in the role, shown as one muted line under the summary. */
  stack?: string[];
}

export interface Project {
  name: string;
  href: string;
  description: string;
  stack: string[];
  /** Set for forks of someone else's repo, so the page labels them honestly. */
  forkOf?: string;
  /** Shown beside the cursor while hovering the project's link (desktop only). */
  preview?: Preview;
}

export interface Preview {
  /** Path under public/: an image, or an .mp4/.webm that plays muted on a loop. */
  src: string;
  /**
   * The file's size in pixels. Lets the card take its final shape before the file
   * has loaded, and lets Projects.tsx know the card's height when positioning it.
   */
  width: number;
  height: number;
  /** Width / height to crop to, e.g. to trim black bars off a video. Defaults to the file's own shape. */
  crop?: number;
}
