import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Badge.module.scss";

export function Badge({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.badge, className)} {...props} />;
}
