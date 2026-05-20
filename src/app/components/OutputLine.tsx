"use client";

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

  const style = seg.rawColor ? { color: seg.rawColor } : undefined;

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
  return (
    <div className="leading-relaxed whitespace-pre-wrap break-words">
      {line.segments.map((seg, i) => (
        <Segment key={i} seg={seg} />
      ))}
    </div>
  );
}
