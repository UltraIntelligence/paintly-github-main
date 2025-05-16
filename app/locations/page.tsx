import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { locations } from "@/components/locations/location-data"
import { LocationStatsOverview } from "@/components/locations/location-stats-overview"
import { LocationCard } from "@/components/locations/location-card"

export default function LocationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 p-4 md:p-6">
              {/* Stats Overview */}
              <LocationStatsOverview />

              {/* Location Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {locations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
