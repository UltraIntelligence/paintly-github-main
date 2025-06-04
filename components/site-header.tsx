"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SiteHeader() {
  const pathname = usePathname()

  // Function to get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard" || pathname === "/") {
      return "Welcome back, Cathy."
    }

    if (pathname === "/gift-certificates") {
      return "Gift Certificates"
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
        <Breadcrumb>
          <BreadcrumbList>
            {pathname.startsWith("/locations/") && pathname !== "/locations" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/locations" className="text-base font-medium">
                    Locations
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {pathname === "/locations/daikanyama" && "Daikanyama"}
                    {pathname === "/locations/ginza" && "Ginza"}
                    {pathname === "/locations/cat-street" && "Cat Street"}
                    {pathname === "/locations/yokohama" && "Yokohama"}
                    {pathname === "/locations/osaka" && "Osaka"}
                    {pathname === "/locations/okinawa" && "Okinawa"}
                    {pathname === "/locations/fukuoka" && "Fukuoka"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : pathname.startsWith("/instructors/") && pathname !== "/instructors" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/instructors" className="text-base font-medium">
                    Instructors
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : pathname.startsWith("/schedule/") && pathname !== "/schedule" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/schedule" className="text-base font-medium">
                    Schedule
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : pathname.startsWith("/templates/") && pathname !== "/templates" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/templates" className="text-base font-medium">
                    Templates
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : pathname.startsWith("/settings/") && pathname !== "/settings" ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/settings" className="text-base font-medium">
                    Settings
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium">
                    {pathname.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base font-medium">{getPageTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

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
