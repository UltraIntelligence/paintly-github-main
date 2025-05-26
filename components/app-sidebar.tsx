"use client"

import { TrendingUpIcon, CompassIcon, StarIcon, SettingsIcon, SquareTerminal, Bot, BookOpen } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { Separator } from "@/components/ui/separator"
import { NavDocuments } from "./nav-documents"

export function AppSidebar({ variant }: { variant: "inset" | "icon" }) {
  const { collapsed, onCollapse } = useSidebar()

  const navMainItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: Bot,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: BookOpen,
    },
  ]

  const navSecondaryItems = [
    {
      title: "Trending",
      url: "#",
      icon: TrendingUpIcon,
    },
    {
      title: "Explore",
      url: "#",
      icon: CompassIcon,
    },
    {
      title: "Favourites",
      url: "#",
      icon: StarIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: SettingsIcon,
    },
  ]

  const navDocumentsItems = [
    {
      name: "Cover page",
      url: "#",
      icon: SettingsIcon,
    },
    {
      name: "Table of contents",
      url: "#",
      icon: SettingsIcon,
    },
    {
      name: "Executive summary",
      url: "#",
      icon: SettingsIcon,
    },
    {
      name: "Technical approach",
      url: "#",
      icon: SettingsIcon,
    },
    {
      name: "Design",
      url: "#",
      icon: SettingsIcon,
    },
    {
      name: "Capabilities",
      url: "#",
      icon: SettingsIcon,
    },
  ]

  const user = {
    name: "Cathy Truman",
    email: "cathy@example.com",
    avatar: "/images/cathy-avatar.png",
  }

  return (
    <aside
      data-collapsible={variant}
      className="sidebar-wrapper fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-sidebar data-[collapsible=inset]:w-16 data-[collapsible=icon]:w-16 data-[collapsed=true]:translate-x-[-100%]"
    >
      <div className="flex-1 overflow-y-auto py-2">
        <NavUser user={user} />
        <Separator className="my-2" />
        <NavMain items={navMainItems} />
        <Separator className="my-2" />
        <NavDocuments items={navDocumentsItems} />
        <Separator className="my-2" />
        <NavSecondary items={navSecondaryItems} />
      </div>
    </aside>
  )
}
