"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { EventImageUpload } from "@/components/events/event-image-upload"
import { EventBasicDetails } from "@/components/events/event-basic-details"
import { EventPerformance } from "@/components/events/event-performance"
import { EventTemplateSettings } from "@/components/events/event-template-settings"
import { EventPricing } from "@/components/events/event-pricing"
import { EventRequirements } from "@/components/events/event-requirements"
import { EventQuickActions } from "@/components/events/event-quick-actions"
import { eventDetailData } from "@/components/events/event-detail-data"
import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isTemplate, setIsTemplate] = useState(eventDetailData.isTemplate)

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col p-4 md:p-6">
              {/* Header with actions - removed breadcrumb */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold">{eventDetailData.name.en}</h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="template-mode" checked={isTemplate} onCheckedChange={setIsTemplate} />
                    <Label htmlFor="template-mode">Template</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => router.push("/events")}>
                      Cancel
                    </Button>
                    <Button style={{ backgroundColor: "#1414f5" }}>Save Changes</Button>
                  </div>
                </div>
              </div>

              {/* Main content - three column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left column - Event Information */}
                <div className="space-y-6">
                  <EventImageUpload currentImage={eventDetailData.image} />
                  <EventBasicDetails
                    name={eventDetailData.name}
                    description={eventDetailData.description}
                    category={eventDetailData.category}
                    duration={eventDetailData.duration}
                    skillLevel={eventDetailData.skillLevel}
                  />
                </div>

                {/* Middle column - Performance Stats */}
                <div className="space-y-6">
                  <EventPerformance performance={eventDetailData.performance} />

                  {isTemplate && (
                    <EventTemplateSettings
                      isTemplate={isTemplate}
                      variations={eventDetailData.variations}
                      seasonal={eventDetailData.seasonal}
                    />
                  )}
                </div>

                {/* Right column - Pricing & Settings */}
                <div className="space-y-6">
                  <EventPricing pricing={eventDetailData.pricing} />
                  <EventRequirements requirements={eventDetailData.requirements} />
                  <EventQuickActions isTemplate={isTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
