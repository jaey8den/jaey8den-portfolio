"use client";

import { useEffect, useRef } from "react";
import { BootLine } from "../lib/themes";

interface Props {
  bootLines: BootLine[];
  scanlines: boolean;
  onComplete: () => void;
}

export default function BootSequence({ bootLines, scanlines, onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    if (containerRef.current) containerRef.current.innerHTML = "";

    function printNext() {
      if (!containerRef.current) return;
      if (indexRef.current >= bootLines.length) {
        onComplete();
        return;
      }
      const { text, color, small } = bootLines[indexRef.current];
      const el = document.createElement("div");
      el.textContent = text || " ";
      el.style.color = color || "transparent";
      el.style.whiteSpace = "pre";
      if (small) {
        el.style.fontSize = "clamp(7px, 2vw, 14px)";
        el.style.lineHeight = "1";
      }
      containerRef.current.appendChild(el);
      indexRef.current++;
      timerRef.current = setTimeout(printNext, 55);
    }

    timerRef.current = setTimeout(printNext, 100);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [bootLines, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto px-4 pt-4 pb-2 font-mono text-sm ${scanlines ? "scanlines" : ""}`}
    />
  );
}
