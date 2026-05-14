import { ProjectForm } from "@/components/project-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground">Create a new project entry.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill out the form below to create a project.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}
