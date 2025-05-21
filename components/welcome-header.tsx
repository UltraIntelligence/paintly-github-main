export function WelcomeHeader() {
  // Get current date in the format "Wednesday, May 21, 2025"
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">Welcome back, Cathy</h1>
      <p className="text-sm text-muted-foreground">Your current stats for {currentDate}</p>
    </div>
  )
}
