import {
  CheckIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useId, useSyncExternalStore } from "react";
import styles from "./ThemeMenu.module.scss";
import { buttonClass } from "./ui/buttonClass.ts";

const modes = {
  light: { label: "Light", Icon: SunIcon },
  dark: { label: "Dark", Icon: MoonIcon },
  system: { label: "System", Icon: DesktopIcon },
} as const;

type Mode = keyof typeof modes;

const modeList = Object.keys(modes) as Mode[];

const toMode = (theme?: string): Mode =>
  theme && theme in modes ? (theme as Mode) : "system";

// False until hydrated; the saved theme only exists client-side.
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function ModeIcon({ mode }: { mode: Mode }) {
  const { Icon } = modes[mode];
  return <Icon className={styles[mode]} />;
}

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const menuId = useId();

  const current = hydrated ? toMode(theme) : null;
  const label = current ? `Theme: ${modes[current].label}` : "Theme";

  return (
    <>
      <button
        type="button"
        title={label}
        className={buttonClass(
          { variant: "ghost", size: "icon" },
          styles.trigger,
        )}
        popoverTarget={menuId}
      >
        {current ? (
          <ModeIcon mode={current} />
        ) : (
          <span className={styles.placeholder} />
        )}
        <span className="sr-only">{label}</span>
      </button>

      <div id={menuId} popover="auto" className={styles.menu}>
        {modeList.map((mode) => (
          <button
            key={mode}
            type="button"
            className={styles.item}
            aria-pressed={current === mode}
            popoverTarget={menuId}
            popoverTargetAction="hide"
            onClick={() => setTheme(mode)}
          >
            <ModeIcon mode={mode} />
            {modes[mode].label}
            {current === mode && <CheckIcon className={styles.check} />}
          </button>
        ))}
      </div>
    </>
  );
}
