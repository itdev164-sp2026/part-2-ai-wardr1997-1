import { Code, Database, Globe, Palette, Smartphone, Zap, CheckCircle2 } from "lucide-react";
import { SkillCard } from "@/components/skill-card";

const skills = [
  {
    name: "React",
    icon: <Smartphone className="h-8 w-8" />,
    description: "Building interactive UIs with React and hooks",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-8 w-8" />,
    description: "Type-safe JavaScript development",
  },
  {
    name: "Tailwind CSS",
    icon: <Palette className="h-8 w-8" />,
    description: "Responsive design with utility-first CSS",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-8 w-8" />,
    description: "Full-stack web applications with App Router",
  },
  {
    name: "JavaScript",
    icon: <Zap className="h-8 w-8" />,
    description: "Modern ES6+ JavaScript development",
  },
  {
    name: "Web Development",
    icon: <Database className="h-8 w-8" />,
    description: "Front-end and full-stack web development",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Robert Ward</h1>
          <p className="text-lg text-muted-foreground">
            Web Development Student | Full-Stack Developer in Progress
          </p>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          I am a passionate web development student learning to build modern,
          AI-native full-stack applications using Next.js, TypeScript, and Tailwind CSS.
I&apos;m focused on mastering both frontend and backend technologies to create
          seamless user experiences and scalable web applications.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              description={skill.description}
            />
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center pt-4">
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 dark:bg-green-950">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Setup verified
          </span>
        </div>
      </section>
    </div>
  );
}
