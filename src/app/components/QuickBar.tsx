"use client";

const QUICK_COMMANDS = [
  { label: "About", cmd: "whoami" },
  { label: "Experience", cmd: "cat experience.md" },
  { label: "Projects", cmd: "ls projects/" },
  { label: "Archives", cmd: "ls archives/" },
  { label: "Contact", cmd: "contact" },
];

interface Props {
  onCommand: (cmd: string) => void;
}

export default function QuickBar({ onCommand }: Props) {
  return (
    <div className="border-t border-term-border bg-term-surface px-4 py-2 flex flex-wrap gap-2 shrink-0">
      {QUICK_COMMANDS.map(({ label, cmd }) => (
        <button
          key={label}
          onClick={(e) => {
            e.stopPropagation();
            onCommand(cmd);
          }}
          className="text-xs font-mono px-3 py-1 border border-term-border text-term-dim hover:text-term-white hover:border-term-cyan hover:bg-term-bg transition-colors cursor-pointer"
        >
          <span className="text-term-cyan">{">"}_</span> {label}
        </button>
      ))}
    </div>
  );
}
