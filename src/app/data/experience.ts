export interface Experience {
  slug: string;
  role: string;
  company: string;
  date: string;
  points: string[];
  skills: string;
}

export const experiences: Experience[] = [
  {
    slug: "st-clair",
    role: "Software Analyst",
    company: "St Clair Pte. Ltd.",
    date: "Jan 2026 – May 2026",
    points: [
      "Built automated pipelines to conduct fundamental analysis between competitors, lending confidence to trade ideas",
      "Tracked options data to expose market dealer behaviour, guiding risk management and position sizing",
      "Developed a trading algorithm using measured moves, providing price targets and stop losses",
    ],
    skills: "Financial Analysis, Python, SQlite",
  },
  {
    slug: "transcentech",
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
    slug: "envision",
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
