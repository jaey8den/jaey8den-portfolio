import { experiences } from "../data/experience";
import { projects } from "../data/projects";
import { archives } from "../data/archives";
import { listDir, resolvePath, psPath, VirtualPath, ThemeId } from "./filesystem";

export interface OutputSegment {
  text: string;
  color?: "green" | "cyan" | "yellow" | "red" | "dim" | "white";
  rawColor?: string;
  href?: string;
  bold?: boolean;
}

export interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  segments: OutputSegment[];
}

export interface TerminalState {
  currentPath: VirtualPath;
  theme: ThemeId;
}

export interface CommandResult {
  lines: OutputLine[];
  newPath?: VirtualPath;
  clear?: boolean;
}

function line(segments: OutputSegment[], type: OutputLine["type"] = "output"): OutputLine {
  return { id: crypto.randomUUID(), type, segments };
}

function text(t: string, color?: OutputSegment["color"], bold?: boolean): OutputSegment {
  return { text: t, color, bold };
}

function link(label: string, href: string, color: OutputSegment["color"] = "cyan"): OutputSegment {
  return { text: label, color, href };
}

function blank(): OutputLine {
  return line([text("")]);
}

const BANNER = `  ██╗     ██╗███╗   ███╗     ██╗██╗ █████╗     ██╗     ███████╗
  ██║     ██║████╗ ████║     ██║██║██╔══██╗    ██║     ██╔════╝
  ██║     ██║██╔████╔██║     ██║██║███████║    ██║     █████╗
  ██║     ██║██║╚██╔╝██║██   ██║██║██╔══██║    ██║     ██╔══╝
  ███████╗██║██║ ╚═╝ ██║╚█████╔╝██║██║  ██║    ███████╗███████╗
  ╚══════╝╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝╚═╝  ╚═╝    ╚══════╝╚══════╝`;

// Theme-specific command names for display and errors
const CMD_NAMES: Record<ThemeId, { ls: string; cat: string; pwd: string; clear: string; echo: string; cd: string }> = {
  bash:       { ls: "ls",             cat: "cat",         pwd: "pwd",          clear: "clear",      echo: "echo",         cd: "cd"           },
  powershell: { ls: "Get-ChildItem",  cat: "Get-Content", pwd: "Get-Location", clear: "Clear-Host", echo: "Write-Output", cd: "Set-Location" },
  cmd:        { ls: "dir",            cat: "type",        pwd: "cd",           clear: "cls",        echo: "echo",         cd: "cd"           },
};

function cmdHelp(theme: ThemeId): CommandResult {
  const n = CMD_NAMES[theme];
  const isPsh = theme === "powershell";
  const isCmd = theme === "cmd";

  const rows: Array<[string, string]> = [
    ["whoami",                         "print bio and intro"],
    [`${n.cat} experience.md`,         "list all work experience"],
    [`${n.cat} experience/<slug>`,      "view a single experience entry"],
    [`${n.ls} projects/`,              "list current projects"],
    [`${n.cat} projects/<slug>`,        "view a project"],
    [`${n.ls} archives/`,              "list archived projects"],
    [`${n.cat} archives/<slug>`,        "view an archived project"],
    ["contact",                        "show contact information"],
    [`${n.cd} <dir>`,                  "navigate (projects, archives, ~)"],
    [n.ls,                             "list current directory"],
    [isCmd ? "cd" : n.pwd,             isCmd ? "print current directory (no args)" : "print working directory"],
    [n.clear,                          "clear the terminal"],
    ["banner",                         "print the ASCII banner"],
    [`${n.echo} <text>`,               "echo text back"],
  ];

  // Derive column width from the longest command in this theme's list
  const col = Math.max(...rows.map(([cmd]) => cmd.length)) + 3;

  const slugNote = [
    blank(),
    line([text("  experience slugs: st-clair, transcentech, envision", "dim")]),
    line([text("  project slugs:    cdsm, cdg, bbb", "dim")]),
    line([text("  archive slugs:    website, victoria-chorale, ock, jne, jio", "dim")]),
    blank(),
  ];

  const aliasNote = isPsh
    ? [line([text("  aliases: gci=Get-ChildItem  gc=Get-Content  gl=Get-Location  sl=Set-Location", "dim")]), blank()]
    : [];

  return {
    lines: [
      blank(),
      line([text("Available commands:", "green", true)]),
      blank(),
      ...rows.map(([cmd, desc]) =>
        line([text(`  ${cmd.padEnd(col)}`, "cyan"), text(desc)])
      ),
      ...aliasNote,
      ...slugNote,
    ],
  };
}

