# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> What framework and version am I using?
> What styling solution is configured?
> What components exist so far?
> Then add a small "Setup verified(check mark)" badge to the bottom of the home page.

**What happened:**
> The agent took my prompt and began its processes before telling me my framework and components like I asked. Then it created the setup verified at the bottom of the page as requested all without giving me errors.


### Prompt 2
**What I asked:**
> Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
> Replace the current homepage content with a "Developer Profile" page for me.
> It should include:
     My name: [Robert Ward]
     A short bio (1-2 sentences about being a web development student)
     A "Skills" section that displays at least 6 skills in a responsive
    Tailwind CSS grid (use cards with icons from lucide-react)

>Keep the existing Header component and layout structure intact.
    If you need to create new components, go ahead and create them in
    the src/components/ folder.

**What happened:**
> The agent completed these tasks without any complications.

### Reflection
     It was pretty neat to see the way it worked on the project and managed to do it without errors, I am used to consistently correcting chat gpt. I have looked into this way of coding previously in my free-time, I'm actually attempting to learn the process for openclaw because I like the idea of having little worker agents that do little tasks for me. I feel like I'm Iron Man.
    I would pay more attention to the process happening after I give my prompt. I am interested in the way the bot thinks and how it decides what to do and where.

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

> Using the shadcn sidebar components that are now in my src/components/ui/ folder,
    create a professional, collapsible dashboard layout. It should include:

> A sidebar (src/components/app-sidebar.tsx) with navigation links for:
    Overview (use the Home icon from lucide-react)
    Projects (use the FolderOpen icon)
    Settings (use the Settings icon)

 >A top navigation area with breadcrumbs showing the current page.

 >A main content area that wraps the existing page content.

 >Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

>Important: Preserve the Developer Profile content from Activity 1 in
    src/app/page.tsx — it should appear in the main content area of the new layout.
    Keep the dark mode toggle working.


**What happened:**

> Describe how the Agent handled multiple files. Did it create
> app-sidebar.tsx correctly? Did it modify layout.tsx as expected?
    I entered the prompt and before I realized it, the sidebar was created and the web page had a top navigation that told me what page. The menu button was unresponsive at first and overall the webpage was not prepared to go smaller than a tablet screen, otherwise the entire page would go blurry. I let the agent know this and it fixed it after a few micro prompts.

### Prompt 2

**What I asked:**

>The sidebar is not responsive on mobile. It should collapse into a sheet
    (slide-out panel) that opens when clicking a trigger button. The shadcn
    Sidebar component supports this with the "offcanvas" variant or by using
    SidebarTrigger. Please fix the mobile behavior.

**What happened:**

> It created 2 menu buttons, one worked the other did not. The menu was no longer populated with content and there was no way for the user to know where to click in order to close the menu. I prompted the agent on this and the unused button was removed, content was restored in icon form and 2 close menu buttons were created, one did not respond.. After the final prompt telling the agent I needed text and one working button, I was given a working webpage.

### Reflection

> Did the Agent accidentally delete or overwrite any of your Activity 1
> code? If so, how did you recover? (Copilot Edits has an "Undo" /
> "Revert" button — did you use it?) What did you learn about giving
> the Agent context about existing code you want to preserve?

    I have mentioned my experiences in previous questions, I wouldn't do much but repeat those comments here.
    
## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> Using the Supabase client at src/lib/supabase.ts, create a new Server Component
    at src/app/projects/page.tsx that:

    1. Fetches all records from the "projects" table in Supabase
    2. Displays them in a professional layout using shadcn/ui Card components
    (run `npx shadcn@latest add card` if needed)
    3. Each card should show the project title, description, and a status badge
    4. The status badge should be color-coded:
    - "active" = green
    - "completed" = blue
    - "archived" = gray

    Use @workspace context to match the styling of our existing Dashboard.
    This must be a React Server Component (async function, no "use client").
    Do NOT use useEffect or useState for data fetching.


**What happened:**

    The agent required 0 assistance from me, it quickly completed the task efficiently and without issue.

### Prompt 2

**What I asked:**

> The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
    name is hardcoded. Extract the breadcrumb into its own client component at
    src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
    to display the correct page name. Map "/" to "Overview", "/projects" to
    "Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
    breadcrumb segment. Then update layout.tsx to use the new component.


**What happened:**

> The agent made it say Projects without issue or changing the original page.

### Reflection

> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?

    Fetching data on the server in the App Router feels much more direct and organized compared to the useEffect pattern from client-side React apps. In Web Programming 1, using useEffect usually meant creating loading states, managing async functions inside the component, handling errors manually, and sometimes dealing with multiple renders while data was loading. The component would first render empty content and then update after the fetch completed. With server-side data fetching in the App Router, the data is already available before the page is sent to the browser. 

    ## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
    with the following fields:

    - title: string, minimum 3 characters, with a custom error message
    "Title must be at least 3 characters"
    - description: string, minimum 10 characters, with a custom error message
    "Description must be at least 10 characters"
    - status: enum with values "active", "completed", "archived"

    Export the schema and also export the inferred TypeScript type using z.infer.


**What happened:**

> The agent had no issues with completing this tasks. It properly exported the schema, inferred the typescript from the schema using the Z.infer, error handling, and it matched the previous values from previous activities.

### Prompt 2

**What I asked:**

> Using the Zod schema from src/lib/schemas.ts, do the following:

    1. Create a form component at src/components/project-form.tsx that:
    - Is a Client Component ("use client") because it uses react-hook-form hooks
    - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
    - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
    - Uses shadcn/ui Input for title, Textarea for description, and Select for status
    - Shows inline error messages under each field when validation fails
    - Has a "Create Project" submit button
    - Shows a sonner toast notification on successful submission

    1. Create a Server Action at src/app/actions.ts that:
    - Has "use server" at the top of the file
    - Accepts the validated form data
    - Validates it again with the Zod schema (server-side validation)
    - Inserts the validated data into the Supabase "projects" table
    - Returns a success or error response

    1. Create a new page at src/app/projects/new/page.tsx that renders
    the project form within the dashboard layout.

    2. Add a "New Project" button to the existing projects page
    (src/app/projects/page.tsx) that links to /projects/new.

    Use @workspace to match the existing project styling.

**What happened:**

> The free agent could not handle multiple tasks at a time. It would freeze up and try to jump around often mixing up the code.
> The paid agent although costly, handled multiple tasks with seemingly no effort.

### Prompt 3 (if applicable)

**What I asked:**

> (Any follow-up prompt — fixing notifications, adding server-side
> validation, or correcting form field behavior)

**What happened:**

> (Describe the result)

### Reflection

> How does the Schema-First approach with Zod change the way you think
> about forms? How does it help prevent "junk data" from entering the
> database? Compare this to how you handled form validation in
> previous courses.
    The Schema-First approach with Zod changes the way developers think about forms because the validation rules are created before the form is fully built, making the schema the main source of truth for what valid data should look like. Instead of treating validation as something added later with scattered if statements, the schema defines exactly what data is allowed, such as required fields, data types, formatting rules, and minimum or maximum values. This approach makes forms more organized and reliable because both the frontend and backend can use the same schema to validate data consistently. It also helps prevent “junk data” from entering the database because any invalid or incomplete information is rejected before it can be stored. For example, Zod can prevent invalid email formats, missing required fields, or incorrect data types from being submitted, which improves data quality and reduces errors in the application. In previous courses, form validation was usually handled with basic HTML validation or manual if statements inside the code. While that method worked for smaller projects, it often led to repetitive code and inconsistent validation between the frontend and backend. Using Zod is more efficient because all validation rules are centralized into one schema, making the application easier to maintain and reducing the chances of invalid data reaching the database. Strange how developers spent years manually checking every input field like exhausted mall security guards before finally deciding maybe the computer should enforce rules automatically.

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

> Implement a complete email/password authentication flow for this Next.js 15
    App Router project using @supabase/ssr. Here is what I need:

    1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
     src/lib/supabase/ that work correctly with Next.js cookies. I need
    separate clients for Server Components, Server Actions, and Middleware.

    2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
    shadcn/ui card-based login form. It should support both "Sign In"
    and "Sign Up" (toggle between them or use tabs). Handle the auth
    via Server Actions, not client-side fetch.

    3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
    the app directory — Next.js looks for middleware as a sibling of app)
    that:
    - Refreshes the user's auth session on every request
    - Protects the /projects routes — redirect unauthenticated users to /login
    - Allows unauthenticated access to /login
    - Uses supabase.auth.getUser() (NOT getSession()) for verification

    1. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
    (src/components/app-sidebar.tsx) that calls a Server Action to sign
    the user out and redirect to /login. The button must only render
    when an authenticated user is present — pass the user as a prop from
    the root layout (which will need to fetch it via the server Supabase
    client) and gate the Sign Out UI on that prop.

    2. UPDATE DATA QUERIES: Modify the projects page and the create-project
    Server Action to use the authenticated Supabase client so that RLS
    policies filter data per user.

    Use @workspace to understand the existing project structure. Do not remove
    or break existing functionality — integrate auth around it.


**What happened:**

