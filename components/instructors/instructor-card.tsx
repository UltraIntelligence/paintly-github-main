"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, EditIcon, MoreHorizontalIcon, TrashIcon, UserIcon } from "lucide-react"
import type { Instructor } from "./instructor-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Missing":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Larger Profile Picture */}
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 rounded-md border">
                <AvatarImage src={instructor.photo || "/placeholder.svg"} alt={instructor.name} />
                <AvatarFallback className="rounded-md">
                  <UserIcon className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Instructor Details */}
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-medium">{instructor.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {instructor.role.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/instructors/${instructor.id}`}>View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/instructors/${instructor.id}/calendar`}>View Calendar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/instructors/${instructor.id}/edit`}>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit Instructor
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400"
                      onClick={() => setShowArchiveDialog(true)}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Archive Instructor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {instructor.languages.map((lang) => (
                  <Badge key={lang.code} variant="secondary" className="text-xs">
                    {lang.code}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {instructor.specialties.map((specialty) => (
                  <Badge key={specialty} className="bg-primary/10 text-xs text-primary hover:bg-primary/20">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">This month:</div>
                  <div
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                      instructor.availability.thisMonth,
                    )}`}
                  >
                    {instructor.availability.thisMonth}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next month:</div>
                  <div
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                      instructor.availability.nextMonth,
                    )}`}
                  >
                    {instructor.availability.nextMonth}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Classes this month:</div>
                  <div className="mt-1 text-sm font-medium">{instructor.stats.classesThisMonth}</div>
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                Last updated: {instructor.availability.lastUpdated}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 bg-muted/10 p-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/instructors/${instructor.id}`}>
              <UserIcon className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/instructors/${instructor.id}/calendar`}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Calendar
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setShowArchiveDialog(true)}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Archive
          </Button>
        </CardFooter>
      </Card>

      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Instructor</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive {instructor.name}? This will remove them from active instructor lists and
              class assignments.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowArchiveDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle archive logic here
                setShowArchiveDialog(false)
              }}
            >
              Archive Instructor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
