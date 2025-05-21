import { AlertsSection } from "./alerts-section"
import { QuickActionButtons } from "./quick-action-buttons"
import { DailyStatistics } from "./daily-statistics"
import { WeeklyEvents } from "./weekly-events"
import { ActivityFeed } from "./activity-feed"

export const DashboardContent = () => {
  return (
    <div className="space-y-4">
      <AlertsSection />
      <div className="px-4 lg:px-6 py-4">
        <QuickActionButtons />
      </div>
      <div className="px-4 lg:px-6 py-4">
        <DailyStatistics />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-6 py-4">
        <WeeklyEvents />
        <ActivityFeed />
      </div>
    </div>
  )
}
