import type { Experience } from "@/lib/types.ts";

export const career: Experience[] = [
  {
    name: "Epic Systems",
    href: "https://www.epic.com/",
    title: "Software Developer",
    logo: "/epic.png",
    start: "2023-07",
    location: "Madison, WI",
    summary:
      "I work closely with cross-functional teams, customers, and end users to ship projects for some of the largest health plans in the country.",
    stack: ["React", "TypeScript", "Redux", "Sass", "C#", ".NET", "MUMPS"],
  },
  {
    name: "Workday",
    href: "https://www.workday.com/",
    title: "Software Application Engineer Intern",
    logo: "/workday.png",
    start: "2022-05",
    end: "2022-08",
    location: "Pleasanton, CA",
    summary:
      "Summer internship on the Customer Experience Platform team. I helped them migrate to React and took their test coverage to 100%.",
    stack: ["React", "Testing Library", "Enzyme"],
  },
  {
    name: "Xircle",
    title: "Mobile Software Engineer",
    logo: "/xircle.png",
    start: "2021-11",
    end: "2022-06",
    location: "San Jose, CA",
    summary:
      "A faculty-backed student startup building a social app for college students, with 500+ active users. I owned the profile and settings experience in React Native.",
    stack: ["React Native", "Redux", "AWS Lambda", "S3"],
  },
  {
    name: "Hakkei",
    title: "Software Engineer Intern",
    logo: "/hakkei.png",
    start: "2020-11",
    end: "2021-03",
    location: "Sunnyvale, CA",
    summary:
      "My first engineering job. I built the web app people used to remap the keys on Hakkei’s ergonomic keyboard.",
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Sass",
      "AWS Amplify",
      "Cognito",
      "DynamoDB",
    ],
  },
];
