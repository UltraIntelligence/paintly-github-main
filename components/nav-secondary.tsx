import type { LucideIcon } from "lucide-react"
import type React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  // Find the settings and help items
  const settingsItem = items.find((item) => item.title === "Settings")
  const helpItem = items.find((item) => item.title === "Get Help")
  const otherItems = items.filter((item) => item.title !== "Settings" && item.title !== "Get Help")

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Render Settings first */}
          {settingsItem && (
            <SidebarMenuItem key={settingsItem.title}>
              <SidebarMenuButton asChild>
                <a href={settingsItem.url}>
                  <settingsItem.icon />
                  <span>{settingsItem.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* Theme toggle positioned after Settings */}
          <ThemeToggle />

          {/* Render Get Help */}
          {helpItem && (
            <SidebarMenuItem key={helpItem.title}>
              <SidebarMenuButton asChild>
                <a href={helpItem.url}>
                  <helpItem.icon />
                  <span>{helpItem.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* Render other items */}
          {otherItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
