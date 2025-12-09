import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Pin } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Transcentech Pte. Ltd.",
    date: "Jan 2024 – Oct 2024",
    points: [
      "Developed web applications in .Net and hosted them on IIS, maintaining databases with SSMS",
      "Identified bottlenecks and optimised stored procedures, shortening rendering times by 10%",
      "Conducted code reviews with SonarQube and satisfied WAPT before deploying to production",
    ],
    skills: ".Net, SSMS, Redis",
  },
  {
    role: "Technical Content Writer",
    company: "Envision Digital",
    date: "Jan 2022 – May 2022",
    points: [
      "Automated forum post summarisation with Power Automate & Excel",
      "Revamped company brochure for marketing strategy",
      "Streamlined software manual, reducing support tickets",
    ],
    skills: "Git, PowerAutomate, Agile",
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="h-fit py-4 max-w-368 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>

      <div className="relative w-full">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>

        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              exp={exp}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, align }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  const isExpanded = hovered || pinned;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "left" ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative w-full flex 
        ${align === "left" ? "justify-start" : "justify-end"} 
        md:mb-20 mb-16`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`bg-white dark:bg-gray-700 shadow-lg rounded-xl p-6 
          md:w-7/16 w-11/12 cursor-pointer overflow-hidden
          ${align === "left" ? "md:mr-6" : "md:ml-6"}
          mx-auto`}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setPinned((prev) => !prev)}
      >
        {/* Header */}
        <h3 className="text-xl font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {exp.company}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
          {exp.date}
        </p>

        {/* Expandable Details */}
        <motion.ul
          animate={
            isExpanded
              ? { opacity: 1, height: "auto" }
              : { opacity: 0, height: 0 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1"
        >
          {exp.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
          <p className="font-semibold pt-3">Skills</p>
          <p className="italic">{exp.skills}</p>
        </motion.ul>

        {/* Pin indicator */}
        {pinned && (
          <Pin className="text-blue-600 dark:text-yellow-400 mt-3 w-5 h-5"></Pin>
        )}
      </motion.div>

      {/* Circle on the timeline */}
      <div
        className="absolute md:top-6 top-full md:left-1/2 left-1/2 
        transform -translate-x-1/2 md:translate-y-0 translate-y-3
        w-6 h-6 rounded-full bg-yellow-400 border-4 
        border-white dark:border-gray-900"
      ></div>
    </motion.div>
  );
}
