"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";

const projects = [
  {
    title: "Candlesticks Matcher",
    screenshots: ["/cdsm/cdsm-1.png"],
    points: [
      "Captured vector embeddings of candlestick patterns with ResNet18 feature extractor",
      "Implemented a sliding window to capture patches of embeddings in a chart, determining the pattern with the highest cosine similarity",
      "Processed charts with OpenCV to meet ResNet expected inputs and determine window sizes and strides",
    ],
    details: [
      "I've had a strong interest in stock trading and have been trading since Apr 2024. As I think of projects to work on to build my portfolio, I figured why not do something related to stocks? ",
      "Additionally, many job descriptions for SWE roles required exposure to ML technologies. At the top of my head, this project probably required some ML and computer vision techniques, and so I started working on it.",
      "It wasn't easy picking up something I have no prior experience with, but that's just part of the package. The annoying part was honestly the deployment. Deploying the API on Render was troublesome as it kept crashing presumably due to memory limits. Eventually I switch to Hugging Face spaces which was better suited for heavier programs and it finally worked. Builds and logs were much faster too.",
    ],
    skills: ["ResNet18, OpenCV, FastAPI, Vercel, Hugging Face, Python, NextJS"],
    link: ["https://candlestick-matcher.vercel.app/", "Candlesticks Matcher"],
  },
  {
    title: "Crochet Diagram Generator",
    screenshots: ["/cdg/cdg-1.png", "/cdg/cdg-2.png"],
    points: [
      "Generated crochet diagrams from text instructions using Konva",
      "Refactored to be fully client sided for instant diagram generation, simplifying integration requirements for WordPress",
    ],
    details: [
      "My friend, who is a crocheter, has to spend a significant amount of time to manually draw the diagrams after developing a crochet design. She tried to find existing services that could perform the conversion from text to diagram accurately, but could not. Thus, she proposed that there will be a demand for such a service, and commissioned me to develop such a program.",
      "I started with a python library, turtle, to draw the stitches and developed the logic to determine their angles and positions. Since the diagram is generated in the backend, I had to deploy an API to handle that. However, WordPress only accepts data in JSON or PHP from an API, thus I had to encode and decode the image to display on Wordpress. The real problem arose when I tried to call the API, only to realise that Render is unable to provide a virtual display for turtle to 'draw' on. After further testing and researching, I decided it was prohibitively difficult to continue and looked alternatives.",
      "Then I stumbled upon konva, another drawing library but for Javscript. The biggest difference for me is that it performs client side rendering, which avoid all the problems I had with turtle. As a bonus, it is made to be used with HTML. I can insert a HTML block within the page, upload the functions and call it a day, all done within WordPress itself. After refactoring the logic I had in python to javascript, I had a functioning Crochet Diagram Generator ready to be integrated into WordPress.",
    ],
    skills: ["Konva, S3, turtle, Render, WordPress, Python, NodeJS"],
    link: [
      "https://thelilipath.com/crochet-diagram-generator/",
      "The LILI Path",
    ],
  },
  {
    title: "Badminton Ballot Bot",
    screenshots: ["/bbb/bbb-1.png"],
    points: [
      "Wrote a function to call a telegram API to send ballot links to a group chat",
      "Deployed the function on Google Cloud and created a scheduled job to run it daily",
    ],
    details: [
      "I have a friend group who I play badminton with and naturally we have a telegram group to send ballot links and arrange players. However, everyone is lazy beyond belief (including me) and only two of my friends are actively sending the links each day, sometimes none when they are too busy. One day, they just asked, 'Can yall (there are a few SWEs) build a bot to send the links?'",
      "The ActiveSG ballot links are mostly standardised, only a part of it varies with date and location. When timeslots are selected, the epochs are appended at the end of the URL. This is crucial as I want make it as convenient as possible for my lazy friends. With the right epochs appended, they won't need to manually select the timeslots and can simply click ballot.",
      "The template is on my Github along with instructions. With a bot token and chat id, anyone can use it.",
    ],
    skills: ["Google Cloud, Python"],
    link: [],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-4">
      <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {projects.map((proj, index) => (
          <ProjectCard key={index} project={proj} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % project.screenshots.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col gap-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <h3 className="text-2xl font-semibold">{project.title}</h3>

      {/* Link */}
      {project.link ? (
        <a
          href={project.link[0]}
          target="_blank"
          noopener="true"
          noreferrer="true"
          className="text-blue-600 dark:text-yellow-300 underline w-fit hover:text-yellow-300 dark:hover:text-blue-400"
        >
          {project.link[1]}
        </a>
      ) : null}

      {/* Slideshow */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
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
              src={project.screenshots[current]}
              alt={project.title}
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
            opacity={project.screenshots.length === 1 ? 0 : 1}
            className="w-6 h-6 text-yellow-400"
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white px-2 py-1 rounded-full"
        >
          <ChevronRight
            opacity={project.screenshots.length === 1 ? 0 : 1}
            className="w-6 h-6 text-yellow-400"
          />
        </button>
      </div>

      {/* Bullet Points */}
      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
        {project.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      {/* Skills */}
      <p className="text-xl font-semibold">Skills</p>
      <p className="italic">{project.skills}</p>

      {/* Expandable Details */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden text-gray-600 dark:text-gray-300"
      >
        <p className="text-xl font-semibold mt-3">Background</p>
        {project.details.map((detail, i) => (
          <p className="mt-2" key={i}>
            {detail}
          </p>
        ))}
      </motion.div>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="self-start mt-2 text-sm text-blue-600 dark:text-yellow-300 hover:underline"
      >
        {expanded ? "Close ▲" : "Background ▼"}
      </button>
    </motion.div>
  );
}
