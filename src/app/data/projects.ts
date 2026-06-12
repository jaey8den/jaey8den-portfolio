export interface Project {
  slug: string;
  title: string;
  screenshots: string[];
  points: string[];
  details: string[];
  skills: string[];
  link?: [string, string];
}

export const projects: Project[] = [
  {
    slug: "cfc",
    title: "Concession Fare Checker",
    screenshots: ["/cfc/cfc-1.png", "/cfc/cfc-2.png"],
    points: [
      "Parsed SimplyGo’s monthly PDF statement for journey details, matching bus stop descriptions with codes fetched from LTA DataMall",
      "Calculated travel fares by estimating distances between bus stops using coordinates, and an open-source rail dataset for track distances between train stations",
    ],
    details: [
      "There was a month where I had spend nearly $200 on public transport, which is honestly ridiculous. Concession pass was only $122, so it was a no brainer to buy it.",
      "After a few months, I began to wonder if I was actually saving money with the pass. I checked the SimplyGo app and they do not show fares for pass usage, just the journey details. However, they do provide a monthly PDF statement.",
      "I immediately thought of parsing the PDF to extract the journey details such as the time stamps and locations. Combined with the fare structures and data from LTA, I can calculate/estimate the fares for each journey!",
      "It is hosted on Vercel for public use, since I don't think I'm only the only curious one. Be careful though, that's why they say curiousity killed the cat...",
    ],
    skills: ["ReactJS, PDF Parsing"],
    link: [
      "https://concession-fare-checker.vercel.app/",
      "Concession Fare Checker",
    ],
  },
  {
    slug: "st",
    title: "soaptest",
    screenshots: ["/st/st-1.png"],
    points: [
      "Published a python package to PyPI for testing SOAP APIs, skipping raw XML and boilerplates",
      "Automated integration tests and version tag matching with GitHub actions, avoiding broken releases",
      "Exposed all WSDL operations as functions with the required parameters, simplifying tests with pytest",
    ],
    details: [
      "I saw a Reddit Post complaining about manual configuration for SOAP testing. It painfully reminded me of my previous job where I had the same experience.",
      "There were already dev tools like SoapUI and Postman, but I wanted something that could be used directly on the IDE or CLI. There's zeep too, but I felt like there were many small inconveniences that could be avoided.",
      "soaptest is basically a ergonomic improvement for zeep. You can read the PyPI documentation for more details, it is still currentlu under development with more features to be added.",
    ],
    skills: ["CI/CD, GitHub Actions, PyPI, Python"],
    link: ["https://pypi.org/project/soaptest/", "soaptest"],
  },
  {
    slug: "cdsm",
    title: "Candlesticks Matcher",
    screenshots: ["/cdsm/cdsm-1.png"],
    points: [
      "Prototyped a candlestick pattern matcher using ResNet18, comparing vector embeddings and cosine similarity",
      "Implemented a sliding window to capture patches of an uploaded image for localised comparisons",
      "Processed uploaded charts with OpenCV to determine the window’s size and stride",
    ],
    details: [
      "I've had a strong interest in stock trading and have been trading since Apr 2024. As I think of projects to work on to build my portfolio, I figured why not do something related to stocks?",
      "Additionally, many job descriptions for SWE roles required exposure to ML technologies. At the top of my head, this project probably required some ML and computer vision techniques, and so I started working on it.",
      "It wasn't easy picking up something I have no prior experience with, but that's just part of the package. The annoying part was honestly the deployment. Deploying the API on Render was troublesome as it kept crashing presumably due to memory limits. Eventually I switch to Hugging Face spaces which was better suited for heavier programs and it finally worked. Builds and logs were much faster too.",
    ],
    skills: ["ResNet18, OpenCV, FastAPI, Hugging Face, Python, NextJS"],
    link: ["https://candlestick-matcher.vercel.app/", "Candlesticks Matcher"],
  },
  {
    slug: "cdg",
    title: "Crochet Diagram Generator",
    screenshots: ["/cdg/cdg-1.png", "/cdg/cdg-2.png"],
    points: [
      "Generated crochet diagrams from text instructions using Konva",
      "Built in HTML and fully client sided to keep user data local and enable embedding into WordPress",
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
];
