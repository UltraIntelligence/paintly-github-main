"use client"

import { useState } from "react"
import Link from "next/link"
import { MailIcon, PlusCircleIcon, Home, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { QuickCreateModal } from "./quick-create-modal"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false)
  const [emailPlatformUrl, setEmailPlatformUrl] = useState("https://mail.google.com")

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-[#3b82f6] text-white duration-200 ease-linear hover:bg-[#2563eb] hover:text-white active:bg-[#1d4ed8] active:text-white"
              onClick={() => setIsQuickCreateOpen(true)}
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              onClick={() => window.open(emailPlatformUrl, "_blank")}
              title="Open Email Platform"
            >
              <MailIcon />
              <span className="sr-only">Open Email Platform</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.title === "Today" ? <Home /> : item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      <QuickCreateModal open={isQuickCreateOpen} onOpenChange={setIsQuickCreateOpen} />
    </SidebarGroup>
  )
}
