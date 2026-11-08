import { z } from "zod";

export const iconNames = ["github", "linkedin", "mail"] as const;
export type IconName = (typeof iconNames)[number];

const iconLink = z.object({
  name: z.string(),
  href: z.string(),
  icon: z.enum(iconNames),
});
export type IconLink = z.infer<typeof iconLink>;

const skill = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  iconBg: z.string(),
});
export type Skill = z.infer<typeof skill>;

const experience = z.object({
  name: z.string(),
  href: z.string().optional(),
  title: z.string(),
  logo: z.string(),
  start: z.string(),
  end: z.string().optional(),
  description: z.array(z.string()).optional(),
  links: z.array(iconLink).optional(),
});
export type Experience = z.infer<typeof experience>;

export const careerSchema = z.object({ career: z.array(experience) });
export const educationSchema = z.object({ education: z.array(experience) });
export const socialSchema = z.object({ socials: z.array(iconLink) });
export const skillSchema = z.object({ skills: z.array(skill) });
