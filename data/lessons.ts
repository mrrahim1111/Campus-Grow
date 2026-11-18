export type Lesson = {
  id: string;
  title: string;
  category: string;
  description: string;
  route: string;
  order: number;
};

export const cLessons: Lesson[] = [
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    category: "Programming Basics",
    description:
      "Understand what programming is and how programmers solve problems.",
    route: "/lessons/programming-fundamentals",
    order: 1,
  },

  {
    id: "c-programming",
    title: "Introduction to C",
    category: "C Programming",
    description:
      "Learn what C is and write your first C program.",
    route: "/lessons/c-programming",
    order: 2,
  },

  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    category: "C Programming",
    description:
      "Learn how C stores information using variables and data types.",
    route: "/lessons/variables-data-types",
    order: 3,
  },

  {
    id: "input-output",
    title: "Input & Output",
    category: "C Programming",
    description:
      "Learn how to display information and take input from users.",
    route: "/lessons/input-output",
    order: 4,
  },

  {
    id: "operators",
    title: "Operators",
    category: "C Programming",
    description:
      "Learn arithmetic, relational, logical, and assignment operators.",
    route: "/lessons/operators",
    order: 5,
  },

  {
    id: "conditional-statements",
    title: "Conditional Statements",
    category: "C Programming",
    description:
      "Learn how programs make decisions using if, else, and switch.",
    route: "/lessons/conditional-statements",
    order: 6,
  },

  {
    id: "loops",
    title: "Loops",
    category: "C Programming",
    description:
      "Learn how to repeat instructions using for, while, and do-while.",
    route: "/lessons/loops",
    order: 7,
  },

  {
    id: "functions",
    title: "Functions",
    category: "C Programming",
    description:
      "Learn how to divide a program into reusable blocks of code.",
    route: "/lessons/functions",
    order: 8,
  },

  {
    id: "arrays-strings",
    title: "Arrays & Strings",
    category: "C Programming",
    description:
      "Learn how to store collections of values and work with strings.",
    route: "/lessons/arrays-strings",
    order: 9,
  },

  {
    id: "pointers-mini-project",
    title: "Pointers + Mini Project",
    category: "C Programming",
    description:
      "Understand pointers and apply your C knowledge in a small project.",
    route: "/lessons/pointers-mini-project",
    order: 10,
  },
];

// Re-export full multi-track curriculum
export {
  ALL_CURRICULUM_TRACKS,
  getCurriculumForStudent,
  type CurriculumLesson,
  type CurriculumTrack,
} from "./courseCurriculum";