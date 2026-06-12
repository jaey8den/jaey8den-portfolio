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
      "Built a python stock screener to visualise the correlation between multiple financial metrics across 500 tickers, highlighting trade ideas",
      "Automated daily API calls, web scraping and data storage via GitHub Actions, maintaining an uninterrupted time-series dataset",
      "Parallelised ticker processing with multithreading and sharded SQLite databases with price data, improving runtime by 80%",
    ],
    skills: "Financial Analysis, Python, SQlite",
  },
  {
    slug: "transcentech",
    role: "Full Stack Developer",
    company: "Transcentech Pte. Ltd.",
    date: "Jan 2024 – Oct 2024",
    points: [
      "Enhanced and maintained internal .Net web applications, hosted on IIS with SQL Server backends",
      "Identified database bottlenecks and refactored stored procedures to only fetch required data, improving response times by 25%",
      "Wrote unit tests, ran code analysis with SonarQube and passed penetration tests before deployment",
    ],
    skills: ".Net, SSMS, Redis",
  },
  {
    slug: "envision",
    role: "Technical Content Writer",
    company: "Envision Digital",
    date: "Jan 2022 – May 2022",
    points: [
      "Automated the daily summarisation of internal forum posts using Power Automate and Excel Scripts, saving the team 1 hour per day",
    ],
    skills: "Git, PowerAutomate, Agile",
  },
];
