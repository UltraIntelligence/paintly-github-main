"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/events/event-card"
import { EventsTabs } from "@/components/events/events-tabs"
import { EventsFilters } from "@/components/events/events-filters"
import { EventStatsCards } from "@/components/events/event-stats-cards"
import { eventData, type Event, type EventCategory } from "@/components/events/event-data"

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<EventCategory | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Last Modified")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventData)

  useEffect(() => {
    let filtered = [...eventData]

    // Filter by tab
    if (activeTab !== "All") {
      filtered = filtered.filter((event) => event.category === activeTab)
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Sort
    switch (sortBy) {
      case "Name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "Price":
        filtered.sort((a, b) => {
          const aPrice = Number.parseInt(a.price.replace(/[^\d]/g, ""))
          const bPrice = Number.parseInt(b.price.replace(/[^\d]/g, ""))
          return bPrice - aPrice
        })
        break
      case "Duration":
        filtered.sort((a, b) => {
          const aHours = Number.parseFloat(a.duration.split(" ")[0])
          const bHours = Number.parseFloat(b.duration.split(" ")[0])
          return bHours - aHours
        })
        break
      case "Last Modified":
        filtered.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
        break
      case "Most Scheduled":
        filtered.sort((a, b) => b.scheduledCount - a.scheduledCount)
        break
    }

    setFilteredEvents(filtered)
  }, [activeTab, searchQuery, sortBy])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col p-4 md:p-6">
              {/* Stats Cards Section */}
              <EventStatsCards />

              {/* Tabs */}
              <EventsTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Filters */}
              <EventsFilters
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
                onViewChange={setView}
                view={view}
              />

              {/* Templates Grid */}
              <div
                className={`grid gap-6 mt-6 ${
                  view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Empty State */}
              {filteredEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No templates found</h3>
                  <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or create a new template</p>
                  <Button
                    onClick={() => router.push("/events/new")}
                    className="bg-black hover:bg-black/90 text-white"
                    effect="gooeyLeft"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Template
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
