"use client";

import { useRef, useEffect } from "react";
import { VirtualPath, getContextCompletions } from "../lib/filesystem";
import { ThemeId, getPromptSegments } from "../lib/themes";
import { OutputSegment } from "../lib/commands";

interface Props {
  inputValue: string;
  currentPath: VirtualPath;
  theme: ThemeId;
  disabled: boolean;
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onClear: () => void;
}

const colorClass: Record<NonNullable<OutputSegment["color"]>, string> = {
  green: "text-term-green",
  cyan: "text-term-cyan",
  yellow: "text-term-yellow",
  red: "text-term-red",
  dim: "text-term-dim",
  white: "text-term-white",
};

function PromptLabel({ theme, path }: { theme: ThemeId; path: VirtualPath }) {
  const segments = getPromptSegments(theme, path);
  return (
    <span className="shrink-0 select-none mr-1 text-sm font-mono">
      {segments.map((seg, i) => (
        <span key={i} className={seg.color ? colorClass[seg.color] : "text-term-white"}>
          {seg.text}
        </span>
      ))}
    </span>
  );
}

export default function TerminalInput({
  inputValue,
  currentPath,
  theme,
  disabled,
  onSubmit,
  onChange,
  onHistoryUp,
  onHistoryDown,
  onClear,
}: Props) {
  interface CycleState {
    list: string[];
    index: number;
    commandPrefix: string;
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const cycleRef = useRef<CycleState | null>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      cycleRef.current = null;
      onSubmit(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      cycleRef.current = null;
      onHistoryUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cycleRef.current = null;
      onHistoryDown();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (cycleRef.current === null) {
        const spaceIdx = inputValue.indexOf(" ");
        const commandPrefix = spaceIdx === -1 ? "" : inputValue.slice(0, spaceIdx + 1);
        const list = getContextCompletions(inputValue, currentPath);
        if (list.length === 0) return;
        if (list.length === 1) {
          onChange(commandPrefix + list[0]);
          return;
        }
        cycleRef.current = { list, index: 0, commandPrefix };
        onChange(commandPrefix + list[0]);
      } else {
        const { list, commandPrefix } = cycleRef.current;
        const nextIndex = (cycleRef.current.index + 1) % list.length;
        cycleRef.current.index = nextIndex;
        onChange(commandPrefix + list[nextIndex]);
      }
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      cycleRef.current = null;
      onSubmit("^C");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onClear();
    }
  }

  if (disabled) return null;

  return (
    <div className="flex items-start px-4 py-2 font-mono text-sm shrink-0">
      <PromptLabel theme={theme} path={currentPath} />
      <div className="relative flex-1 min-w-0">
        {/* Invisible real input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => { cycleRef.current = null; onChange(e.target.value); }}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full bg-transparent border-none outline-none cursor-default"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="terminal input"
        />
        {/* Visible mirror + blinking cursor */}
        <span className={`text-term-white whitespace-pre-wrap break-all ${!inputValue ? "cursor" : ""}`}>
          {inputValue}
          {inputValue && <span className="cursor" />}
        </span>
      </div>
    </div>
  );
}
