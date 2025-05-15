import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { instructors } from "../../components/instructors/instructor-data"
import { InstructorCard } from "../../components/instructors/instructor-card"
import { InstructorNotifications } from "../../components/instructors/instructor-notifications"
import { InstructorStats } from "../../components/instructors/instructor-stats"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function InstructorsPage() {
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
                <h1 className="text-2xl font-bold">Instructors</h1>
                <Button asChild>
                  <Link href="/instructors/new">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Instructor
                  </Link>
                </Button>
              </div>

              {/* Notifications */}
              <InstructorNotifications />

              {/* Quick Stats */}
              <InstructorStats />

              {/* Instructor Cards - Single Column */}
              <div className="flex flex-col gap-4">
                {instructors.map((instructor) => (
                  <InstructorCard key={instructor.id} instructor={instructor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
