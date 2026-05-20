"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function DesktopWindow({ title, onClose, children }: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-lg border border-[#2e3d55] shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1520] shrink-0">
        <span className="text-[#d0d8e8] text-sm font-semibold">{title}</span>
        <button
          onClick={onClose}
          className="text-[#667788] hover:text-[#ff5f56] transition-colors text-sm leading-none"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#1e2735] p-6 min-h-0">
        {children}
      </div>
    </div>
  );
}
