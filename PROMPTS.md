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