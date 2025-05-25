"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
    </button>
  )
}
