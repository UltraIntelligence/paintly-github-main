import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function InstructorNotifications() {
  return (
    <div className="space-y-4">
      <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
        <BellIcon className="h-4 w-4" />
        <AlertTitle>New availability submissions</AlertTitle>
        <AlertDescription>
          3 instructors have submitted their availability for next month. Review and approve.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Missing Availability</AlertTitle>
        <AlertDescription>4 instructors have not submitted their availability for next month.</AlertDescription>
      </Alert>

      <Alert>
        <ClockIcon className="h-4 w-4" />
        <AlertTitle>Instructor Reviews</AlertTitle>
        <AlertDescription>15 new student reviews need to be approved before publishing.</AlertDescription>
      </Alert>
    </div>
  )
}
