import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
};

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  };

  const colorClass = statusColors[status.toLowerCase()] || statusColors.archived;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
}

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: projects } = await supabase.from("projects").select('*');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          View and manage your projects
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <StatusBadge status={project.status} />
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Project ID: {project.id}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No projects yet</CardTitle>
            <CardDescription>
              There are no projects in the database. Add some projects to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
