"use client";

import { useReducer, useCallback } from "react";
import { OutputLine, executeCommand } from "../lib/commands";
import { useTypewriter } from "../lib/useTypewriter";
import { VirtualPath } from "../lib/filesystem";
import { ThemeId, DEFAULT_THEME, THEMES, getPromptSegments } from "../lib/themes";
import TerminalWindow from "./TerminalWindow";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import BootSequence from "./BootSequence";
import QuickBar from "./QuickBar";
import DesktopView from "./DesktopView";

interface TerminalState {
  currentPath: VirtualPath;
  inputValue: string;
  commandHistory: string[];
  historyIndex: number;
  isBooting: boolean;
  theme: ThemeId;
  viewMode: "terminal" | "desktop";
}

type Action =
  | { type: "BOOT_COMPLETE" }
  | { type: "SET_INPUT"; value: string }
  | { type: "SUBMIT"; input: string }
  | { type: "HISTORY_UP" }
  | { type: "HISTORY_DOWN" }
  | { type: "SET_PATH"; path: VirtualPath }
  | { type: "CLEAR_INPUT" }
  | { type: "SET_THEME"; theme: ThemeId }
  | { type: "SET_VIEW_MODE"; mode: "terminal" | "desktop" };

function reducer(state: TerminalState, action: Action): TerminalState {
  switch (action.type) {
    case "BOOT_COMPLETE":
      return { ...state, isBooting: false };

    case "SET_INPUT":
      return { ...state, inputValue: action.value, historyIndex: -1 };

    case "SUBMIT":
      if (!action.input.trim()) return { ...state, inputValue: "" };
      return {
        ...state,
        inputValue: "",
        historyIndex: -1,
        commandHistory:
          action.input === "^C"
            ? state.commandHistory
            : [action.input, ...state.commandHistory],
      };

    case "HISTORY_UP": {
      const nextIndex = Math.min(
        state.historyIndex + 1,
        state.commandHistory.length - 1
      );
      return {
        ...state,
        historyIndex: nextIndex,
        inputValue: state.commandHistory[nextIndex] ?? "",
      };
    }

    case "HISTORY_DOWN": {
      const nextIndex = Math.max(state.historyIndex - 1, -1);
      return {
        ...state,
        historyIndex: nextIndex,
        inputValue:
          nextIndex === -1 ? "" : (state.commandHistory[nextIndex] ?? ""),
      };
    }

    case "SET_PATH":
      return { ...state, currentPath: action.path };

    case "CLEAR_INPUT":
      return { ...state, inputValue: "" };

    case "SET_THEME":
      return { ...state, theme: action.theme, isBooting: true };

    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.mode };

    default:
      return state;
  }
}

interface Props {
  initialPath?: VirtualPath;
}

export default function TerminalApp({ initialPath = "~" }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    currentPath: "~",
    inputValue: "",
    commandHistory: [],
    historyIndex: -1,
    isBooting: true,
    theme: DEFAULT_THEME,
    viewMode: "terminal",
  });

  const { visibleLines, isAnimating, skip, appendLines, setLines } =
    useTypewriter();

  const handleSubmit = useCallback(
    (input: string) => {
      if (isAnimating) {
        skip();
        return;
      }

      dispatch({ type: "SUBMIT", input });

      if (!input.trim() || input === "^C") {
        if (input === "^C") {
          appendLines([
            {
              id: crypto.randomUUID(),
              type: "input",
              segments: [{ text: "^C", color: "red" }],
            },
          ]);
        }
        return;
      }

      // Echo the command with the current theme's prompt format
      const promptSegs = getPromptSegments(state.theme, state.currentPath);
      const echoLine: OutputLine = {
        id: crypto.randomUUID(),
        type: "input",
        segments: [...promptSegs, { text: input, color: "white" }],
      };

      const result = executeCommand(input, { currentPath: state.currentPath, theme: state.theme });

      if (result.clear) {
        setLines([]);
        return;
      }

      if (result.newPath) {
        dispatch({ type: "SET_PATH", path: result.newPath });
      }

      appendLines([echoLine, ...result.lines]);
    },
    [isAnimating, skip, appendLines, setLines, state.theme, state.currentPath]
  );

  const handleClear = useCallback(() => {
    setLines([]);
    dispatch({ type: "CLEAR_INPUT" });
  }, [setLines]);

  const handleThemeChange = useCallback((theme: ThemeId) => {
    setLines([]);
    dispatch({ type: "SET_THEME", theme });
  }, [setLines]);

  const handleEnterDesktop = useCallback(() => {
    dispatch({ type: "SET_VIEW_MODE", mode: "desktop" });
  }, []);

  const handleExitDesktop = useCallback((theme: ThemeId) => {
    setLines([]);
    dispatch({ type: "SET_THEME", theme });
    dispatch({ type: "SET_VIEW_MODE", mode: "terminal" });
  }, [setLines]);

  const focusInput = useCallback(() => {
    if (!state.isBooting) {
      (
        document.querySelector(
          'input[aria-label="terminal input"]'
        ) as HTMLInputElement
      )?.focus();
    }
  }, [state.isBooting]);

  const handleBootComplete = useCallback(() => {
    // Convert boot lines into OutputLines so they persist in TerminalOutput
    const bootOutputLines = THEMES[state.theme].bootLines.map((bl) => ({
      id: crypto.randomUUID(),
      type: "system" as const,
      segments: [{ text: bl.text || " ", rawColor: bl.color || "transparent" }],
    }));
    setLines(bootOutputLines);
    dispatch({ type: "BOOT_COMPLETE" });
    if (initialPath !== "~") {
      const result = executeCommand(
        `cd ${initialPath.replace("~/", "")}`,
        { currentPath: "~", theme: state.theme }
      );
      if (result.newPath) {
        dispatch({ type: "SET_PATH", path: result.newPath });
        appendLines(result.lines);
      }
    }
  }, [initialPath, appendLines, setLines, state.theme]);

  const themeConfig = THEMES[state.theme];

  if (state.viewMode === "desktop") {
    return <DesktopView onExitDesktop={handleExitDesktop} />;
  }

  return (
    <TerminalWindow
      theme={state.theme}
      onThemeChange={handleThemeChange}
      onDesktopMode={handleEnterDesktop}
      onFocusInput={focusInput}
    >
      {state.isBooting ? (
        <BootSequence
          bootLines={themeConfig.bootLines}
          scanlines={themeConfig.scanlines}
          onComplete={handleBootComplete}
        />
      ) : (
        <>
          <TerminalOutput lines={visibleLines} />
          <QuickBar onCommand={handleSubmit} />
          <TerminalInput
            inputValue={state.inputValue}
            currentPath={state.currentPath}
            theme={state.theme}
            disabled={false}
            onSubmit={handleSubmit}
            onChange={(v) => dispatch({ type: "SET_INPUT", value: v })}
            onHistoryUp={() => dispatch({ type: "HISTORY_UP" })}
            onHistoryDown={() => dispatch({ type: "HISTORY_DOWN" })}
            onClear={handleClear}
          />
        </>
      )}
    </TerminalWindow>
  );
}
