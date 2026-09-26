export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const OPEN_APPLICATION_SLUG = 'open-application';

const RAW_ROLES = [
  {
    title: "Full Stack Engineer",
    track: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    desc: "Build scalable web applications and internal tools while working closely with product and design teams.",
    responsibilities: [
      "Build scalable web applications and internal tools.",
      "Develop clean and reusable frontend and backend features.",
      "Work with APIs, databases, and modern frameworks.",
      "Collaborate with designers and engineers to deliver quality products.",
      "Debug issues and improve application performance.",
    ],
  },
  {
    title: "AI/ML Engineer",
    track: "AI & Automation",
    type: "Full-time",
    location: "Remote / Hybrid",
    desc: "Design and build intelligent solutions using modern AI and machine learning technologies.",
    responsibilities: [
      "Build AI-powered applications and intelligent workflows.",
      "Work with LLMs, APIs, data pipelines, and AI tools.",
      "Develop and test machine learning solutions.",
      "Integrate AI capabilities into real-world business products.",
      "Collaborate with product and engineering teams.",
    ],
  },
  {
    title: "Automation Specialist",
    track: "AI & Automation",
    type: "Full-time",
    location: "Remote / Hybrid",
    desc: "Build business automation workflows that reduce repetitive work and improve operational efficiency.",
    responsibilities: [
      "Build and optimize automated business workflows.",
      "Work with tools like n8n, Zapier, and WhatsApp APIs.",
      "Connect different platforms and business systems.",
      "Identify repetitive processes that can be automated.",
      "Monitor and improve automation reliability.",
    ],
  },
  {
    title: "Product Designer",
    track: "Design",
    type: "Full-time",
    location: "Remote / Hybrid",
    desc: "Design intuitive digital experiences across web and product platforms.",
    responsibilities: [
      "Design clean and intuitive web and product experiences.",
      "Create wireframes, user flows, and high-fidelity designs.",
      "Work closely with developers and product teams.",
      "Understand user needs and translate them into experiences.",
      "Continuously improve usability and visual consistency.",
    ],
  },
];

export const OPEN_ROLES = RAW_ROLES.map((r) => ({ ...r, slug: slugify(r.title) }));
