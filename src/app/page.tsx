"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NavigationBar from "./components/NavigationBar.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

const introText = "Hi, I'm Lim Jia Le";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar Navigation */}
      <NavigationBar pageName="Home"></NavigationBar>

      {/* Main Content */}
      <main className="flex-1 px-6 sm:pt-8 sm:px-8 md:px-10 space-y-8">
        {/* Intro */}
        <section
          id="intro"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between gap-20 max-w-368 mx-auto"
        >
          <div className="max-w-2xl">
            <h1
              className={`mt-20 text-2xl md:mt-0 md:text-5xl font-bold mb-4 flex flex-wrap`}
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
            <p className="text-xl md:text-3xl font-semibold mb-4">
              {"Full Stack Developer"}
            </p>
            <p className="text-lg max-w-4xl">
              {
                "I specialise in building web applications or services to solve real-world problems. My main stacks are Next.js, .Net and Python, along with SQL Server and PostgreSQL for databases."
              }
              <br></br>
              <br></br>
              {
                "I have a strong interest in AI/ML as it is the logical next step to evolve as a Full Stack Developer. I am keen to take on an entry level role in the field to gain practical experience beyond personal projects."
              }
            </p>
          </div>
          <motion.div
            className="w-58 h-58 md:w-110 md:h-110 lg:w-156 lg:h-156 relative"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/intro-portrait.jpg"
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
      <Footer></Footer>
    </div>
  );
}
