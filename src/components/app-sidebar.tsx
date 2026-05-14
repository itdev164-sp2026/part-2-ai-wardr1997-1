"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import { FolderOpen, Home, LogOut, Settings, UserCircle2 } from "lucide-react"

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
import { signOut } from "@/app/auth-actions"

const navItems = [
  { title: "Overview", href: "/", icon: Home, active: true },
  { title: "Projects", href: "/projects", icon: FolderOpen },
  { title: "Settings", href: "#", icon: Settings },
]

const navItemsMobile = [
  { title: "Overview", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Settings", href: "#" },
]

function SidebarContentInner({
  collapsed = false,
  onNavClick,
  user,
}: {
  collapsed?: boolean
  onNavClick?: () => void
  user: User | null
}) {
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
        {user ? (
          <form action={signOut} className="mb-2">
            <SidebarMenuButton
              className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </form>
        ) : null}
        <p className={cn("text-xs text-muted-foreground", collapsed && "text-center")}>
          {collapsed ? "v1" : "Dashboard v1.0"}
        </p>
      </SidebarFooter>
    </>
  )
}

function MobileSidebarContent({
  onNavClick,
  user,
}: {
  onNavClick?: () => void
  user: User | null
}) {
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
        {user ? (
          <form action={signOut} className="px-2 pb-2">
            <SidebarMenuButton className="w-full justify-start text-base">
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </form>
        ) : null}
        <p className="text-xs text-muted-foreground px-3 py-2">
          Dashboard v1.0
        </p>
      </SidebarFooter>
    </>
  )
}

export function AppSidebar({ user }: { user: User | null }) {
  const { collapsed, setMobileOpen } = useSidebar()

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  // Use raw content for mobile (shown in SidebarMobile which doesn't use Sidebar wrapper)
  return <MobileSidebarContent onNavClick={handleNavClick} user={user} />
}

export function AppSidebarDesktop({ user }: { user: User | null }) {
  const { collapsed } = useSidebar()

  return (
    <Sidebar>
      <SidebarContentInner collapsed={collapsed} user={user} />
    </Sidebar>
  )
}
