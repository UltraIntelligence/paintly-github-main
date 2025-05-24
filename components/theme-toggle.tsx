"use client"

import { MoonIcon, SunIcon } from "lucide-react"

import { useTheme } from "./theme-provider"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            <MoonIcon />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <SunIcon />
            <span>Light Mode</span>
          </>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