function cmdWhoami(): CommandResult {
  return {
    lines: [
      blank(),
      line([text("Lim Jia Le", "green", true)]),
      line([text("Full Stack Developer", "cyan")]),
      blank(),
      line([text("I specialise in building web applications or services to solve real-world problems.")]),
      line([text("My main stacks are Next.js, .Net and Python, along with SQL Server and PostgreSQL for databases.")]),
      blank(),
      line([text("I have a strong interest in AI/ML as it is the logical next step to evolve as a Full Stack Developer.")]),
      line([text("I am keen to take on an entry level role in the field to gain practical experience beyond personal projects.")]),
      blank(),
    ],
  };
}

function cmdCatExperience(slug?: string): CommandResult {
  if (!slug) {
    const lines: OutputLine[] = [blank()];
    for (const exp of experiences) {
      lines.push(line([text(`[${exp.date}]`, "dim"), text("  "), text(exp.role, "green", true), text(` @ ${exp.company}`, "white")]));
      for (const point of exp.points) {
        lines.push(line([text(`  • ${point}`)]));
      }
      lines.push(line([text("  skills: ", "dim"), text(exp.skills, "yellow")]));
      lines.push(blank());
    }
    return { lines };
  }

  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) {
    return {
      lines: [
        line([text(`No such file: experience/${slug}.md`, "red")]),
        line([text(`Valid slugs: ${experiences.map((e) => e.slug).join(", ")}`, "dim")]),
      ],
    };
  }

  return {
    lines: [
      blank(),
      line([text(exp.role, "green", true), text(` @ ${exp.company}`, "white")]),
      line([text(exp.date, "dim")]),
      blank(),
      ...exp.points.map((p) => line([text(`  • ${p}`)])),
      blank(),
      line([text("skills: ", "dim"), text(exp.skills, "yellow")]),
      blank(),
    ],
  };
}

function cmdLsProjects(): CommandResult {
  return {
    lines: [blank(), line(projects.map((p) => text(`${p.slug}.md  `, "cyan"))), blank()],
  };
}

function cmdCatProject(slug: string): CommandResult {
  const proj = projects.find((p) => p.slug === slug);
  if (!proj) {
    return {
      lines: [
        line([text(`No such file: projects/${slug}.md`, "red")]),
        line([text(`Valid slugs: ${projects.map((p) => p.slug).join(", ")}`, "dim")]),
      ],
    };
  }

  const lines: OutputLine[] = [blank(), line([text(proj.title, "green", true)])];
  if (proj.link) lines.push(line([text("  link: ", "dim"), link(proj.link[1], proj.link[0])]));
  lines.push(blank());
  for (const point of proj.points) lines.push(line([text(`  • ${point}`)]));
  lines.push(blank());
  lines.push(line([text("skills: ", "dim"), text(proj.skills.join(", "), "yellow")]));
  lines.push(blank());
  lines.push(line([text("background:", "dim")]));
  for (const detail of proj.details) { lines.push(line([text(`  ${detail}`)])); lines.push(blank()); }
  if (proj.screenshots.length > 0) {
    lines.push(line([text("screenshots:", "dim")]));
    for (const src of proj.screenshots) lines.push(line([text(`  ${src}  `, "dim"), link("[open ↗]", src)]));
    lines.push(blank());
  }
  return { lines };
}

