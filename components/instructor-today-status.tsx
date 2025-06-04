"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, BarChart3 } from "lucide-react"

interface TodayStatusProps {
  nextClass: {
    time: string
    title: string
    location: string
    studentCount: number
  }
  studentsToday: number
  classesScheduled: number
  hoursToday: string
  workingHours: string
}

export function InstructorTodayStatus({
  nextClass,
  studentsToday,
  classesScheduled,
  hoursToday,
  workingHours,
}: TodayStatusProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Next Class */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Class</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{nextClass.time}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {nextClass.title} - {nextClass.location}
          </p>
        </CardContent>
      </Card>

      {/* Students Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students Today</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentsToday}</div>
          <p className="text-xs text-muted-foreground mt-1">{classesScheduled} classes scheduled</p>
        </CardContent>
      </Card>

      {/* Hours Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hoursToday}</div>
          <p className="text-xs text-muted-foreground mt-1">{workingHours}</p>
        </CardContent>
      </Card>
    </div>
  )
}
