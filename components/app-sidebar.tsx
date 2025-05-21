"use client"

import type * as React from "react"
import {
  Calendar,
  LayoutDashboardIcon,
  MapPin,
  Palette,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Scheduling",
      url: "/scheduling",
      icon: Calendar,
    },
    {
      title: "Instructors",
      url: "/instructors",
      icon: UsersIcon,
    },
    {
      title: "Calendar",
      url: "/events",
      icon: Palette,
    },
    {
      title: "Locations",
      url: "/locations",
      icon: MapPin,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background" {...props}>
      <SidebarHeader className="flex items-center justify-center p-4 h-[80px]">
        <Link href="/dashboard" className="flex w-full justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-black%20%285%29-7VlW8Vv28HicXieXSskv296fVjqw8S.png"
            alt="Paintly Logo"
            className="h-[50px] w-[50px] object-contain"
            style={{
              minWidth: "50px",
              minHeight: "50px",
            }}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
