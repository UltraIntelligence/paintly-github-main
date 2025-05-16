import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SchedulingHeader } from "../../components/scheduling/scheduling-header"
import { SchedulingCalendar } from "../../components/scheduling/scheduling-calendar"

export default function SchedulingPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 p-4 md:p-6">
              <SchedulingHeader />
              <SchedulingCalendar />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
