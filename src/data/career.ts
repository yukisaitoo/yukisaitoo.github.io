import type { Experience } from "@/lib/types.ts";

// Each role gets a short summary of the time there, not résumé bullets: the
// résumé PDF carries the detail. Facts come from the resume vault.
export const career: Experience[] = [
  {
    name: "Epic Systems",
    href: "https://www.epic.com/",
    title: "Software Developer",
    logo: "/epic.png",
    start: "Jul 2023",
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
    start: "May 2022",
    end: "Aug 2022",
    location: "Pleasanton, CA",
    summary:
      "Summer internship on the Customer Experience Platform team. I helped them migrate to React and took their test coverage to 100%.",
    stack: ["React", "Testing Library", "Enzyme"],
  },
  {
    name: "Xircle",
    title: "Mobile Software Engineer",
    logo: "/xircle.png",
    start: "Nov 2021",
    end: "Jun 2022",
    location: "San Jose, CA",
    summary:
      "A faculty-backed student startup building a social app for college students, with 500+ active users. I owned the profile and settings experience in React Native.",
    stack: ["React Native", "Redux", "AWS Lambda", "S3"],
  },
  {
    name: "Hakkei",
    title: "Software Engineer Intern",
    logo: "/hakkei.png",
    start: "Nov 2020",
    end: "Mar 2021",
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
