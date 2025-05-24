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
  ImageIcon,
  BarChartIcon,
  CameraIcon,
  FileCodeIcon,
  FileTextIcon,
  HelpCircleIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { CalendarSidebar } from "./calendar-sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
      title: "Events",
      url: "#",
      icon: CalendarDaysIcon,
    },
    {
      title: "Instructors",
      url: "#",
      icon: Users2Icon,
    },
    {
      title: "Locations",
      url: "#",
      icon: MapPinIcon,
    },
    {
      title: "Corporate",
      url: "#",
      icon: Building2Icon,
    },
    {
      title: "Gift Certificates",
      url: "#",
      icon: GiftIcon,
    },
    {
      title: "Banners",
      url: "#",
      icon: ImageIcon,
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChartIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
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
                <span className="text-base font-semibold">Artbar Tokyo</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
        <div className="mt-4 group-data-[collapsible=icon]:hidden">
          <CalendarSidebar />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