function cmdLsArchives(): CommandResult {
  return {
    lines: [blank(), line(archives.map((a) => text(`${a.slug}.md  `, "cyan"))), blank()],
  };
}

function cmdCatArchive(slug: string): CommandResult {
  const arch = archives.find((a) => a.slug === slug);
  if (!arch) {
    return {
      lines: [
        line([text(`No such file: archives/${slug}.md`, "red")]),
        line([text(`Valid slugs: ${archives.map((a) => a.slug).join(", ")}`, "dim")]),
      ],
    };
  }

  return {
    lines: [
      blank(),
      line([text(arch.title, "green", true)]),
      blank(),
      line([text(arch.description)]),
      blank(),
      line([text("skills: ", "dim"), text(arch.skills, "yellow")]),
      blank(),
      line([text("screenshots:", "dim")]),
      ...arch.screenshots.map((src) => line([text(`  ${src}  `, "dim"), link("[open ↗]", src)])),
      blank(),
    ],
  };
}

function cmdLs(currentPath: VirtualPath): CommandResult {
  const items = listDir(currentPath);
  return {
    lines: [blank(), line(items.map((item) => text(`${item}  `, item.endsWith("/") ? "cyan" : "white"))), blank()],
  };
}

function cmdCd(args: string, currentPath: VirtualPath): CommandResult {
  const target = args.trim();
  const newPath = resolvePath(currentPath, target);
  if (!newPath) {
    return { lines: [line([text(`cd: ${target}: No such directory`, "red")])] };
  }
  const items = listDir(newPath);
  return {
    lines: [blank(), line(items.map((item) => text(`${item}  `, item.endsWith("/") ? "cyan" : "white"))), blank()],
    newPath,
  };
}

function cmdContact(): CommandResult {
  return {
    lines: [
      blank(),
      line([text("Get in Touch", "green", true)]),
      blank(),
      line([text("  phone:    ", "dim"), text("+65 8511 9939")]),
      line([text("  email:    ", "dim"), link("lim.jia.le51@gmail.com", "mailto:lim.jia.le51@gmail.com")]),
      line([text("  linkedin: ", "dim"), link("linkedin.com/in/lim-jia-le/", "https://linkedin.com/in/lim-jia-le/")]),
      line([text("  github:   ", "dim"), link("github.com/jaey8den", "https://github.com/jaey8den")]),
      line([text("  resume:   ", "dim"), link("LimJiaLe-Resume.pdf [download]", "/LimJiaLe-Resume.pdf")]),
      blank(),
    ],
  };
}

function cmdBanner(): CommandResult {
  return {
    lines: [blank(), ...BANNER.split("\n").map((l) => line([text(l, "green")])), blank()],
  };
}

function cmdClear(): CommandResult {
  return { lines: [], clear: true };
}

function cmdPwd(currentPath: VirtualPath, theme: ThemeId): CommandResult {
  const display = theme === "bash"
    ? currentPath.replace("~", "/home/visitor")
    : psPath(currentPath);
  return { lines: [line([text(display, "cyan")])] };
}

function cmdEcho(args: string): CommandResult {
  return { lines: [line([text(args)])] };
}

function cmdExit(): CommandResult {
  return {
    lines: [blank(), line([text("You can't leave. This is my portfolio.", "yellow")]), blank()],
  };
}

function cmdSudo(args: string): CommandResult {
  return { lines: [line([text(`sudo: ${args}: permission denied — nice try.`, "red")])] };
}

function cmdNotFound(cmd: string, theme: ThemeId): CommandResult {
  const msg =
    theme === "powershell"
      ? `'${cmd}' : The term '${cmd}' is not recognized as a cmdlet. Type 'help' for available commands.`
      : theme === "cmd"
      ? `'${cmd}' is not recognized as an internal or external command. Type 'help' for available commands.`
      : `bash: ${cmd}: command not found. Type 'help' for available commands.`;
  return { lines: [line([text(msg, "red")])] };
}

