"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";

const archivedProjects = [
  {
    title: "Victora Chorale (2023)",
    screenshots: [
      "/archives/victoria-chorale/vc-1.png",
      "/archives/victoria-chorale/vc-2.png",
      "/archives/victoria-chorale/vc-3.png",
    ],
    description: "Victoria Chorale home page. Never deployed.",
    skills: "php, CSS, Javascript",
  },
  {
    title: "Old Chang Kee (2022)",
    screenshots: [
      "/archives/ock/ock-1.png",
      "/archives/ock/ock-2.png",
      "/archives/ock/ock-3.png",
    ],
    description:
      "A revamp of Old Chang Kee's website to give it a modern look.",
    skills: "Web Design, UI/UX, Copywrite, Photoshop",
  },
  {
    title: "JnE (2022)",
    screenshots: ["/archives/jne/jne-1.png", "/archives/jne/jne-2.png"],
    description:
      "An online apparel store. Using databases and session variables to keep stock and cart items.",
    skills: "php, MySQL, CSS, Javascript",
  },
];

export default function Archives() {
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % selected.screenshots.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) =>
      prev === 0 ? selected.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <section id="archives" className="max-w-5xl mx-auto py-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Archives</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: List */}
        <ul className="w-full md:w-1/3 space-y-3">
          {archivedProjects.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  setSelected(item);
                  setCurrent(0);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selected?.title === item.title
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-yellow-300 dark:hover:text-black"
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Card */}
        <div className="flex-1">
          {selected ? (
            <div className="p-4 shadow-lg rounded-2xl bg-white dark:bg-gray-800">
              <div>
                <h3 className="text-xl font-semibold mb-2">{selected.title}</h3>

                {/* Slideshow */}
                <div className="relative w-full h-96 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700 py-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, x: direction * 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -50 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        unoptimized
                        src={selected.screenshots[current]}
                        alt={selected.title}
                        fill
                        className="object-contain p-4"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white px-2 py-1 rounded-full"
                  >
                    <ChevronLeft
                      opacity={selected.screenshots.length === 1 ? 0 : 1}
                      className="w-6 h-6 text-yellow-400"
                    />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white px-2 py-1 rounded-full"
                  >
                    <ChevronRight
                      opacity={selected.screenshots.length === 1 ? 0 : 1}
                      className="w-6 h-6 text-yellow-400"
                    />
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 my-4">
                  {selected.description}
                </p>

                {/* Skills */}
                <p className="text-xl font-semibold pb-2">Skills</p>
                <p className="italic">{selected.skills}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-gray-500 dark:text-gray-400 text-center border-2 border-dashed rounded-lg">
              Select a project to view details
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
