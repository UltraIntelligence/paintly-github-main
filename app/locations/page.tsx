import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
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
              {/* Header with Add Button */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Locations</h1>
                <Button className="bg-black text-white hover:bg-black/80" effect="gooeyLeft">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Location
                </Button>
              </div>

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
