export const iconNames = ["github", "linkedin", "mail"] as const;
export type IconName = (typeof iconNames)[number];

export interface IconLink {
  name: string;
  href: string;
  icon: IconName;
}

export interface Skill {
  name: string;
  description: string;
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
  description?: string[];
  links?: IconLink[];
}
