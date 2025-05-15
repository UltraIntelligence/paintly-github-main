import { UsersIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function InstructorStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UsersIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Active Instructors</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Availability Submitted</p>
            <h3 className="text-2xl font-bold">8/12</h3>
            <p className="text-xs text-muted-foreground">this month</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
              <path d="M12 7c1-.56 2.78-2 5-2 .97 0 1.87.3 2.67.8" />
              <path d="M12 7c-1-.56-2.78-2-5-2-.97 0-1.87.3-2.67.8" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Top Performer</p>
            <h3 className="text-2xl font-bold">Yuki</h3>
            <p className="text-xs text-muted-foreground">most bookings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
