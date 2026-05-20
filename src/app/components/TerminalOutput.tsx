"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OutputLine as OutputLineType } from "../lib/commands";
import OutputLine from "./OutputLine";

interface Props {
  lines: OutputLineType[];
}

export default function TerminalOutput({ lines }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 font-mono text-sm">
      <AnimatePresence initial={false}>
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.08 }}
          >
            <OutputLine line={line} />
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
