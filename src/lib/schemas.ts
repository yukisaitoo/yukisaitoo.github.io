import dynamicIconImports from "lucide-react/dynamicIconImports";
import { z } from "zod";

const iconLink = z.object({
  name: z.string(),
  href: z.string().url(),
  icon: z.custom<keyof typeof dynamicIconImports>(),
});
export type IconLink = z.infer<typeof iconLink>;

const skill = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  iconBg: z.string(),
});
export type Skill = z.infer<typeof skill>;

const project = z.object({
  name: z.string(),
  description: z.string(),
  href: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export const projectSchema = z.object({ projects: z.array(project) });
export type Project = z.infer<typeof project>;

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
