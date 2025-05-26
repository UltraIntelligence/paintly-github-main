import { ThemeProvider } from "@/components/theme-provider"

export default function TodayPage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="today-theme">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Today</h1>
        <p className="mt-3 text-2xl">This is the Today page.</p>
      </div>
    </ThemeProvider>
  )
}
