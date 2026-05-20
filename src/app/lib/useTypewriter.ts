"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { OutputLine } from "./commands";

interface UseTypewriterResult {
  visibleLines: OutputLine[];
  isAnimating: boolean;
  skip: () => void;
  appendLines: (lines: OutputLine[]) => void;
  setLines: (lines: OutputLine[]) => void;
}

export function useTypewriter(onLineAdded?: () => void): UseTypewriterResult {
  const [visibleLines, setVisibleLines] = useState<OutputLine[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingRef = useRef<OutputLine[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(false);

  const revealNext = useCallback(() => {
    if (pendingRef.current.length === 0) {
      isRunningRef.current = false;
      setIsAnimating(false);
      return;
    }
    const next = pendingRef.current.shift()!;
    setVisibleLines((prev) => [...prev, next]);
    onLineAdded?.();
    timerRef.current = setTimeout(revealNext, 18);
  }, [onLineAdded]);

  const appendLines = useCallback(
    (lines: OutputLine[]) => {
      pendingRef.current.push(...lines);
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        setIsAnimating(true);
        timerRef.current = setTimeout(revealNext, 18);
      }
    },
    [revealNext]
  );

  const skip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisibleLines((prev) => [...prev, ...pendingRef.current]);
    pendingRef.current = [];
    isRunningRef.current = false;
    setIsAnimating(false);
    onLineAdded?.();
  }, [onLineAdded]);

  const setLines = useCallback((lines: OutputLine[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = [];
    isRunningRef.current = false;
    setIsAnimating(false);
    setVisibleLines(lines);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { visibleLines, isAnimating, skip, appendLines, setLines };
}
