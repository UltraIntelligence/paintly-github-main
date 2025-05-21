"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function SiteHeader() {
  const pathname = usePathname()

  // Get the page title based on the current path
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Welcome back, Cathy."
    if (pathname.includes("/dashboard")) return "Home"
    if (pathname.includes("/scheduling")) return "Calendar"
    if (pathname.includes("/instructors")) return "Instructors"
    if (pathname.includes("/events")) return "Templates"
    if (pathname.includes("/locations")) return "Locations"
    if (pathname.includes("/settings")) return "Settings"
    if (pathname.includes("/help")) return "Help Center"
    if (pathname.includes("/search")) return "Search"
    return "Home"
  }

  // Get the base URL for the current page section
  const getPageUrl = () => {
    if (pathname.includes("/dashboard")) return "/dashboard"
    if (pathname.includes("/scheduling")) return "/scheduling"
    if (pathname.includes("/instructors")) return "/instructors"
    if (pathname.includes("/events")) return "/events"
    if (pathname.includes("/locations")) return "/locations"
    if (pathname.includes("/settings")) return "/settings"
    if (pathname.includes("/help")) return "/help"
    if (pathname.includes("/search")) return "/search"
    return "/"
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Link href={getPageUrl()} className={`${pathname === "/dashboard" ? "" : "hover:underline"}`}>
          <h1 className="text-base font-medium">{getPageTitle()}</h1>
        </Link>
      </div>
    </header>
  )
}
