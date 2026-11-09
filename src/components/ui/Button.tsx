import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Button.module.scss";

type Variant = "outline" | "ghost";
type Size = "default" | "icon";

export interface ButtonProps extends ComponentProps<"button"> {
  variant: Variant;
  size?: Size;
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const classes = clsx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  );
  // With asChild the child element (e.g. an <a>) renders instead, and `type`
  // means something else there, so only default it on a real <button>.
  return asChild ? (
    <Slot className={classes} {...props} />
  ) : (
    <button type="button" className={classes} {...props} />
  );
}