> I gave the agent the context files, then the prompt, and it took off. It read the files and then clarified its understanding before creating a game plan.. It asked me if I was okay with the plan it had created and then it proceeded to complete it in a total of 3 phases, asking me if for my feedback after file creation.

### Prompt 2

**What I asked:**

> (Paste any follow-up — fixing the redirect after login, correcting
> getSession vs getUser, handling middleware route matching, etc.)

**What happened:**

> (Describe the fix and what you learned)

### Reflection

> How did the Agent handle the creation of middleware.ts? Did you have
> to manually add files to the Working Set for context? What surprised
> you about how many files needed to change to add authentication?
> How does middleware-based auth compare to checking login status
> inside each page component?

    The Agent handled the creation of the middleware.ts file without any major problems. It automatically created and updated the files needed for authentication and fixed any errors on its own without asking me for help. I did not have to manually add files to the Working Set because the Agent was able to understand the project structure and make the needed changes automatically. What surprised me most was how many files had to change just to add authentication. I originally thought it would only affect the login page, but authentication connects to many parts of the application, such as routes, protected pages, sessions, and API requests. Middleware-based authentication is better than checking login status inside every page because the middleware acts like a security guard that checks users before they can access protected pages. This keeps the code cleaner and avoids repeating the same login checks throughout the project. Checking login status inside each page would require writing the same logic over and over again, which would make the project harder to manage. Web development really enjoys taking a feature that sounds simple and spreading it across the entire project like glitter in a carpet.

## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

> I have a Next.js app with Supabase Auth. Using @workspace context to
    understand the app structure, write an End-to-End (E2E) test file at
    tests/auth.spec.ts using Playwright.

    The tests should verify:

    1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
    is visible (check for email input, password input, and submit button).

    2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
    the user is redirected to the dashboard or projects page.

    3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
    links are visible: "Overview", "Projects", and "Settings".

    Requirements:
    - Use role-based locators (getByRole, getByLabel, getByText) instead of
    CSS selectors or test IDs. This makes tests more accessible and resilient
    to UI changes.
    - Add clear test descriptions that explain what each test verifies.
    - Handle the async nature of navigation and page loads with proper
    Playwright waiting strategies.
    - Read test credentials from process.env.TEST_USER_EMAIL and
    process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
    variables are not set, the credentialed tests should skip with a clear
    message rather than fail.


**What happened:**

> (Did the Agent use role-based locators? Did it understand the auth
> flow from your workspace context? Did the tests pass on the first run?)

    The agent understood the flow and tests passed on the first go around.

### Prompt 2

**What I asked:**

> There was only one prompt given. Anything else said to the agent was simply giving permission to continue with the task it was given as it would stop periodically and ask if I approved of its current plans and what it has done..

**What happened:**

    After being told it was okay to proceed, the agent would continue on its task.

### Reflection

> How does having an AI write and run tests change your confidence in
> "hitting the deploy button"? Did the Agent catch anything you would
> have missed? How does this compare to manually testing in the browser?

    My confidence goes down, not because I don't trust the code, I looked over it so I know that It is okay and I have tested it before deployment but the issue comes in when I think about how little I was actually needed. I make mistakes, my eyes get tired, I lose focus, the agent doesn't and before an error had any chance to cause any real issues, its already taken care of. This raises red flags in my head because I can see that once my permission to proceed can be written into reliable code, I wont be needed anymore, feels like I'm babysitting until my replacement can decide for itself whether or not it has made the best decision.

### Course Reflection

> Look back at your complete PROMPTS.md from Activity 1 to Activity 6.
> How has your prompting strategy evolved? What do you do differently
> now compared to your first prompt in Activity 1? What is the most
> important thing you learned about working with AI coding tools?

    I learned that even if your prompts aren't perfect as long as you understand what it is that you're trying to accomplish, the agent can make that happen. I have taken the lessons outside of this class and started using this to do other projects as well, my prompts are not ideal half of the time but even if I don't know what to do I can ask the agent and it will work with me to get the job done. If we are being honest, this class shifted my focus, I started out believing my field was secure but over the course of my degree I have watched AI go from just a chatbot that could barely answer coding questions to a junior developer able to read write and test your programs for you and all you need to do is give it your ideas. I have started the process of shifting my focus into engineering with the goal of being a mechatronics engineer. I love what it is able to do and I think it is a useful tool, i just think they're moving it along faster than we the people and the planet are ready for but that's above my pay grade, and I don't think they intend on keeping people around for long. I'm sure they're already trying to figure out how to create the senior developer to guide this one. I have taken time to look into some of the people leading the race of Ai/ big tech in general and these people have so much disdain for everyday people I don't see how this ends well for the public.
