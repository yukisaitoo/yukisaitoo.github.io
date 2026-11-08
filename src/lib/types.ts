export const iconNames = ["github", "linkedin", "mail"] as const;
export type IconName = (typeof iconNames)[number];

export interface IconLink {
  name: string;
  href: string;
  icon: IconName;
}

export interface Skill {
  name: string;
  /** Where the skill gets used. Optional: a tile without one shows just the name. */
  description?: string;
  icon: string;
  iconBg: string;
}

export interface Experience {
  name: string;
  href?: string;
  title: string;
  logo: string;
  start: string;
  end?: string;
  location?: string;
  /** One or two plain sentences on what the time there was about. Not résumé bullets. */
  summary?: string;
  /** Tech used in the role, shown as one muted line under the bullets. */
  stack?: string[];
}

export interface Project {
  name: string;
  href: string;
  description: string;
  stack: string[];
  /** Set for forks of someone else's repo, so the page labels them honestly. */
  forkOf?: string;
  /**
   * Shown beside the cursor while hovering the project's link (desktop only).
   * Path under public/: an image, or an .mp4 that plays muted on a loop.
   */
  preview?: string;
  /** Width / height to crop the preview to, e.g. to trim black bars off a video. */
  previewAspect?: number;
}
