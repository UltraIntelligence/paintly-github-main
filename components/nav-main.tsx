import { FileText, Home, Settings } from "lucide-react"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link"

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function NavMain() {
  return (
    <nav className="flex flex-col gap-4">
      {navMain.map((item) => (
        <SidebarMenuButton asChild tooltip={item.title} key={item.title}>
          <Link href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ))}
    </nav>
  )
}
