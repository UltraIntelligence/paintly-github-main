"use client"

import type * as React from "react"
import {
  PaintbrushIcon,
  PaletteIcon,
  CalendarDaysIcon,
  Users2Icon,
  MapPinIcon,
  Building2Icon,
  GiftIcon,
  ImageIcon,
  HelpCircleIcon,
  SearchIcon,
  SettingsIcon,
  ListIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavDocuments } from "./nav-documents"

const data = {
  user: {
    name: "Cathy Thompson",
    email: "tokyo@artbar.co.jp",
    avatar: "/images/cathy-avatar.png",
  },
  navMain: [
    {
      title: "Today",
      url: "/dashboard",
      icon: PaletteIcon,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: CalendarDaysIcon,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: ImageIcon,
    },
    {
      title: "Listings",
      url: "/discover",
      icon: ListIcon,
    },
    // Remove the Corporate Templates item
  ],
  navDocuments: [
    {
      name: "Instructors",
      url: "/instructors",
      icon: Users2Icon,
    },
    {
      name: "Locations",
      url: "/locations",
      icon: MapPinIcon,
    },
    {
      name: "Gift Certificates",
      url: "/gift-certificates",
      icon: GiftIcon,
    },
    {
      name: "Private Events",
      url: "/private-events",
      icon: Building2Icon,
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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <PaintbrushIcon className="h-5 w-5" />
                <span className="text-base font-semibold text-black">Artbar Tokyo</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navDocuments} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
