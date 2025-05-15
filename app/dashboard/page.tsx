import { AppSidebar } from "../../components/app-sidebar"
import { DashboardContent } from "../../components/dashboard-content"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <DashboardContent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
