"use client"

import type * as React from "react"
import {
  PaintbrushIcon,
  LayoutDashboardIcon,
  CalendarDaysIcon,
  Users2Icon,
  MapPinIcon,
  Building2Icon,
  GiftIcon,
  LayoutTemplateIcon,
  HelpCircleIcon,
  SearchIcon,
  SettingsIcon,
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
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Schedule",
      url: "#",
      icon: CalendarDaysIcon,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplateIcon,
    },
  ],
  navDocuments: [
    {
      name: "Instructors",
      url: "#",
      icon: Users2Icon,
    },
    {
      name: "Locations",
      url: "#",
      icon: MapPinIcon,
    },
    {
      name: "Gift Certificates",
      url: "#",
      icon: GiftIcon,
    },
    {
      name: "Private Events",
      url: "#",
      icon: Building2Icon,
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <PaintbrushIcon className="h-5 w-5" />
                <span className="text-2xl font-semibold">Artbar Tokyo</span>
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
