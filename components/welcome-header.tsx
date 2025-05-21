import { CalendarIcon } from "lucide-react"

export function WelcomeHeader() {
  // Get current date in the format "Tuesday, May 21, 2025"
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col space-y-1.5 mb-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome back, Cathy</h2>
      <p className="text-muted-foreground flex items-center gap-1">
        <CalendarIcon className="h-4 w-4 text-primary" />
        Your current stats for {currentDate}
      </p>
    </div>
  )
}
