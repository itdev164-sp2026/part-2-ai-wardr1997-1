"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const pageNames: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/settings": "Settings",
};

export function BreadcrumbNav() {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || "Overview";

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">
        <li className="font-medium text-foreground">ITDEV-164</li>
        <li>
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>{pageName}</li>
      </ol>
    </nav>
  );
}
