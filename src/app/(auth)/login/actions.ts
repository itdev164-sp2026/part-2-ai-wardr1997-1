"use server"

import { redirect } from "next/navigation"
import { createActionSupabaseClient } from "@/lib/supabase/action"

function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export async function signInWithEmail(formData: FormData) {
  const email = getString(formData, "email").trim()
  const password = getString(formData, "password")

  if (!email || !password) {
    redirect("/login?mode=signin&error=Email and password are required")
  }

  const supabase = await createActionSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/login?mode=signin&error=${encodeURIComponent(error.message)}`)
  }

  redirect("/projects")
}

export async function signUpWithEmail(formData: FormData) {
  const email = getString(formData, "email").trim()
  const password = getString(formData, "password")

  if (!email || !password) {
    redirect("/login?mode=signup&error=Email and password are required")
  }

  const supabase = await createActionSupabaseClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect(`/login?mode=signup&error=${encodeURIComponent(error.message)}`)
  }

  redirect("/login?mode=signin&message=Check your email to confirm your account")
}
