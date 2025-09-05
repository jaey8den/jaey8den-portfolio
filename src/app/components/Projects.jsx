"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";

const projects = [
  {
    title: "Portfolio Website",
    screenshots: ["/website/web1.gif", "/website/web2.gif"],
    points: [
      "Built with Next.js and Tailwind CSS",
      "Fully responsive layout and interactive content",
    ],
    details: [
      "What better way to prove React experience than having a website built with NextJS to showcase my portfolio?",
      "This website lists my work experiences and my more notable projects, personal or academic. I have attempted to make this website more modern and interactive, and pleasant to browse. Please feel free to read the backgrounds for my projects! (although they might be a bit long)",
      "P.S. Resize your window or visit on your phone.",
      "P.S.S Toggle light and dark mode.",
    ],
    skills: ["NextJS, TailwindCSS, Git"],
    link: ["https://limjiale.com", "Website"],
  },
  {
    title: "Crochet Diagram Generator",
    screenshots: ["/cdg/cdg-1.png", "/cdg/cdg-2.png"],
    points: [
      "Developed a program with turtle to generate diagrams from crochet text instructions",
      "Deployed on Render to process user input and return the corresponding diagram",
      "Refactored using konva to be compatible with HTML, simplifying integration into WordPress",
    ],
    details: [
      "My friend, who is a crocheter, has to spend a significant amount of time to manually draw the diagrams after developing a crochet design. She tried to find existing services that could perform the conversion from text to diagram accurately, but could not. Thus, she proposed that there will be a demand for such a service, and commissioned me to develop such a program.",
      "I started with a python library, turtle, to draw the stitches and developed the logic to determine their angles and positions. Since the diagram is generated in the backend, I had to deploy an API to handle that. However, WordPress only accepts data in JSON or PHP from an API, thus I had to encode and decode the image to display on Wordpress. The real problem arose when I tried to call the API, only to realise that Render is unable to provide a virtual display for turtle to 'draw' on. After further testing and researching, I decided it was prohibitively difficult to continue and looked alternatives.",
      "Then I stumbled upon konva, another drawing library but for Javscript. The biggest difference for me is that it performs client side rendering, which avoid all the problems I had with turtle. As a bonus, it is made to be used with HTML. I can insert a HTML block within the page, upload the functions and call it a day, all done within WordPress itself. After refactoring the logic I had in python to javascript, I had a functioning Crochet Diagram Generator ready to be integrated into WordPress.",
    ],
    skills: ["FastAPI, Render, S3, turtle, konva, WordPress, Python, NodeJS"],
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
    skills: ["Google Cloud, Git, Python"],
    link: [],
  },
  {
    title: "JIO",
    screenshots: ["/jio/jio-1.png", "/jio/jio-2.png", "/jio/jio-3.png"],
    points: [
      "Replicated a multiplayer application using Unity3D",
      "Deployed a database on AWS for authentication and inventory",
      "Designed tile sets, maps and sprites using Photoshop",
    ],
    details: [
      "JIO is an app to allow users to connect virtually in a game-like environment, posed as cats. It is inspired by the Forest & Gather app, and is primarily a productivity app.",
      "This was a 10 man academic project. I was mostly tasked with the design of maps, tilesets, sprites, and the designing and deployment of relational databases for user authentication and inventory.",
    ],
    skills: ["Unity3D, EC2, Photoshop, C#, MySQL"],
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
          className="text-blue-600 dark:text-yellow-300 hover:underline italic"
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
