export type Project = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  tags: string[];
  problem: string;
  role: string;
  challenge: string;
  outcome: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "market-pulse",
    name: "Market Pulse",
    category: "WEB · REAL-TIME",
    blurb: "A live stock tracker with sub-second price updates and custom watchlists.",
    tags: ["React", "TypeScript", "WebSockets", "Node.js"],
    problem: "Existing free tickers were laggy and cluttered — nothing gave a clean, fast read on a personal watchlist.",
    role: "Solo project: designed the data pipeline, built the React front end and the Node.js WebSocket layer.",
    challenge: "Keeping the UI smooth under a constant stream of price ticks without re-rendering the whole page every update.",
    outcome: "A snappy tracker I use daily, with sub-second updates and no dropped frames on a real watchlist.",
  },
  {
    slug: "deployment-patcher",
    name: "Deployment Patcher",
    category: "INTERNAL TOOL",
    blurb: "A .NET online file explorer that turns a multi-step manual deploy patch into just drag and drop.",
    tags: [".NET", "C#", "CLI"],
    problem: "Patching a production deployment took a long checklist of manual steps, prone to being skipped under pressure.",
    role: "Built solo for the team: scoped the workflow, wrote the CLI, and rolled it out with docs.",
    challenge: "Making the tool safe to run under pressure — clear dry-run output and no silent failures.",
    outcome: "Cut a 20-minute manual patch process down to a single command the whole team now relies on.",
  },
  {
    slug: "automation-tool",
    name: "Automation Tool",
    category: "QA · TESTING",
    blurb: "A Playwright + Appium suite covering web and mobile regression in one run.",
    tags: ["Playwright", "Appium", "TypeScript"],
    problem: "Web and mobile regression testing lived in two disconnected manual processes, both slow and easy to skip.",
    role: "Designed and built the shared test framework and CI wiring.",
    challenge: "Getting Playwright (web) and Appium (mobile) to share fixtures and reporting without duplicating test logic.",
    outcome: "One suite, one report, running on every merge — catching regressions before QA ever sees them.",
  },
  {
    slug: "dialga",
    name: "Dialga",
    category: "MOBILE",
    blurb: "A time-tracking app for people who forget to start the timer.",
    tags: ["React Native", "Firebase"],
    problem: "Most time trackers assume you remember to hit start — I never do.",
    role: "Solo build: React Native app, Firebase backend, all the UX.",
    challenge: "Designing reminders and quick-capture flows that feel helpful, not naggy.",
    outcome: "A small app that quietly keeps my own timesheets honest — still in daily use.",
  },
  {
    slug: "vantor",
    name: "Vantor App",
    category: "DESKTOP",
    blurb: "An Electron desktop tool wrapping a React front end around local workflows.",
    tags: ["Electron", "React", "Node.js"],
    problem: "A recurring local workflow needed a proper interface instead of scattered scripts.",
    role: "Built the Electron shell, the React UI, and the Node.js integration layer.",
    challenge: "Keeping the app feeling native — window behavior, file access, and performance — while shipping fast in web tech.",
    outcome: "A desktop tool that replaced a folder of ad-hoc scripts with one interface people actually open.",
  },
  {
    slug: "telco-platform",
    name: "Telco Web App",
    category: "ENTERPRISE",
    blurb: "A large-scale .NET platform supporting enterprise telecom operations.",
    tags: [".NET", "C#", "SQL Server"],
    problem: "Details are under NDA, but the shape of it: legacy processes needed a modern, reliable web platform at enterprise scale.",
    role: "Full-stack contributor on a larger team — backend services in .NET, front-end features, and data layer work.",
    challenge: "Working within strict enterprise constraints — uptime, security review, and integration with existing systems.",
    outcome: "A platform now running core operations in production, with my work shipped across multiple releases.",
  },
  {
    slug: "trash-classifier",
    name: "Trash Segregation Classifier",
    category: "ML",
    blurb: "An on-device TensorFlow Lite model that sorts trash by camera in real time.",
    tags: ["TensorFlow Lite", "Python"],
    problem: "Manual waste sorting is inconsistent — a lightweight, on-device classifier could help get it right at the point of disposal.",
    role: "Trained and tuned the model, and built the on-device inference pipeline.",
    challenge: "Getting real-time inference and reasonable accuracy on-device without a cloud round-trip.",
    outcome: "A working prototype that classifies trash by camera in real time, fully on-device.",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
