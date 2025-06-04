"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface AvailabilityCalendarProps {
  month?: string
  year?: number
  onSubmit?: (availability: Record<string, boolean>) => void
  initialAvailability?: Record<string, boolean>
}

const TIME_SLOTS = [
  { id: "morning", label: "9 AM - 12 PM", start: 9, end: 12 },
  { id: "afternoon", label: "12 PM - 3 PM", start: 12, end: 15 },
  { id: "evening1", label: "3 PM - 6 PM", start: 15, end: 18 },
  { id: "evening2", label: "6 PM - 9 PM", start: 18, end: 21 },
]

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function AvailabilityCalendar({
  month = "January",
  year = 2024,
  onSubmit,
  initialAvailability = {},
}: AvailabilityCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [availability, setAvailability] = useState<Record<string, boolean>>(initialAvailability)

  // Generate days for the selected month
  const getDaysInMonth = (monthName: string, year: number) => {
    const monthIndex = MONTHS.indexOf(monthName)
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const days = []

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day)
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      days.push({
        date: day,
        dayName,
        fullDate: date,
        isWeekend: dayName === "Sat" || dayName === "Sun",
      })
    }
    return days
  }

  const days = getDaysInMonth(selectedMonth, year)
  const totalSlots = days.length * TIME_SLOTS.length

  // Count selected slots
  const selectedCount = Object.values(availability).filter(Boolean).length

  // Generate slot key
  const getSlotKey = (day: number, slotId: string) => `${selectedMonth}-${day}-${slotId}`

  // Toggle individual slot
  const toggleSlot = (day: number, slotId: string) => {
    const key = getSlotKey(day, slotId)
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Bulk selection functions
  const selectWeekends = () => {
    const updates: Record<string, boolean> = {}
    days.forEach((day) => {
      if (day.isWeekend) {
        TIME_SLOTS.forEach((slot) => {
          updates[getSlotKey(day.date, slot.id)] = true
        })
      }
    })
    setAvailability((prev) => ({ ...prev, ...updates }))
  }

  const selectEvenings = () => {
    const updates: Record<string, boolean> = {}
    days.forEach((day) => {
      // Select evening slots (3 PM - 6 PM and 6 PM - 9 PM)
      updates[getSlotKey(day.date, "evening1")] = true
      updates[getSlotKey(day.date, "evening2")] = true
    })
    setAvailability((prev) => ({ ...prev, ...updates }))
  }

  const selectAll = () => {
    const updates: Record<string, boolean> = {}
    days.forEach((day) => {
      TIME_SLOTS.forEach((slot) => {
        updates[getSlotKey(day.date, slot.id)] = true
      })
    })
    setAvailability(updates)
  }

  const clearAll = () => {
    setAvailability({})
  }

  // Handle month change
  const handleMonthChange = (newMonth: string) => {
    setSelectedMonth(newMonth)
    setAvailability({}) // Clear selections when month changes
  }

  // Handle submit
  const handleSubmit = () => {
    onSubmit?.(availability)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Set Your Availability</h2>
        <p className="text-sm text-muted-foreground">Select your available time slots for {selectedMonth}</p>
      </div>

      {/* Status and Month Selector */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Status: Pending for {selectedMonth}
        </Badge>
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((monthName) => (
              <SelectItem key={monthName} value={monthName}>
                {monthName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Slot Counter */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Selected time slots</span>
        <span className="text-sm text-muted-foreground">
          {selectedCount} of {totalSlots} slots
        </span>
      </div>

      {/* Bulk Selection Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={selectWeekends}>
          Select Weekends
        </Button>
        <Button variant="outline" size="sm" onClick={selectEvenings}>
          Select Evenings
        </Button>
        <Button variant="outline" size="sm" onClick={selectAll}>
          Select All
        </Button>
        <Button variant="outline" size="sm" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
          <span>Not Available</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {days.map((day) => (
          <div key={day.date} className="space-y-2">
            <h4 className="font-medium text-sm">
              {day.dayName}, {selectedMonth} {day.date}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const slotKey = getSlotKey(day.date, slot.id)
                const isSelected = availability[slotKey] || false

                return (
                  <Button
                    key={slot.id}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSlot(day.date, slot.id)}
                    className={`h-12 text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {slot.label}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSubmit} disabled={selectedCount === 0}>
          Save Availability
        </Button>
      </div>
    </div>
  )
}
