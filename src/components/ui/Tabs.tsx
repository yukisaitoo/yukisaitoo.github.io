import * as TabsPrimitive from "@radix-ui/react-tabs";
import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Tabs.module.scss";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List className={clsx(styles.list, className)} {...props} />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={clsx(styles.trigger, className)}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={clsx(styles.content, className)}
      {...props}
    />
  );
}
