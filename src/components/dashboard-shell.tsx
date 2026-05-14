"use client"

import type { User } from "@supabase/supabase-js"
import { PanelLeftClose } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { AppSidebar, AppSidebarDesktop } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger, SidebarMobile, SidebarMobileTrigger, useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

function MobileSidebarWithClose({ user }: { user: User | null }) {
  const { setMobileOpen } = useSidebar()
  
  return (
    <SidebarMobile>
      <div className="flex h-full flex-col">
        {/* Header with close button */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(false)}
          >
            Close
          </Button>
        </div>
        {/* Sidebar content (text-based, no icons) */}
        <AppSidebar user={user} />
      </div>
    </SidebarMobile>
  )
}

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | null
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        {/* Mobile sidebar */}
        <MobileSidebarWithClose user={user} />

        {/* Desktop sidebar */}
        <AppSidebarDesktop user={user} />

        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background px-4">
<div className="flex items-center gap-3">
              {/* Single trigger that works for both mobile and desktop */}
              <SidebarMobileTrigger />
              <BreadcrumbNav />
            </div>
            <ModeToggle />
          </header>

          <div className="w-full flex-1 px-4 py-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
