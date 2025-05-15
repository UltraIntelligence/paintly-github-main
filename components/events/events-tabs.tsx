"use client"
import type { EventCategory } from "./event-data"

interface EventsTabsProps {
  activeTab: EventCategory | "All" | "Templates"
  onTabChange: (tab: EventCategory | "All" | "Templates") => void
}

export function EventsTabs({ activeTab, onTabChange }: EventsTabsProps) {
  const tabs: (EventCategory | "All" | "Templates")[] = [
    "All",
    "Regular",
    "Family Friendly",
    "Corporate",
    "Seasonal",
    "Archived",
    "Templates",
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all relative
              ${activeTab === tab ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>
    </div>
  )
}
