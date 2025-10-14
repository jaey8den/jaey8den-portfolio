"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const pages = [
  { name: "Home", path: "/" },
  { name: "Archives", path: "/archives" },
];

const navItems = [
  [
    { id: "intro", label: "Intro" },
    { id: "experience", label: "Work Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  [
    { id: "archives", label: "Archives" },
    { id: "contact", label: "Contact" },
  ],
];

export default function NavigationBar({ pageName }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-5 left-5 z-50 p-2 bg-white dark:bg-gray-800 shadow rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-800 text-white pt-6 shadow-lg z-40"
      >
        <h2 className="text-2xl font-bold mb-6 pt-15 pl-6">Portfolio</h2>
        <ul className="space-y-4">
          {pages.map((page, index) => (
            <li key={index}>
              <Link href={page.path} className="hover:text-yellow-300 pl-6">
                {page.name}
              </Link>
              {page.name === pageName && (
                <ul className="pl-12 py-4 mt-4 space-y-4 bg-gray-700 ">
                  {navItems[index].map((sections) => (
                    <li key={sections.id}>
                      <button
                        onClick={() => scrollToSection(sections.id)}
                        className="w-full text-left hover:text-yellow-300"
                      >
                        {sections.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
