"use client";

import { Phone, Mail, Linkedin, Github, FileDown } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-200 dark:bg-gray-800 pt-10 pb-5 mt-15"
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
          {/* Add the repo name for deployment */}
          <a
            href="/LimJiaLe-Resume.pdf"
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
  );
}