// Shared cat-argument parser used by both `cat` and its aliases
function resolveCatArgs(args: string, currentPath: VirtualPath): CommandResult {
  const catTarget = args.trim().replace(/\.md$/, "");
  if (catTarget === "experience") return cmdCatExperience();
  if (catTarget === "contact") return cmdContact();
  if (catTarget.startsWith("experience/")) return cmdCatExperience(catTarget.replace("experience/", ""));
  if (catTarget.startsWith("projects/")) return cmdCatProject(catTarget.replace("projects/", ""));
  if (catTarget.startsWith("archives/")) return cmdCatArchive(catTarget.replace("archives/", ""));
  if (currentPath === "~/projects") return cmdCatProject(catTarget);
  if (currentPath === "~/archives") return cmdCatArchive(catTarget);
  return {
    lines: [
      line([text(`No such file: ${args}`, "red")]),
      line([text("Try: cat experience.md, cat projects/cdsm.md, cat archives/jio.md", "dim")]),
    ],
  };
}

// Shared ls-argument parser used by `ls`, `dir`, `Get-ChildItem`
function resolveLsArgs(args: string, currentPath: VirtualPath): CommandResult {
  const target = args.trim().replace(/\/$/, "");
  if (!target || target === ".") return cmdLs(currentPath);
  if (target === "projects" || target === "~/projects") return cmdLsProjects();
  if (target === "archives" || target === "~/archives") return cmdLsArchives();
  return cmdLs(currentPath);
}

export function executeCommand(input: string, state: TerminalState): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [cmd, ...argParts] = trimmed.split(/\s+/);
  const args = argParts.join(" ");
  const cmdLower = cmd.toLowerCase();

  switch (cmdLower) {
    // ── Universal ──────────────────────────────────────────────
    case "help":
    case "?":
      return cmdHelp(state.theme);

    case "whoami":
    case "about":
      return cmdWhoami();

    case "banner":
      return cmdBanner();

    case "contact":
      return cmdContact();

    case "exit":
      return cmdExit();

    case "sudo":
      return cmdSudo(args);

    case "open": {
      if (!args.trim()) return { lines: [line([text("open: missing argument", "red")])] };
      if (typeof window !== "undefined") window.open(args.trim(), "_blank", "noopener,noreferrer");
      return { lines: [line([text(`Opening ${args.trim()}...`, "dim")])] };
    }

    // ── List directory ─────────────────────────────────────────
    // bash: ls | ps: Get-ChildItem / gci / dir | cmd: dir
    case "ls":
    case "dir":
    case "get-childitem":
    case "gci":
      return resolveLsArgs(args, state.currentPath);

    // ── Read file ──────────────────────────────────────────────
    // bash: cat | ps: Get-Content / gc | cmd: type
    case "cat":
    case "type":
    case "get-content":
    case "gc":
      return resolveCatArgs(args, state.currentPath);

    // ── Navigate ───────────────────────────────────────────────
    // bash/ps/cmd: cd | ps: Set-Location / sl
    case "cd":
    case "set-location":
    case "sl": {
      // CMD: `cd` with no args prints cwd instead of going home
      if (!args.trim() && state.theme === "cmd") return cmdPwd(state.currentPath, state.theme);
      if (!args.trim()) return cmdCd("~", state.currentPath);
      return cmdCd(args, state.currentPath);
    }

    // ── Working directory ──────────────────────────────────────
    // bash: pwd | ps: Get-Location / gl | cmd: (handled above via cd)
    case "pwd":
    case "get-location":
    case "gl":
      return cmdPwd(state.currentPath, state.theme);

    // ── Clear ──────────────────────────────────────────────────
    // bash: clear | ps: Clear-Host | cmd: cls
    case "clear":
    case "cls":
    case "clear-host":
      return cmdClear();

    // ── Echo ───────────────────────────────────────────────────
    // bash/cmd: echo | ps: Write-Output / wo
    case "echo":
    case "write-output":
    case "wo":
      return cmdEcho(args);

    // ── Not found ──────────────────────────────────────────────
    default:
      return cmdNotFound(cmd, state.theme);
  }
}
