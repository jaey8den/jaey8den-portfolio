"use client";

import { useState } from "react";
import { ThemeId } from "../lib/filesystem";
import { experiences } from "../data/experience";
import { projects, Project } from "../data/projects";
import { archives } from "../data/archives";
import DesktopWindow from "./DesktopWindow";

interface Props {
  onExitDesktop: (theme: ThemeId) => void;
}

type WindowId = "about" | "experience" | "projects" | "archives" | "contact";

const ICONS: { id: WindowId; label: string; emoji: string }[] = [
  { id: "about", label: "About", emoji: "👤" },
  { id: "experience", label: "Experience", emoji: "💼" },
  { id: "projects", label: "Projects", emoji: "📁" },
  { id: "archives", label: "Archives", emoji: "📦" },
  { id: "contact", label: "Contact", emoji: "✉️" },
];

const WINDOW_TITLES: Record<WindowId, string> = {
  about: "About",
  experience: "Work Experience",
  projects: "Projects",
  archives: "Archive",
  contact: "Contact",
};

const THEME_BUTTONS: { id: ThemeId; label: string }[] = [
  { id: "bash", label: "bash" },
  { id: "powershell", label: "ps" },
  { id: "cmd", label: "cmd" },
];

function SkillTags({ skills }: { skills: string | string[] }) {
  const tags = Array.isArray(skills)
    ? skills.flatMap((s) => s.split(", "))
    : skills.split(", ");
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs px-2 py-0.5 rounded bg-[#152535] text-[#7ec8e3]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function AboutContent() {
  return (
    <div className="space-y-4 text-[#d0d8e8]">
      <div>
        <h2 className="text-xl font-bold text-[#00e5ff]">Lim Jia Le</h2>
        <p className="text-[#667788]">Software Developer</p>
      </div>
      <p>
        I specialise in building software to solve problems, but I especially
        enjoy automating tedious tasks and making quality of life enhancements.
        After all, software exist to make processes more efficient, and our
        lives easier.
      </p>
      <p>
        My main stack is Python, but I am familiar with .Net, SQL and NextJS as
        well.
      </p>
      <p>
        Looking for software development opportunities, but open to other
        related roles.
      </p>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div
          key={exp.slug}
          className="bg-[#1a2535] border border-[#243448] rounded-lg p-4"
        >
          <div>
            <div className="font-semibold text-[#d0d8e8]">{exp.role}</div>
            <div className="text-sm text-[#667788]">{exp.company}</div>
            <div className="text-xs text-[#667788] mt-0.5">{exp.date}</div>
          </div>
          <ul className="mt-3 space-y-1.5">
            {exp.points.map((point, i) => (
              <li
                key={i}
                className="text-[10px] sm:text-sm text-[#d0d8e8] flex gap-2"
              >
                <span className="text-[#667788] shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <SkillTags skills={exp.skills} />
        </div>
      ))}
    </div>
  );
}

function Slideshow({ screenshots }: { screenshots: string[] }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  if (screenshots.length === 0) return null;
  const multi = screenshots.length > 1;

  return (
    <div className="mt-3">
      <div
        className="relative rounded overflow-hidden"
        style={{ height: "160px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshots[index]}
          alt=""
          className="w-full h-full object-contain cursor-zoom-in"
          onClick={() => setLightbox(true)}
        />
        {multi && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((index - 1 + screenshots.length) % screenshots.length);
              }}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-lg leading-none px-1.5 py-0.5 rounded transition-colors"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((index + 1) % screenshots.length);
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white text-lg leading-none px-1.5 py-0.5 rounded transition-colors"
            >
              ›
            </button>
          </>
        )}
      </div>
      {multi && (
        <div className="flex justify-center gap-1.5 mt-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-[#00e5ff]" : "bg-[#3a4460] hover:bg-[#667788]"
              }`}
            />
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshots[index]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain rounded shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none transition-colors"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ proj }: { proj: Project }) {
  const [showBackground, setShowBackground] = useState(false);

  return (
    <div className="bg-[#1a2535] border border-[#243448] rounded-lg p-4">
      <div>
        <div className="font-semibold text-[#d0d8e8]">{proj.title}</div>
        {proj.link && (
          <a
            href={proj.link[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00e5ff] hover:underline"
          >
            {proj.link[1]} ↗
          </a>
        )}
      </div>
      <ul className="mt-3 space-y-1.5">
        {proj.points.map((point, i) => (
          <li
            key={i}
            className="text-[10px] sm:text-sm text-[#d0d8e8] flex gap-2"
          >
            <span className="text-[#667788] shrink-0">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {proj.details.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowBackground(!showBackground)}
            className="text-xs text-[#667788] hover:text-[#d0d8e8] transition-colors flex items-center gap-1"
          >
            Background {showBackground ? "▲" : "▼"}
          </button>
          {showBackground && (
            <div className="mt-2 space-y-2">
              {proj.details.map((d, i) => (
                <p
                  key={i}
                  className="text-[10px] sm:text-sm text-[#d0d8e8] leading-relaxed"
                >
                  {d}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
      <Slideshow screenshots={proj.screenshots} />
      <SkillTags skills={proj.skills} />
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-4">
      {projects.map((proj) => (
        <ProjectCard key={proj.slug} proj={proj} />
      ))}
    </div>
  );
}

function ArchivesContent() {
  return (
    <div className="space-y-4">
      {archives.map((arch) => (
        <div
          key={arch.slug}
          className="bg-[#1a2535] border border-[#243448] rounded-lg p-4"
        >
          <div className="font-semibold text-[#d0d8e8]">{arch.title}</div>
          <p className="mt-2 text-sm text-[#d0d8e8] leading-relaxed">
            {arch.description}
          </p>
          <Slideshow screenshots={arch.screenshots} />
          <SkillTags skills={arch.skills} />
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-[#00e5ff]">Get in Touch</h2>
      <div className="space-y-3 text-sm">
        <div className="flex gap-4">
          <span className="text-[#667788] w-20 shrink-0">Phone</span>
          <span className="text-[#d0d8e8]">+65 8511 9939</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#667788] w-20 shrink-0">Email</span>
          <a
            href="mailto:lim.jia.le51@gmail.com"
            className="text-[#00e5ff] hover:underline"
          >
            lim.jia.le51@gmail.com
          </a>
        </div>
        <div className="flex gap-4">
          <span className="text-[#667788] w-20 shrink-0">LinkedIn</span>
          <a
            href="https://linkedin.com/in/lim-jia-le/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e5ff] hover:underline"
          >
            linkedin.com/in/lim-jia-le/
          </a>
        </div>
        <div className="flex gap-4">
          <span className="text-[#667788] w-20 shrink-0">GitHub</span>
          <a
            href="https://github.com/jaey8den"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e5ff] hover:underline"
          >
            github.com/jaey8den
          </a>
        </div>
        <div className="flex gap-4">
          <span className="text-[#667788] w-20 shrink-0">Resume</span>
          <a
            href="/LimJiaLe-Resume.pdf"
            download
            className="text-[#00e5ff] hover:underline"
          >
            LimJiaLe-Resume.pdf [download]
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DesktopView({ onExitDesktop }: Props) {
  const [openWindow, setOpenWindow] = useState<WindowId | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e] p-4">
      <div
        className="w-full max-w-5xl flex flex-col border border-[#2e3d55] overflow-hidden"
        style={{ height: "85vh", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#1e2432] border-b border-[#2e3d55] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-[#667788] font-mono text-xs select-none">
              Portfolio — Desktop
            </span>
          </div>
          <div className="flex items-center gap-1">
            {THEME_BUTTONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onExitDesktop(id)}
                className="text-[10px] font-mono px-2 py-0.5 border border-[#2e3d55] text-[#667788] hover:text-[#d0d8e8] hover:border-[#00e5ff] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop body */}
        <div className="relative flex-1 bg-[#131920] overflow-hidden">
          {/* Icons */}
          <div className="flex flex-wrap gap-3 p-8">
            {ICONS.map((icon) => (
              <button
                key={icon.id}
                onClick={() => setOpenWindow(icon.id)}
                className="flex flex-col items-center gap-1 p-3 w-20 rounded border border-transparent hover:border-[#00e5ff]/40 hover:bg-[#00e5ff]/5 transition-colors"
              >
                <span className="text-3xl select-none">{icon.emoji}</span>
                <span className="text-xs text-[#d0d8e8] text-center leading-tight">
                  {icon.label}
                </span>
              </button>
            ))}
          </div>

          {/* Window overlay */}
          {openWindow && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/50"
              onClick={() => setOpenWindow(null)}
            >
              <div
                className="w-full max-w-2xl mx-4 flex flex-col"
                style={{ maxHeight: "80%" }}
                onClick={(e) => e.stopPropagation()}
              >
                <DesktopWindow
                  title={WINDOW_TITLES[openWindow]}
                  onClose={() => setOpenWindow(null)}
                >
                  {openWindow === "about" && <AboutContent />}
                  {openWindow === "experience" && <ExperienceContent />}
                  {openWindow === "projects" && <ProjectsContent />}
                  {openWindow === "archives" && <ArchivesContent />}
                  {openWindow === "contact" && <ContactContent />}
                </DesktopWindow>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
