import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInWithEmail, signUpWithEmail } from "./actions"

type LoginPageProps = {
  searchParams?: Promise<{
    mode?: string
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const mode = params?.mode === "signup" ? "signup" : "signin"
  const error = params?.error
  const message = params?.message

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? "Sign up with your email and password to continue."
              : "Sign in with your email and password to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant={mode === "signin" ? "default" : "outline"}>
              <Link href="/login?mode=signin">Sign In</Link>
            </Button>
            <Button asChild variant={mode === "signup" ? "default" : "outline"}>
              <Link href="/login?mode=signup">Sign Up</Link>
            </Button>
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-300">
              {message}
            </p>
          ) : null}

          <form action={mode === "signup" ? signUpWithEmail : signInWithEmail} className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
