export type ThemeId = "bash" | "powershell" | "cmd";

export type VirtualPath = "~" | "~/projects" | "~/archives";

interface FSNode {
  type: "dir" | "file";
  children?: string[];
}

export const virtualFS: Record<VirtualPath, FSNode> = {
  "~": {
    type: "dir",
    children: ["experience.md", "projects/", "archives/", "contact.md"],
  },
  "~/projects": {
    type: "dir",
    children: ["cdsm.md", "cdg.md", "bbb.md"],
  },
  "~/archives": {
    type: "dir",
    children: [
      "website.md",
      "victoria-chorale.md",
      "ock.md",
      "jne.md",
      "jio.md",
    ],
  },
};

export function listDir(path: VirtualPath): string[] {
  return virtualFS[path]?.children ?? [];
}

export function resolvePath(current: VirtualPath, input: string): VirtualPath | null {
  const normalized = input.replace(/\/$/, "");
  if (normalized === "~" || normalized === "" || normalized === "..") {
    return "~";
  }
  if (normalized === "projects" || normalized === "~/projects") return "~/projects";
  if (normalized === "archives" || normalized === "~/archives") return "~/archives";
  if (normalized === ".." && current !== "~") return "~";
  return null;
}

// All completable tokens for tab completion
export const ALL_COMMANDS = [
  "help",
  "whoami",
  "about",
  "cat",
  "ls",
  "cd",
  "pwd",
  "clear",
  "cls",
  "banner",
  "contact",
  "echo",
  "open",
  "exit",
  "sudo",
];

export function psPath(virtual: VirtualPath): string {
  if (virtual === "~") return "C:\\portfolio";
  return virtual.replace("~", "C:\\portfolio").replace(/\//g, "\\");
}

export const ALL_PATHS = [
  "experience.md",
  "projects/",
  "archives/",
  "contact.md",
  "projects/cdsm.md",
  "projects/cdg.md",
  "projects/bbb.md",
  "archives/website.md",
  "archives/victoria-chorale.md",
  "archives/ock.md",
  "archives/jne.md",
  "archives/jio.md",
  "experience/st-clair.md",
  "experience/transcentech.md",
  "experience/envision.md",
];
