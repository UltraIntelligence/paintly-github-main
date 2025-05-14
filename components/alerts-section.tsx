import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertsSection() {
  return (
    <div className="space-y-4">
      <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
        <BellIcon className="h-4 w-4" />
        <AlertTitle>New staff availability submitted</AlertTitle>
        <AlertDescription>
          Instructor Maria Garcia has submitted availability for June. Review and approve.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Scheduling Conflicts</AlertTitle>
        <AlertDescription>2 scheduling conflicts detected for next week. Review and resolve.</AlertDescription>
      </Alert>

      <Alert>
        <ClockIcon className="h-4 w-4" />
        <AlertTitle>Pending Staff Availability</AlertTitle>
        <AlertDescription>3 instructors have not submitted their availability for next month.</AlertDescription>
      </Alert>
    </div>
  )
}
