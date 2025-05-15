"use client"

import { useState } from "react"
import { CalendarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import type { Instructor } from "./instructor-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Sample availability data
const availabilityData = {
  available: [1, 5, 6, 7, 12, 13, 14, 19, 20, 21, 26, 27, 28],
  unavailable: [2, 3, 4, 9, 10, 11, 16, 17, 18, 23, 24, 25, 30],
  pending: [8, 15, 22, 29],
  scheduled: [5, 6, 13, 14, 20, 21, 27, 28],
}

export function InstructorAvailability({ instructor }: { instructor: Instructor }) {
  const [date, setDate] = useState<Date>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [adminNotes, setAdminNotes] = useState("")

  // Helper function to determine day class based on availability
  const getDayClass = (day: Date) => {
    const dayOfMonth = day.getDate()

    if (availabilityData.scheduled.includes(dayOfMonth)) {
      return "bg-blue-100 text-blue-900 hover:bg-blue-200"
    }
    if (availabilityData.available.includes(dayOfMonth)) {
      return "bg-green-100 text-green-900 hover:bg-green-200"
    }
    if (availabilityData.unavailable.includes(dayOfMonth)) {
      return "bg-red-100 text-red-900 hover:bg-red-200"
    }
    if (availabilityData.pending.includes(dayOfMonth)) {
      return "bg-yellow-100 text-yellow-900 hover:bg-yellow-200"
    }

    return ""
  }

  const handlePrevMonth = () => {
    const newMonth = new Date(month)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setMonth(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = new Date(month)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setMonth(newMonth)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Management</CardTitle>
        <CardDescription>View and manage instructor availability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
          {/* Calendar View */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Calendar View</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="min-w-24 text-center font-medium">
                  {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              month={month}
              onMonthChange={setMonth}
              className="rounded-md border"
              modifiers={{
                available: (date) => availabilityData.available.includes(date.getDate()),
                unavailable: (date) => availabilityData.unavailable.includes(date.getDate()),
                pending: (date) => availabilityData.pending.includes(date.getDate()),
                scheduled: (date) => availabilityData.scheduled.includes(date.getDate()),
              }}
              modifiersClassNames={{
                available: "bg-green-100 text-green-900 hover:bg-green-200",
                unavailable: "bg-red-100 text-red-900 hover:bg-red-200",
                pending: "bg-yellow-100 text-yellow-900 hover:bg-yellow-200",
                scheduled: "bg-blue-100 text-blue-900 hover:bg-blue-200",
              }}
              styles={{
                day: { aspectRatio: "1/1" },
              }}
            />

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs">Unavailable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-xs">Pending Approval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">Scheduled</span>
              </div>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-medium">Selected Date Details</h3>
              {date && (
                <div className="rounded-md border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="font-medium">
                      {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </span>
                  </div>

                  <div className="mb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className={
                          availabilityData.available.includes(date.getDate())
                            ? "bg-green-100 text-green-900"
                            : availabilityData.unavailable.includes(date.getDate())
                              ? "bg-red-100 text-red-900"
                              : availabilityData.pending.includes(date.getDate())
                                ? "bg-yellow-100 text-yellow-900"
                                : "bg-gray-100"
                        }
                      >
                        {availabilityData.available.includes(date.getDate())
                          ? "Available"
                          : availabilityData.unavailable.includes(date.getDate())
                            ? "Unavailable"
                            : availabilityData.pending.includes(date.getDate())
                              ? "Pending Approval"
                              : "Not Specified"}
                      </Badge>
                    </div>

                    {availabilityData.scheduled.includes(date.getDate()) && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Scheduled:</span>
                        <Badge variant="outline" className="bg-blue-100 text-blue-900">
                          Class Scheduled
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>

                  {availabilityData.pending.includes(date.getDate()) && (
                    <div className="flex gap-2">
                      <Button size="sm" className="w-full" variant="outline">
                        <XIcon className="mr-1 h-3 w-3" /> Reject
                      </Button>
                      <Button size="sm" className="w-full">
                        <CheckIcon className="mr-1 h-3 w-3" /> Approve
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Admin Controls</h3>

              <div className="space-y-2">
                <Label htmlFor="month-select">View Month</Label>
                <Select defaultValue="current">
                  <SelectTrigger id="month-select">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="next">Next Month</SelectItem>
                    <SelectItem value="previous">Previous Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add notes about this instructor's availability..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button className="w-full" variant="outline">
                  Request Changes
                </Button>
                <Button className="w-full">Approve All Pending</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Availability History</h3>
              <div className="space-y-2 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Submission:</span>
                  <span className="text-sm">{instructor.availability.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Submission Pattern:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-900">
                    On Time
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Change Frequency:</span>
                  <span className="text-sm">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline">Export Calendar</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
