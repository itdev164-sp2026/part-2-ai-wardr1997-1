import { test, expect, type Page } from "@playwright/test"

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD

function ensureCredentialsOrSkip() {
  test.skip(
    !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
    "Skipping credentialed auth test: TEST_USER_EMAIL and TEST_USER_PASSWORD must be set."
  )
}

async function loginWithValidCredentials(page: Page) {
  await page.goto("/login")
  await expect(page).toHaveURL(/\/login/)

  await page.getByLabel(/email/i).fill(TEST_USER_EMAIL!)
  await page.getByLabel(/password/i).fill(TEST_USER_PASSWORD!)

  await page.getByRole("button", { name: /^sign in$/i }).last().click()
}

test.describe("Supabase Auth E2E", () => {
  test("LOGIN PAGE VISIBLE: shows email/password inputs and a submit button on /login", async ({
    page,
  }) => {
    await page.goto("/login")
    await expect(page).toHaveURL(/\/login/)

    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /^sign in$/i }).last()).toBeVisible()
  })

  test("REDIRECT AFTER LOGIN: successful login redirects to dashboard or projects page", async ({
    page,
  }) => {
    ensureCredentialsOrSkip()

    await loginWithValidCredentials(page)

    await page.waitForURL((url) => {
      const path = url.pathname
      return path === "/" || path.startsWith("/projects")
    })

    await expect(page).toHaveURL(/^(?!.*\/login).*$/)
  })

  test("SIDEBAR NAVIGATION: after login, sidebar shows Overview, Projects, and Settings links", async ({
    page,
  }) => {
    ensureCredentialsOrSkip()

    await loginWithValidCredentials(page)

    await page.waitForURL((url) => {
      const path = url.pathname
      return path === "/" || path.startsWith("/projects")
    })

    await expect(page.getByRole("link", { name: /overview/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /projects/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /settings/i })).toBeVisible()
  })
})
