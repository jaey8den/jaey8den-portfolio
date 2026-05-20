"use client";

import React from "react";
import { OutputLine as OutputLineType, OutputSegment } from "../lib/commands";

const colorClass: Record<NonNullable<OutputSegment["color"]>, string> = {
  green: "text-term-green",
  cyan: "text-term-cyan",
  yellow: "text-term-yellow",
  red: "text-term-red",
  dim: "text-term-dim",
  white: "text-term-white",
};

function Segment({ seg }: { seg: OutputSegment }) {
  const cls = [
    seg.rawColor ? "" : seg.color ? colorClass[seg.color] : "text-term-white",
    seg.bold ? "font-bold" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {};
  if (seg.rawColor) style.color = seg.rawColor;
  if (seg.small) style.fontSize = "clamp(7px, 2vw, 14px)";

  if (seg.href) {
    return (
      <a
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} underline hover:text-term-green transition-colors`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {seg.text}
      </a>
    );
  }

  return <span className={cls} style={style}>{seg.text}</span>;
}

export default function OutputLine({ line }: { line: OutputLineType }) {
  const isBanner = line.segments.some((s) => s.small);
  return (
    <div className={isBanner ? "leading-none whitespace-pre" : "leading-relaxed whitespace-pre-wrap break-words"}>
      {line.segments.map((seg, i) => (
        <Segment key={i} seg={seg} />
      ))}
    </div>
  );
}
