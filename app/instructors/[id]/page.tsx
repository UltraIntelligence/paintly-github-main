import { notFound } from "next/navigation"
import { ChevronRightIcon, HomeIcon } from "lucide-react"
import { instructors } from "../../../components/instructors/instructor-data"
import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { InstructorAvailability } from "../../../components/instructors/instructor-availability"
import { InstructorPerformance } from "../../../components/instructors/instructor-performance"
import { InstructorProfile } from "../../../components/instructors/instructor-profile"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function InstructorDetailPage({ params }: { params: { id: string } }) {
  // Find the instructor by ID
  const instructor = instructors.find((i) => i.id === params.id)

  // If instructor not found, return 404
  if (!instructor) {
    notFound()
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">
                    <HomeIcon className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/instructors">Instructors</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>{instructor.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-bold">{instructor.name}</h1>
              <p className="text-muted-foreground">Instructor Profile and Management</p>
            </div>

            {/* Three Main Sections */}
            <div className="grid grid-cols-1 gap-6">
              {/* 1. Profile Information */}
              <InstructorProfile instructor={instructor} />

              {/* 2. Availability Management */}
              <InstructorAvailability instructor={instructor} />

              {/* 3. Performance Overview */}
              <InstructorPerformance instructor={instructor} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
