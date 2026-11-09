import {
  CheckIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useId, useSyncExternalStore } from "react";
import styles from "./ThemeMenu.module.scss";
import { Button } from "./ui/Button.tsx";

const modes = {
  light: { label: "Light", Icon: SunIcon },
  dark: { label: "Dark", Icon: MoonIcon },
  system: { label: "System", Icon: DesktopIcon },
} as const;

type Mode = keyof typeof modes;

// false while prerendering and during hydration, true once React runs in the browser.
// The saved theme only exists in the visitor's browser, so anything showing it must
// wait for this or the prerendered HTML and the first browser render would disagree.
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

// Uses the browser's Popover API: the `popover` element starts hidden, a button with
// `popoverTarget` opens it, and the browser handles Escape, clicking outside, and
// layering it above the page. No JavaScript library needed.
export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const menuId = useId();

  const current: Mode | null = hydrated
    ? theme && theme in modes
      ? (theme as Mode)
      : "system"
    : null;
  const CurrentIcon = current ? modes[current].Icon : null;
  // Used for both the tooltip and the screen-reader name. Keeping them identical
  // lets browsers drop the title as a duplicate instead of announcing it again.
  const label = current ? `Theme: ${modes[current].label}` : "Theme";

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        title={label}
        className={styles.trigger}
        popoverTarget={menuId}
      >
        {CurrentIcon && current ? (
          <CurrentIcon className={styles[current]} />
        ) : (
          <span className={styles.placeholder} />
        )}
        <span className="sr-only">{label}</span>
      </Button>

      {/* Sits right after the trigger in the DOM so Tab moves from the button into the menu. */}
      <div id={menuId} popover="auto" className={styles.menu}>
        {(Object.keys(modes) as Mode[]).map((mode) => {
          const { label, Icon } = modes[mode];
          return (
            <button
              key={mode}
              type="button"
              className={styles.item}
              aria-pressed={current === mode}
              popoverTarget={menuId}
              popoverTargetAction="hide"
              onClick={() => {
                setTheme(mode);
              }}
            >
              <Icon className={styles[mode]} />
              {label}
              {current === mode && <CheckIcon className={styles.check} />}
            </button>
          );
        })}
      </div>
    </>
  );
}
