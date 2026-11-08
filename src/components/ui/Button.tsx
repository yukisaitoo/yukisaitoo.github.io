import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Button.module.scss";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "icon";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className,
      )}
      {...props}
    />
  );
}
