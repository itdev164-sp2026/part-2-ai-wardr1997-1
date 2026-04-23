import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  description?: string;
}

export function SkillCard({ name, icon, description }: SkillCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6",
        "transition-colors hover:bg-accent"
      )}
    >
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="font-semibold text-foreground">{name}</h3>
      {description && (
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
