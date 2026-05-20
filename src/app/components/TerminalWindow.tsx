"use client";

import { ReactNode } from "react";
import { ThemeId, THEMES } from "../lib/themes";

interface Props {
  children: ReactNode;
  theme: ThemeId;
  onThemeChange: (t: ThemeId) => void;
  onDesktopMode: () => void;
  onFocusInput?: () => void;
}

const THEME_ORDER: ThemeId[] = ["bash", "powershell", "cmd"];

export default function TerminalWindow({ children, theme, onThemeChange, onDesktopMode, onFocusInput }: Props) {
  const config = THEMES[theme];

  const titleBar = (
    <div className="flex items-center justify-between px-3 py-1.5 bg-term-surface border-b border-term-border shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-2">
        {config.titleStyle === "macos" ? (
          <>
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-term-dim font-mono text-xs select-none">
              {config.titleLabel}
            </span>
          </>
        ) : (
          <>
            <span className="text-term-cyan text-xs select-none">❯_</span>
            <span className="text-term-white font-mono text-xs select-none">
              {config.titleLabel}
            </span>
          </>
        )}
      </div>

      {/* Right side: theme switcher + window controls */}
      <div className="flex items-center gap-3">
        {/* Theme switcher + desktop mode button */}
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {THEME_ORDER.map((tid) => (
            <button
              key={tid}
              onClick={() => onThemeChange(tid)}
              className={`text-[10px] font-mono px-2 py-0.5 border transition-colors ${
                tid === theme
                  ? "border-term-cyan text-term-cyan"
                  : "border-term-border text-term-dim hover:text-term-white hover:border-term-green"
              }`}
            >
              {THEMES[tid].name}
            </button>
          ))}
          <button
            onClick={onDesktopMode}
            className="text-[10px] font-mono px-2 py-0.5 border border-term-border text-term-dim hover:text-term-white hover:border-term-green transition-colors"
          >
            gui
          </button>
        </div>

        {/* Decorative window controls (windows style only) */}
        {config.titleStyle === "windows" && (
          <div className="flex items-center gap-2 text-term-dim font-mono text-xs select-none">
            <span className="hover:text-term-white cursor-default">─</span>
            <span className="hover:text-term-white cursor-default">□</span>
            <span className="hover:text-term-red cursor-default">✕</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#1a1f2e] p-4"
      onClick={onFocusInput}
    >
      {/* Floating terminal window */}
      <div
        data-theme={theme}
        className="w-full max-w-5xl flex flex-col overflow-hidden border border-term-border"
        style={{
          height: "85vh",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(30, 77, 158, 0.3)",
        }}
      >
        {titleBar}

        {/* Terminal body */}
        <div className="flex flex-col flex-1 overflow-hidden bg-term-bg">
          {children}
        </div>
      </div>
    </div>
  );
}
