"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { useSidebar } from "@/components/ui/sidebar"

export function CalendarSidebar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { state } = useSidebar()

  return (
    <div className="px-2 py-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full rounded-md border shadow-sm [&_table]:w-full [&_td]:text-center [&_th]:text-center [&_.rdp-cell]:text-xs [&_.rdp-day]:h-7 [&_.rdp-day]:w-7 [&_.rdp-day]:text-xs"
        classNames={{
          months: "flex flex-col space-y-2",
          month: "space-y-2",
          caption: "flex justify-center pt-1 relative items-center text-sm font-medium",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-6 w-6 bg-transparent p-0 hover:bg-accent hover:text-accent-foreground rounded-md",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem] flex-1",
          row: "flex w-full mt-1",
          cell: "text-center text-xs p-0 relative flex-1 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-7 w-7 p-0 font-normal text-xs hover:bg-accent hover:text-accent-foreground rounded-md",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    </div>
  )
}
