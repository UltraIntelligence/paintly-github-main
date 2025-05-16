"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const eventCategories = [
  { name: "Regular", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  { name: "Family Friendly", color: "bg-green-100 text-green-800 hover:bg-green-200" },
  { name: "Corporate", color: "bg-purple-100 text-purple-800 hover:bg-purple-200" },
  { name: "Seasonal", color: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
]

export function SchedulingHeader() {
  const [view, setView] = useState("calendar")
  const [date, setDate] = useState<Date>(new Date())
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const navigateWeek = (direction: "prev" | "current" | "next") => {
    const newDate = new Date(date)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (direction === "next") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setTime(new Date().getTime())
    }
    setDate(newDate)
  }

  const formatDateRange = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)

    const startMonth = startOfWeek.toLocaleString("default", { month: "short" })
    const endMonth = endOfWeek.toLocaleString("default", { month: "short" })
    const startDay = startOfWeek.getDate()
    const endDay = endOfWeek.getDate()
    const year = startOfWeek.getFullYear()

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}, ${year}`
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={() => navigateWeek("current")}>
            This Week
          </Button>

          <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                {formatDateRange(date)}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="shibuya">Shibuya Studio</SelectItem>
              <SelectItem value="roppongi">Roppongi Studio</SelectItem>
              <SelectItem value="shinjuku">Shinjuku Studio</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Instructors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instructors</SelectItem>
              <SelectItem value="akira">Akira Tanaka</SelectItem>
              <SelectItem value="yuki">Yuki Sato</SelectItem>
              <SelectItem value="mei">Mei Yamamoto</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-1 mt-2 md:mt-0">
            {eventCategories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className={cn(
                  "cursor-pointer",
                  selectedCategories.includes(category.name) ? category.color : "bg-white",
                )}
                onClick={() => toggleCategory(category.name)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
