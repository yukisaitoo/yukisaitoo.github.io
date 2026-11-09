import { Github, Linkedin, Mail } from "@/components/icons";
import type { IconLink } from "@/lib/types.ts";
import { site } from "./site.ts";

export const socials: IconLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yuki-saito/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/yukisaitoo",
    icon: Github,
  },
  {
    name: "Email",
    href: `mailto:${site.email}`,
    icon: Mail,
  },
];
