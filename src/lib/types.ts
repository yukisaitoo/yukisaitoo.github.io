import type { ComponentType } from "react";
import type { IconProps } from "@/components/icons";

export interface IconLink {
  name: string;
  href: string;
  icon: ComponentType<IconProps>;
}

export interface Skill {
  name: string;
  description?: string;
  icon: string;
  iconBg?: string;
}

export interface Experience {
  name: string;
  href?: string;
  title: string;
  logo: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or omit for a current role. */
  end?: string;
  location: string;
  summary: string;
  stack: string[];
}

export interface Project {
  name: string;
  href: string;
  description: string;
  stack: string[];
  forkOf?: string;
  preview?: Preview;
}

export interface Preview {
  /** Image, or .mp4/.webm (plays muted on loop). */
  src: string;
  width: number;
  height: number;
  /** Aspect ratio to crop to. Defaults to width / height. */
  crop?: number;
}
