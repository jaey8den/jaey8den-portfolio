export interface Archive {
  slug: string;
  title: string;
  screenshots: string[];
  description: string;
  skills: string;
}

export const archives: Archive[] = [
  {
    slug: "website",
    title: "Portfolio Website (2025)",
    screenshots: ["/archives/website/web-1.gif", "/archives/website/web-2.gif"],
    description: "Responsive portfolio website to showcase notable experiences and works.",
    skills: "NextJS, TailwindCSS",
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
    description: "A revamp of Old Chang Kee's website to give it a modern look.",
    skills: "Web Design, UI/UX, Copywrite, Photoshop",
  },
  {
    slug: "jne",
    title: "JnE (2022)",
    screenshots: ["/archives/jne/jne-1.png", "/archives/jne/jne-2.png"],
    description: "An online apparel store. Using databases and session variables to keep stock and cart items.",
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
    description: "An productivity app connecting users virtually in a game-like environment, posed as cats.",
    skills: "Unity3D, EC2, Photoshop, C#, MySQL",
  },
];
