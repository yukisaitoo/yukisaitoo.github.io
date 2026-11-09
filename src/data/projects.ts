import type { Project } from "@/lib/types.ts";

export const projects: Project[] = [
  {
    name: "Plan View for Claude Code",
    href: "https://github.com/yukisaitoo/claude-code-plan-view",
    preview: { src: "/previews/plan-view.webp", width: 720, height: 395 },
    description:
      "A Claude Code plugin that shows plan-mode plans in a live side pane.",
    stack: ["TypeScript", "Claude Code plugin API"],
  },
  {
    name: "Obsidian Editing Toolbar",
    href: "https://github.com/yukisaitoo/obsidian-editing-toolbar",
    preview: { src: "/previews/editing-toolbar.webp", width: 720, height: 280 },
    forkOf: "cumany/obsidian-editing-toolbar",
    description:
      "An Obsidian plugin that adds a Microsoft Word-like quick-action toolbar above the editor. I rebuilt it, cutting 84% of the code and fixing a ton of bugs along the way.",
    stack: ["TypeScript", "Vitest", "Obsidian API"],
  },
  {
    name: "InstantSpaceSwitcher",
    href: "https://github.com/yukisaitoo/InstantSpaceSwitcher",
    preview: {
      // Demo from the upstream README.
      src: "/previews/instant-space-switcher.mp4",
      width: 960,
      height: 540,
      // Trims the black side bars.
      crop: 1.55,
    },
    forkOf: "jurplel/InstantSpaceSwitcher",
    description:
      "A macOS utility that switches desktops instantly and skips the default slide animation. I trimmed it down and fixed a few bugs for macOS 27.",
    stack: ["Swift", "Claude Code"],
  },
];
