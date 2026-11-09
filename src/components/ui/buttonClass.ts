import clsx from "clsx";
import styles from "./Button.module.scss";

interface Options {
  variant: "outline" | "ghost";
  size?: "default" | "icon";
}

export function buttonClass(
  { variant, size = "default" }: Options,
  className?: string,
) {
  return clsx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  );
}
