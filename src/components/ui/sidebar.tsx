"use client"

import * as React from "react"
import { PanelLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleMobileSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const toggleSidebar = React.useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])
  const toggleMobileSidebar = React.useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleSidebar, mobileOpen, setMobileOpen, toggleMobileSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("flex min-h-screen flex-1 flex-col bg-background", className)}
      {...props}
    />
  )
}

export function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { collapsed } = useSidebar()

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "hidden border-r bg-card text-card-foreground transition-all duration-300 md:flex md:flex-col",
        collapsed ? "md:w-16" : "md:w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("border-b p-3", className)} {...props} />
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex-1 overflow-y-auto p-2", className)} {...props} />
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("border-t p-2", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("space-y-1", className)} {...props} />
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn(className)} {...props} />
}

export function SidebarMenuButton({
  className,
  isActive,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean
  asChild?: boolean
}) {
  const Comp: any = asChild ? "span" : "button"

  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

export function SidebarMobileTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleMobileSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 md:hidden", className)}
      onClick={toggleMobileSidebar}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

export function SidebarMobile({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { mobileOpen, setMobileOpen } = useSidebar()

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        data-mobile-open={mobileOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card text-card-foreground transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}
