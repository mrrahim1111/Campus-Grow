export type Roadmap = {
  title: string;
  description: string;
  lessons: string[];
};

export const roadmaps: Record<string, Roadmap> = {
  web: {
    title: "Web Development",
    description: "Learn how websites and full-stack applications are built.",
    lessons: [
      "Programming Fundamentals",
      "HTML",
      "CSS",
      "JavaScript",
      "Git & GitHub",
      "React",
      "Backend Basics",
      "Databases",
      "Build a Full-Stack Project",
      "Placement & Interview Preparation",
    ],
  },

  app: {
    title: "App Development",
    description: "Learn how to build useful mobile applications.",
    lessons: [
      "Programming Fundamentals",
      "Git & GitHub",
      "UI & UX Basics",
      "Mobile Development Fundamentals",
      "App Navigation",
      "APIs",
      "Databases",
      "Authentication",
      "Build Your First App",
      "Placement & Interview Preparation",
    ],
  },

  ai: {
    title: "AI & Machine Learning",
    description: "Build the foundation needed to start working with AI.",
    lessons: [
      "Programming Fundamentals",
      "C Programming",
      "Python",
      "Data Structures",
      "Git & GitHub",
      "SQL",
      "Python for Data Science",
      "Machine Learning Basics",
      "Build an AI Project",
      "Placement & Interview Preparation",
    ],
  },

  data: {
    title: "Data Science",
    description: "Learn how to work with data and extract useful insights.",
    lessons: [
      "Programming Fundamentals",
      "Python",
      "Data Structures",
      "SQL",
      "Statistics Basics",
      "NumPy & Pandas",
      "Data Visualization",
      "Data Analysis",
      "Build a Data Project",
      "Placement & Interview Preparation",
    ],
  },

  cyber: {
    title: "Cybersecurity",
    description: "Build a strong foundation in systems, networks and security.",
    lessons: [
      "Programming Fundamentals",
      "Linux Basics",
      "Computer Networks",
      "Operating Systems",
      "Git & GitHub",
      "Web Security Basics",
      "Cybersecurity Fundamentals",
      "Ethical Security Practices",
      "Build a Security Project",
      "Placement & Interview Preparation",
    ],
  },

  cloud: {
    title: "Cloud & DevOps",
    description: "Learn how applications are deployed and managed.",
    lessons: [
      "Programming Fundamentals",
      "Linux Basics",
      "Git & GitHub",
      "Networking Basics",
      "Cloud Fundamentals",
      "Docker",
      "CI/CD",
      "Cloud Deployment",
      "Build a Cloud Project",
      "Placement & Interview Preparation",
    ],
  },

  dsa: {
    title: "DSA & Problem Solving",
    description: "Build strong programming and problem-solving skills.",
    lessons: [
      "Programming Fundamentals",
      "C Programming",
      "Arrays & Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Trees",
      "Graphs",
      "Sorting & Searching",
      "Dynamic Programming",
      "Competitive Programming",
    ],
  },
};