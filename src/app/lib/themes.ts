import { ThemeId, VirtualPath, psPath } from "./filesystem";
import { OutputSegment } from "./commands";

export type { ThemeId };

export interface BootLine {
  text: string;
  color: string;
  small?: boolean;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  titleStyle: "macos" | "windows";
  titleLabel: string;
  bootLines: BootLine[];
  scanlines: boolean;
}

const ASCII_BANNER_LINES = [
  "  ██╗     ██╗███╗   ███╗     ██╗██╗ █████╗     ██╗     ███████╗",
  "  ██║     ██║████╗ ████║     ██║██║██╔══██╗    ██║     ██╔════╝",
  "  ██║     ██║██╔████╔██║     ██║██║███████║    ██║     █████╗  ",
  "  ██║     ██║██║╚██╔╝██║██   ██║██║██╔══██║    ██║     ██╔══╝  ",
  "  ███████╗██║██║ ╚═╝ ██║╚█████╔╝██║██║  ██║    ███████╗███████╗",
  "  ╚══════╝╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝╚═╝  ╚═╝    ╚══════╝╚══════╝",
];

function bannerLines(color: string): BootLine[] {
  return ASCII_BANNER_LINES.map((text) => ({ text, color, small: true }));
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  bash: {
    id: "bash",
    name: "bash",
    titleStyle: "macos",
    titleLabel: "visitor@limjiale.com — bash",
    scanlines: true,
    bootLines: [
      { text: "limjiale.com [kernel] v1.0.0", color: "#00b32c" },
      {
        text: "Copyright (c) 2026 Lim Jia Le. All rights reserved.",
        color: "#555555",
      },
      { text: "", color: "" },
      { text: "Mounting filesystem...  [ OK ]", color: "#00b32c" },
      { text: "Loading portfolio data... [ OK ]", color: "#00b32c" },
      { text: "Initialising shell...   [ OK ]", color: "#00b32c" },
      { text: "", color: "" },
      ...bannerLines("#00ff41"),
      { text: "", color: "" },
      { text: "Type 'help' to see available commands.", color: "#555555" },
      { text: "", color: "" },
    ],
  },

  powershell: {
    id: "powershell",
    name: "ps",
    titleStyle: "windows",
    titleLabel: "Windows PowerShell",
    scanlines: false,
    bootLines: [
      { text: "Windows PowerShell", color: "#eeedf0" },
      {
        text: "Copyright (C) Microsoft Corporation. All rights reserved.",
        color: "#8899aa",
      },
      { text: "", color: "" },
      {
        text: "Try the new cross-platform PowerShell https://aka.ms/pscore6",
        color: "#8899aa",
      },
      { text: "", color: "" },
      { text: "Loading module: JiaLePortfolio v1.0.0...", color: "#8899aa" },
      { text: "Import-Module : Initialised successfully.", color: "#00e5ff" },
      { text: "", color: "" },
      ...bannerLines("#b9d3ee"),
      { text: "", color: "" },
      { text: "Type 'help' to see available commands.", color: "#8899aa" },
      { text: "", color: "" },
    ],
  },

  cmd: {
    id: "cmd",
    name: "cmd",
    titleStyle: "windows",
    titleLabel: "C:\\Windows\\system32\\cmd.exe",
    scanlines: false,
    bootLines: [
      { text: "Microsoft Windows [Version 10.0.19045.5854]", color: "#c0c0c0" },
      {
        text: "(c) Microsoft Corporation. All rights reserved.",
        color: "#666666",
      },
      { text: "", color: "" },
      ...bannerLines("#c0c0c0"),
      { text: "", color: "" },
      { text: "Type 'help' to see available commands.", color: "#666666" },
      { text: "", color: "" },
    ],
  },
};

export const DEFAULT_THEME: ThemeId = "powershell";

// Prompt segments for each theme — used in TerminalInput and echo lines
export function getPromptSegments(
  themeId: ThemeId,
  path: VirtualPath,
): OutputSegment[] {
  switch (themeId) {
    case "bash":
      return [
        { text: "visitor", color: "green" },
        { text: "@limjiale.com", color: "dim" },
        { text: ":", color: "white" },
        { text: path, color: "cyan" },
        { text: "$ ", color: "white" },
      ];
    case "powershell":
      return [
        { text: "PS ", color: "yellow" },
        { text: psPath(path), color: "cyan" },
        { text: "> ", color: "white" },
      ];
    case "cmd":
      return [
        { text: psPath(path), color: "white" },
        { text: "> ", color: "white" },
      ];
  }
}
