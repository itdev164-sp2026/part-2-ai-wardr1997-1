"use client"

import Link from "next/link"
import { FolderOpen, Home, Settings, UserCircle2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Overview", href: "/", icon: Home, active: true },
  { title: "Projects", href: "#", icon: FolderOpen },
  { title: "Settings", href: "#", icon: Settings },
]

const navItemsMobile = [
  { title: "Overview", href: "/" },
  { title: "Projects", href: "#" },
  { title: "Settings", href: "#" },
]

function SidebarContentInner({ collapsed = false, onNavClick }: { collapsed?: boolean; onNavClick?: () => void }) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <UserCircle2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">Developer Dashboard</p>
              <p className="text-xs text-muted-foreground">ITDEV-164</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} onClick={onNavClick}>
                <SidebarMenuButton
                  isActive={item.active}
                  className={cn(collapsed && "justify-center px-2")}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <p className={cn("text-xs text-muted-foreground", collapsed && "text-center")}>
          {collapsed ? "v1" : "Dashboard v1.0"}
        </p>
      </SidebarFooter>
    </>
  )
}

function MobileSidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <>
      <SidebarContent>
        <SidebarMenu>
          {navItemsMobile.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.href} onClick={onNavClick}>
                <SidebarMenuButton
                  className="w-full justify-start text-base"
                >
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-muted-foreground px-3 py-2">
          Dashboard v1.0
        </p>
      </SidebarFooter>
    </>
  )
}

export function AppSidebar() {
  const { collapsed, setMobileOpen } = useSidebar()

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  // Use raw content for mobile (shown in SidebarMobile which doesn't use Sidebar wrapper)
  return <MobileSidebarContent onNavClick={handleNavClick} />
}

export function AppSidebarDesktop() {
  const { collapsed } = useSidebar()

  return (
    <Sidebar>
      <SidebarContentInner collapsed={collapsed} />
    </Sidebar>
  )
}
