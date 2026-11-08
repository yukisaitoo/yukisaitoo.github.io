import * as AvatarPrimitive from "@radix-ui/react-avatar";
import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Avatar.module.scss";

export function Avatar({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root className={clsx(styles.root, className)} {...props} />
  );
}

export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={clsx(styles.image, className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={clsx(styles.fallback, className)}
      {...props}
    />
  );
}
