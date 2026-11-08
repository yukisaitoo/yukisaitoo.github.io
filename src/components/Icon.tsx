import type { LucideProps } from "lucide-react";
import type { IconName } from "@/lib/schemas.ts";
import { Github, Linkedin, Mail } from "./icons";

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} satisfies Record<IconName, unknown>;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name];
  return <LucideIcon {...props} />;
}
