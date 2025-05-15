import { UsersIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function InstructorStats() {
  const stats = [
    {
      icon: UsersIcon,
      label: "Total Active Instructors",
      value: "12",
    },
    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-gray-700"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
      label: "Availability Submitted",
      value: "8/12",
      description: "this month",
    },
    {
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-gray-700"
        >
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M12 7c1-.56 2.78-2 5-2 .97 0 1.87.3 2.67.8" />
          <path d="M12 7c-1-.56-2.78-2-5-2-.97 0-1.87.3-2.67.8" />
        </svg>
      ),
      label: "Top Performer",
      value: "Yuki",
      description: "most bookings",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-0 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              {typeof stat.icon === "function" ? <stat.icon /> : <stat.icon className="h-6 w-6 text-gray-700" />}
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.description && <p className="text-sm text-gray-600">{stat.description}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
