"use client"

import { ChevronRight, PanelLeftClose } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { AppSidebar, AppSidebarDesktop } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger, SidebarMobile, SidebarMobileTrigger, useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

function MobileSidebarWithClose() {
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
        <AppSidebar />
      </div>
    </SidebarMobile>
  )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        {/* Mobile sidebar */}
        <MobileSidebarWithClose />
        
        {/* Desktop sidebar */}
        <AppSidebarDesktop />

        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background px-4">
            <div className="flex items-center gap-3">
              {/* Single trigger that works for both mobile and desktop */}
              <SidebarMobileTrigger />
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex items-center gap-2">
                  <li className="font-medium text-foreground">Dashboard</li>
                  <li>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li>Overview</li>
                </ol>
              </nav>
            </div>
            <ModeToggle />
          </header>

          <div className="w-full flex-1 px-4 py-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
