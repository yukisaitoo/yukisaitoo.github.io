import data from "@/data/skills.json";
import { skillSchema } from "@/lib/schemas";
import Image from "next/image";

export default function Skills() {
  const skills = skillSchema.parse(data).skills;

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 md:grid-rows-2">
      {skills.map((skill) => {
        return (
          <div
            className="flex h-full w-full flex-row space-x-3 rounded-xl border-2 border-transparent bg-muted p-1.5 transition duration-150 hover:border-foreground"
            key={skill.name}
          >
            <div
              className="group flex aspect-square h-full w-auto items-center justify-center rounded-lg"
              style={{
                backgroundColor: skill.iconBg,
                padding: !!skill.iconBg ? "0.25rem" : "",
              }}
            >
              <Image
                className="rounded-sm transition-all duration-150 group-hover:scale-105"
                src={`/${skill.icon}`}
                alt={`${skill.name}`}
                width={40}
                height={40}
                style={{ width: "40px", height: "40px" }}
                priority
              />
            </div>
            <div className="items-left flex flex-col justify-center">
              <p className="text-base">{skill.name}</p>
              <p className="text-xs text-muted-foreground">
                {skill.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
