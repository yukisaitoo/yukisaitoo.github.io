import type { Project } from "@/lib/types.ts";

// From the resume vault's projects/ notes. Forks carry `forkOf` so they're labeled as forks.
export const projects: Project[] = [
  {
    name: "Plan View for Claude Code",
    href: "https://github.com/yukisaitoo/claude-code-plan-view",
    preview: "/previews/plan-view.webp",
    description:
      "A Claude Code plugin that shows plan-mode plans in a live side pane.",
    stack: ["TypeScript", "Claude Code plugin API"],
  },
  {
    name: "Obsidian Editing Toolbar",
    href: "https://github.com/yukisaitoo/obsidian-editing-toolbar",
    preview: "/previews/editing-toolbar.webp",
    forkOf: "cumany/obsidian-editing-toolbar",
    description:
      "An Obsidian plugin that adds a Microsoft Word-like quick-action toolbar above the editor. I rebuilt it, cutting 84% of the code and fixing a ton of bugs along the way.",
    stack: ["TypeScript", "Vitest", "Obsidian API"],
  },
  {
    name: "InstantSpaceSwitcher",
    href: "https://github.com/yukisaitoo/InstantSpaceSwitcher",
    // Demo recording from the upstream README (jurplel's), re-encoded to 960x540.
    preview: "/previews/instant-space-switcher.mp4",
    // The recording is 16:10 inside a 16:9 frame; this crops off the black side bars.
    previewAspect: 1.55,
    forkOf: "jurplel/InstantSpaceSwitcher",
    description:
      "A macOS utility that switches desktops instantly and skips the default slide animation. I trimmed it down and fixed a few bugs for macOS 27.",
    stack: ["Swift", "Claude Code"],
  },
];
