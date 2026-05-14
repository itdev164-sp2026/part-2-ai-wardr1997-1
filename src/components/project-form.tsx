"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createProject } from "../app/actions"
import { projectSchema, type Project } from "@/lib/schemas"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  })

  const onSubmit = async (data: Project) => {
    const result = await createProject(data)

    if (result.success) {
      toast.success(result.message)
      reset({
        title: "",
        description: "",
        status: "active",
      })
      return
    }

    toast.error(result.message)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter project title"
          aria-invalid={!!errors.title}
        />
        <FieldError errors={errors.title ? [{ message: errors.title.message }] : undefined} />
      </Field>

      <Field data-invalid={!!errors.description}>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter project description"
          rows={4}
          aria-invalid={!!errors.description}
        />
        <FieldError
          errors={errors.description ? [{ message: errors.description.message }] : undefined}
        />
      </Field>

      <Field data-invalid={!!errors.status}>
        <FieldLabel>Status</FieldLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-invalid={!!errors.status}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={errors.status ? [{ message: errors.status.message }] : undefined} />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  )
}
