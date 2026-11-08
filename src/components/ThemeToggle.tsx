import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import styles from "./ThemeToggle.module.scss";
import { Button } from "./ui/Button.tsx";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className={styles.sun} />
      ) : (
        <MoonIcon className={styles.moon} />
      )}
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
