import type React from "react"
import { BookOpen, Bot, SquareTerminal } from "lucide-react"
import { NavItem } from "@/components/nav/nav-item"

interface AppSidebarProps {
  className?: string
}

const data = {
  navMain: [
    {
      title: "Today",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Bot,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: BookOpen,
    },
  ],
  navAux: [
    {
      title: "Settings",
      url: "/settings",
    },
    {
      title: "Support",
      url: "/support",
    },
  ],
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col gap-y-5 overflow-y-auto overflow-x-hidden rounded-lg border bg-secondary px-3 py-6 ${className}`}
    >
      <div>
        <ul className="space-y-1">
          {data.navMain.map((item) => (
            <NavItem key={item.title} title={item.title} url={item.url} icon={item.icon} />
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="space-y-1">
          {data.navAux.map((item) => (
            <NavItem key={item.title} title={item.title} url={item.url} />
          ))}
        </ul>
      </div>
    </div>
  )
}
