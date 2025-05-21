"use client"

import type * as React from "react"
import type { LucideIcon } from "lucide-react"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NavMain({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="flex items-center justify-between">
        <span>Navigation</span>
        <Dialog>
          <DialogTrigger asChild>
            <SidebarGroupAction className="group-data-[collapsible=icon]:opacity-0">
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">New</span>
            </SidebarGroupAction>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Calendar Event</DialogTitle>
              <DialogDescription>Create a new calendar event to share with your team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" autoFocus />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className="h-9 text-sm font-medium group-data-[collapsible=icon]:justify-center"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
