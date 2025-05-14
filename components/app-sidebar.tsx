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
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Scheduling",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Instructors",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Events",
      url: "#",
      icon: Palette,
    },
    {
      title: "Locations",
      url: "#",
      icon: MapPin,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center p-4">
        <a href="#" className="flex w-full justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-black%20%285%29-7VlW8Vv28HicXieXSskv296fVjqw8S.png"
            alt="Paintly Logo"
            className="h-[60px] w-[60px] object-contain"
            style={{
              minWidth: "60px",
              minHeight: "60px",
            }}
          />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
