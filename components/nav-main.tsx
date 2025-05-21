"use client"

import Link from "next/link"
import { PlusCircleIcon, type LucideIcon, Palette, UsersIcon, MapPin } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const { collapsed } = useSidebar()

  // Modify items to rename "Events" to "Calendar"
  const modifiedItems = items.map((item) => {
    if (item.title === "Events") {
      return { ...item, title: "Calendar" }
    }
    return item
  })

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton tooltip="New">
                  <PlusCircleIcon className="h-4 w-4" />
                  {!collapsed && <span>New</span>}
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quick Create</DialogTitle>
                  <DialogDescription>Create a new item quickly. Choose from the options below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/events/new">
                      <Palette className="mr-2 h-4 w-4" />
                      New Calendar Event
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/instructors/new">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      New Instructor
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/locations/new">
                      <MapPin className="mr-2 h-4 w-4" />
                      New Location
                    </Link>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {modifiedItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
