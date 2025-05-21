"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { EventCategory } from "@/components/events/event-data"

interface EventsTabsProps {
  activeTab: EventCategory | "All"
  onTabChange: (tab: EventCategory | "All") => void
}

export function EventsTabs({ activeTab, onTabChange }: EventsTabsProps) {
  const categories: Array<EventCategory | "All"> = ["All", "Regular", "Family Friendly", "Corporate", "Seasonal"]

  return (
    <div className="border-b">
      <Tabs defaultValue={activeTab} onValueChange={(value) => onTabChange(value as EventCategory | "All")}>
        <TabsList className="w-full justify-start">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              {category === "All" ? "All Event Templates" : category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
