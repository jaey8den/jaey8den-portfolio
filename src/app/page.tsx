"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail, Linkedin, Github, FileDown } from "lucide-react";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import Projects from "./components/Projects.jsx";

import Image from "next/image";
import introPortrait from "./assets/intro-portrait.jpg";

import { VT323 } from "next/font/google";

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const introText = "Hi, I'm Lim Jia Le";

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { id: "intro", label: "Intro" },
    { id: "experience", label: "Work Experience" },
    { id: "projects", label: "Projects" },
    // { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-5 left-5 z-50 p-2 bg-white dark:bg-gray-800 shadow rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-800 text-white p-6 shadow-lg z-40"
      >
        <h2 className="text-2xl font-bold mb-6 pt-15">Portfolio</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left hover:text-yellow-300"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 px-6 sm:px-8 md:px-10 space-y-8">
        {/* Intro */}
        <section
          id="intro"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between gap-20 max-w-368 mx-auto"
        >
          <div className="max-w-2xl">
            <h1
              className={`${vt323.className} text-5xl md:text-6xl font-bold mb-4 flex flex-wrap`}
            >
              {introText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -10, 0], // float up and down
                    color: [
                      "hsl(0, 100%, 50%)",
                      "hsl(60, 100%, 50%)",
                      "hsl(120, 100%, 50%)",
                      "hsl(180, 100%, 50%)",
                      "hsl(240, 100%, 50%)",
                      "hsl(300, 100%, 50%)",
                      "hsl(360, 100%, 50%)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15, // wave offset
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <p className="text-lg max-w-4xl">
              {
                "I'm a Full Stack Developer who finds great satisfaction when the code works after one run. Of course, that's unrealistic, so I strive to write clean code that is easy to understand and maintain, in hopes that the next developer (probably me when I revisit the code) who looks at my code doesn't go crazy."
              }
              <br></br>
              <br></br>
              {
                "Actively seeking job opportunities where I can utilise my skills and contribute to exciting projects!"
              }
            </p>
          </div>
          <motion.div
            className="w-58 h-58 md:w-110 md:h-110 lg:w-156 lg:h-156 relative"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={introPortrait}
              alt="Lim Jia Le Portrait"
              fill
              className="object-cover rounded-full shadow-lg"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "cover",
                maskImage:
                  "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "cover",
              }}
            />
          </motion.div>
        </section>

        {/* Work Experience */}
        <ExperienceTimeline></ExperienceTimeline>

        {/* Projects */}
        <Projects></Projects>
      </main>
      {/* Contact */}
      <footer
        id="contact"
        className="bg-gray-200 dark:bg-gray-800 pt-10 pb-5 mt-5"
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-3 text-center md:text-left">
            <p className="text-lg font-semibold">Get in Touch</p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">+65 8511 9939</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-yellow-500" />
              <a
                href="mailto:lim.jia.le51@gmail.com"
                className="text-sm text-blue-600 dark:text-yellow-300 hover:underline"
              >
                lim.jia.le51@gmail.com
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <a
              href="https://linkedin.com/in/lim-jia-le/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/jaey8den"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="/LimJiaLeResume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg shadow hover:bg-yellow-500 transition-colors"
            >
              <FileDown className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lim Jia Le. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
