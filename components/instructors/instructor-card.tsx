"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { EditIcon, MoreHorizontalIcon, TrashIcon, UserIcon } from "lucide-react"
import type { Instructor } from "./instructor-data"
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
  const router = useRouter()

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Missing":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
        {/* Square Image at Top */}
        <div className="relative aspect-square w-full bg-gray-100">
          {instructor.photo ? (
            <img
              src={instructor.photo || "/placeholder.svg"}
              alt={instructor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <UserIcon className="h-24 w-24 text-gray-400" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white"
                >
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
                <DropdownMenuItem className="text-red-600" onClick={() => setShowArchiveDialog(true)}>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Archive Instructor
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardContent className="flex-1 p-4">
          {/* Instructor Name and Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{instructor.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {instructor.role.map((role) => (
                <Badge key={role} variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-100">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Languages and Specialties */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {instructor.languages.map((lang) => (
                <Badge
                  key={lang.code}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700 border-gray-100"
                >
                  {lang.code}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {instructor.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} className="bg-gray-100 text-xs text-gray-700 hover:bg-gray-100 border-gray-100">
                  {specialty}
                </Badge>
              ))}
              {instructor.specialties.length > 3 && (
                <Badge className="bg-gray-100 text-xs text-gray-700 hover:bg-gray-100 border-gray-100">
                  +{instructor.specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Separator className="my-3 bg-gray-100" />

          {/* Availability Stats */}
          <div className="grid grid-cols-3 gap-2 text-center mb-2">
            <div>
              <div className="text-xs text-gray-500">This month</div>
              <div
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                  instructor.availability.thisMonth,
                )}`}
              >
                {instructor.availability.thisMonth}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Next month</div>
              <div
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                  instructor.availability.nextMonth,
                )}`}
              >
                {instructor.availability.nextMonth}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Classes</div>
              <div className="mt-1 text-sm font-medium text-gray-900">{instructor.stats.classesThisMonth}</div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 bg-gray-50 px-4 py-3 mt-auto">
          <Button
            effect="gooeyLeft"
            size="sm"
            className="flex-1 bg-black text-white hover:bg-black/80"
            onClick={() => router.push(`/instructors/${instructor.id}`)}
          >
            View Profile
          </Button>
          <Button
            effect="gooeyLeft"
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => router.push(`/instructors/${instructor.id}/calendar`)}
          >
            Calendar
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
            <Button effect="gooeyLeft" variant="outline" onClick={() => setShowArchiveDialog(false)}>
              Cancel
            </Button>
            <Button
              effect="gooeyLeft"
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
