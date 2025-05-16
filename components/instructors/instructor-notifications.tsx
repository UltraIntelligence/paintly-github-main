import { AlertCircleIcon, BellIcon, ClockIcon } from "lucide-react"

export function InstructorNotifications() {
  const notifications = [
    {
      icon: BellIcon,
      title: "New availability submissions",
      description: "3 instructors have submitted their availability for next month. Review and approve.",
      type: "warning",
    },
    {
      icon: AlertCircleIcon,
      title: "Missing Availability",
      description: "4 instructors have not submitted their availability for next month.",
      type: "error",
    },
    {
      icon: ClockIcon,
      title: "Instructor Reviews",
      description: "15 new student reviews need to be approved before publishing.",
      type: "info",
    },
  ]

  return null
}
