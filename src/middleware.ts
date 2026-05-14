import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabaseClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProjectsRoute = pathname === "/projects" || pathname.startsWith("/projects/")
  const isLoginRoute = pathname === "/login"

  if (isProjectsRoute && !user) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginRoute && user) {
    const projectsUrl = new URL("/projects", request.url)
    return NextResponse.redirect(projectsUrl)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
