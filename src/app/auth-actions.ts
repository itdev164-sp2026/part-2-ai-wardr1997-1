"use server"

import { redirect } from "next/navigation"
import { createActionSupabaseClient } from "@/lib/supabase/action"

export async function signOut() {
  const supabase = await createActionSupabaseClient()
  await supabase.auth.signOut()
  redirect("/login")
}
