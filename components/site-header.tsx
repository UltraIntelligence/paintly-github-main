"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SiteHeader() {
  const pathname = usePathname()

  // Function to get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard" || pathname === "/") {
      return "Welcome back, Cathy."
    }

    // Extract page name from pathname
    const pageName = pathname.split("/").pop() || ""
    // Capitalize first letter
    return pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>

        {/* Language Toggle - positioned on far right */}
        <div className="flex items-center space-x-2 ml-auto">
          <Label htmlFor="language-toggle" className="text-sm font-medium">
            EN
          </Label>
          <Switch id="language-toggle" className="data-[state=checked]:bg-blue-500" />
          <Label htmlFor="language-toggle" className="text-sm font-medium">
            JA
          </Label>
        </div>
      </div>
    </header>
  )
}
