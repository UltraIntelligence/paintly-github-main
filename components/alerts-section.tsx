import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"

export function AlertsSection() {
  const alerts = [
    {
      icon: BellIcon,
      title: "New staff availability submitted",
      description: "Instructor Maria Garcia has submitted availability for June. Review and approve.",
      type: "warning",
    },
    {
      icon: AlertCircleIcon,
      title: "Scheduling Conflicts",
      description: "2 scheduling conflicts detected for next week. Review and resolve.",
      type: "error",
    },
    {
      icon: ClockIcon,
      title: "Pending Staff Availability",
      description: "3 instructors have not submitted their availability for next month.",
      type: "info",
    },
  ]

  return null
}
