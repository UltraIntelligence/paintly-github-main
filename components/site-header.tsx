"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  // Get the page title based on the current path
  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Paintly Dashboard"
    if (pathname.includes("/scheduling")) return "Scheduling"
    if (pathname.includes("/instructors")) return "Instructors"
    if (pathname.includes("/events")) return "Events"
    if (pathname.includes("/locations")) return "Locations"
    if (pathname.includes("/settings")) return "Settings"
    if (pathname.includes("/help")) return "Help Center"
    if (pathname.includes("/search")) return "Search"
    return "Paintly Dashboard"
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>
      </div>
    </header>
  )
}
