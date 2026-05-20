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

const CD_COMMANDS  = new Set(["cd", "set-location", "sl"]);
const CAT_COMMANDS = new Set(["cat", "type", "get-content"]);
const LS_COMMANDS  = new Set(["ls", "dir", "get-childitem"]);

export function getContextCompletions(input: string, currentPath: VirtualPath): string[] {
  const spaceIdx = input.indexOf(" ");

  if (spaceIdx === -1) {
    return [];
  }

  const command = input.slice(0, spaceIdx).toLowerCase();
  const argPrefix = input.slice(spaceIdx + 1);
  const entries = listDir(currentPath);

  let candidates: string[];
  if (CD_COMMANDS.has(command)) {
    candidates = entries.filter((e) => e.endsWith("/"));
  } else if (CAT_COMMANDS.has(command) || LS_COMMANDS.has(command)) {
    candidates = entries;
  } else {
    return [];
  }

  return candidates.filter((e) => e.startsWith(argPrefix)).sort();
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
