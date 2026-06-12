export interface Archive {
  slug: string;
  title: string;
  screenshots: string[];
  description: string;
  skills: string;
  link?: [string, string];
  points?: string[];
  details?: string[];
}

export const archives: Archive[] = [
  {
    slug: "mac",
    title: "Macro",
    screenshots: ["/archives/mac/mac-1.png"],
    description: "A macro program to execute recorded keystrokes.",
    skills: "pyinstaller, tkinter",
    link: ["https://github.com/jaey8den/macro", "Macro"],
  },
  {
    slug: "jhe",
    title: "JSON Editor",
    screenshots: ["/archives/jhe/jhe-1.png"],
    description: "A drag and drop JSON restructure tool.",
    skills: "ReactJS",
    link: ["https://json-hierarchy-editor.vercel.app/", "JSON Editor"],
    points: [
      "Created a drag and drop JSON restructure tool",
      "Supports swaps between depths and key-value pairs, restructuring all leaves simultaneously",
    ],
    details: [
      "Had a project where I was refactoring my JSON file to better fit my workflow. Having over 500 leaves made manual refactoring a real pain.",
      "I asked Claude to do it the last time, now I can do it with this tool. The leaves need to a standardised schema for this to work optimally.",
    ],
  },
  {
    slug: "website",
    title: "Portfolio Website (2026)",
    screenshots: ["/archives/website/web-1.png", "/archives/website/web-2.png"],
    description:
      "CLI themed portfolio website to showcase notable experiences and works.",
    skills: "NextJS, TailwindCSS",
  },
  {
    slug: "bbb",
    title: "Badminton Ballot Bot (2025)",
    screenshots: ["/archives/bbb/bbb-1.png"],
    description:
      "Telegram bot for sending ActiveSG badminton ballot links daily. Hosted on GCP.",
    skills: "Google Cloud, Python",
    link: ["https://github.com/jaey8den/badminton-ballot-bot", "Ballot Bot"],
    points: [
      "Called a telegram API to send ballot links to a group chat",
      "Deployed the function on Google Cloud and created a scheduled job to run it daily",
    ],
    details: [
      "I have a friend group who I play badminton with and naturally we have a telegram group to send ballot links and arrange players. However, everyone is lazy beyond belief (including me) and only two of my friends are actively sending the links each day, sometimes none when they are too busy. One day, they just asked, 'Can yall (there are a few SWEs) build a bot to send the links?'",
      "The ActiveSG ballot links are mostly standardised, only a part of it varies with date and location. When timeslots are selected, the epochs are appended at the end of the URL. This is crucial as I want make it as convenient as possible for my lazy friends. With the right epochs appended, they won't need to manually select the timeslots and can simply click ballot.",
      "The template is on my Github along with instructions. With a bot token and chat id, anyone can use it.",
    ],
  },
  {
    slug: "victoria-chorale",
    title: "Victoria Chorale (2023)",
    screenshots: [
      "/archives/victoria-chorale/vc-1.png",
      "/archives/victoria-chorale/vc-2.png",
      "/archives/victoria-chorale/vc-3.png",
    ],
    description: "Victoria Chorale home page. Never deployed.",
    skills: "php, CSS, Javascript",
  },
  {
    slug: "ock",
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
    slug: "jne",
    title: "JnE (2022)",
    screenshots: ["/archives/jne/jne-1.png", "/archives/jne/jne-2.png"],
    description:
      "An online apparel store. Using databases and session variables to keep stock and cart items.",
    skills: "php, MySQL, CSS, Javascript",
  },
  {
    slug: "jio",
    title: "JIO (2021)",
    screenshots: [
      "/archives/jio/jio-1.png",
      "/archives/jio/jio-2.png",
      "/archives/jio/jio-3.png",
    ],
    description:
      "A productivity app connecting users virtually in a game-like environment, posed as cats.",
    skills: "Unity3D, EC2, Photoshop, C#, MySQL",
  },
];
