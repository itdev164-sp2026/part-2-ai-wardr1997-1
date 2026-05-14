"use server"

import { createActionSupabaseClient } from "@/lib/supabase/action"
import { projectSchema, type Project } from "@/lib/schemas"

type ActionResult = {
  success: boolean
  message: string
}

export async function createProject(data: unknown): Promise<ActionResult> {
  // Validate form data again with Zod schema (server-side validation)
  const validationResult = projectSchema.safeParse(data)

  if (!validationResult.success) {
    const errors = validationResult.error.issues
      .map((err) => err.message)
      .join(", ")

    return {
      success: false,
      message: errors,
    }
  }

  const validatedData: Project = validationResult.data

  // Insert the validated data into the Supabase "projects" table
  const supabase = await createActionSupabaseClient()

  const { error } = await supabase.from("projects").insert([
    {
      title: validatedData.title,
      description: validatedData.description,
      status: validatedData.status,
    },
  ])

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: "Project created successfully",
  }
}
