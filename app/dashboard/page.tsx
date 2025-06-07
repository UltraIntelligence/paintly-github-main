"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EnhancedEventsSection } from "../../components/enhanced-events-section"
import { EventDetailsModal } from "../../components/event-details-modal"
import { useState } from "react"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function Page() {
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false)
  const [selectedEventDetail, setSelectedEventDetail] = useState(null)

  const handleEventClick = (event) => {
    // Transform the event data to match the modal's expected format
    const modalEvent = {
      id: event.id,
      title: event.title,
      titleEn: event.titleJp,
      instructor: event.instructor,
      participants: { current: event.participants.current, max: event.participants.capacity },
      status: event.status,
      day: 0, // You may need to calculate this from the date
      startHour: 8, // You may need to parse this from the time
      duration: 2, // You may need to calculate this from the time
      location: event.location.replace("Artbar ", ""),
    }
    setSelectedEventDetail(modalEvent)
    setIsEventDetailModalOpen(true)
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar variant="inset" />
          <SidebarInset className="bg-transparent">
            <SiteHeader />
            <AnimatePresence mode="wait">
              <motion.div key="today" className="flex flex-1 flex-col" {...pageTransition}>
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
                    <div className="px-6 lg:px-8">
                      <SectionCards />
                    </div>
                    <div className="px-6 lg:px-8">
                      <div className="neu-card p-6">
                        <ChartAreaInteractive />
                      </div>
                    </div>
                    <EnhancedEventsSection onEventClick={handleEventClick} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </SidebarInset>
          <EventDetailsModal
            isOpen={isEventDetailModalOpen}
            onOpenChange={setIsEventDetailModalOpen}
            event={selectedEventDetail}
          />
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
