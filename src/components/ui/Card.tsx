import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Card.module.scss";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.card, className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.content, className)} {...props} />;
}
