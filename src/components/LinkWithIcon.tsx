import type { ReactNode } from "react";
import { Link } from "react-router";
import styles from "./LinkWithIcon.module.scss";

type LinkWithIconProps = {
  href: string;
  icon?: ReactNode;
  position: "left" | "right";
  text?: string;
};

export default function LinkWithIcon({
  href,
  icon,
  position,
  text,
}: LinkWithIconProps) {
  return (
    <Link to={href} className={`link ${styles.link}`}>
      {position === "left" && icon}
      <span>{text}</span>
      {position === "right" && icon}
    </Link>
  );
}
