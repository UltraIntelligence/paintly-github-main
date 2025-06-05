"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "../../components/theme-provider"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { useFavorites } from "@/hooks/use-favorites"
import { FeaturedSection, FeaturedCard } from "@/components/featured-section"
import { PrivateEventWizard } from "@/components/corporate-event-template-wizard"
import { PaintlyCard } from "@/components/paintly-card"

const eventsData = [
  {
    id: 1,
    title: "FREUDE by BMW × Artbar【Anniversary Bouquet】",
    company: "BMW Japan",
    duration: "2 hours",
    capacity: "25 participants",
    status: "Active",
    tags: ["Corporate", "Premium", "Anniversary"],
    location: "FREUDE by BMW, Azabudai Hills",
    price: "¥6,050",
    instructor: "Momo",
    description: "Exclusive anniversary celebration with premium art experience for BMW's corporate event.",
    completionRate: "98%",
    averageRating: 4.9,
  },
  {
    id: 2,
    title: "Google Tokyo Team Building【Digital Landscapes】",
    company: "Google Japan",
    duration: "2.5 hours",
    capacity: "40 participants",
    status: "Confirmed",
    tags: ["Tech", "Team Building", "Innovation"],
    location: "Google Tokyo Office, Roppongi",
    price: "¥8,500",
    instructor: "Naomi",
    description: "Innovative team building experience combining digital art with collaborative creativity.",
    completionRate: "95%",
    averageRating: 4.8,
  },
  {
    id: 3,
    title: "L'Oréal Beauty Workshop【Floral Elegance】",
    company: "L'Oréal Japan",
    duration: "2 hours",
    capacity: "30 participants",
    status: "Planning",
    tags: ["Beauty", "Luxury", "Product Launch"],
    location: "Artbar Ginza Studio",
    price: "¥7,200",
    instructor: "Daria",
    description: "Elegant floral art workshop designed for L'Oréal's luxury product launch event.",
    completionRate: "92%",
    averageRating: 4.7,
  },
  {
    id: 4,
    title: "Sony Creative Showcase【Digital Art Fusion】",
    company: "Sony Corporation",
    duration: "3 hours",
    capacity: "35 participants",
    status: "Active",
    tags: ["Technology", "Creative", "Innovation"],
    location: "Sony Creative Lounge, Shibuya",
    price: "¥9,800",
    instructor: "Kenji",
    description: "Cutting-edge digital art experience showcasing Sony's latest creative technologies.",
    completionRate: "89%",
    averageRating: 4.6,
  },
  {
    id: 5,
    title: "Uniqlo Design Workshop【Color Theory】",
    company: "Uniqlo Co., Ltd",
    duration: "2 hours",
    capacity: "45 participants",
    status: "Confirmed",
    tags: ["Fashion", "Design", "Retail"],
    location: "Uniqlo Headquarters, Ariake",
    price: "¥5,500",
    instructor: "Yuki",
    description: "Fashion-focused color theory workshop for Uniqlo's design team development.",
    completionRate: "94%",
    averageRating: 4.5,
  },
  {
    id: 6,
    title: "Nintendo Game Night【Creative Collaboration】",
    company: "Nintendo Co., Ltd",
    duration: "4 hours",
    capacity: "50 participants",
    status: "Planning",
    tags: ["Gaming", "Team Building", "Entertainment"],
    location: "Nintendo Tokyo, Shibuya Parco",
    price: "¥12,000",
    instructor: "Hiro",
    description: "Interactive gaming-inspired art experience promoting creative collaboration.",
    completionRate: "96%",
    averageRating: 4.8,
  },
  {
    id: 7,
    title: "Shiseido Wellness Retreat【Mindful Art】",
    company: "Shiseido Co., Ltd",
    duration: "2.5 hours",
    capacity: "20 participants",
    status: "Active",
    tags: ["Wellness", "Luxury", "Mindfulness"],
    location: "Shiseido Global Innovation Center",
    price: "¥8,800",
    instructor: "Sakura",
    description: "Mindful art therapy session designed for Shiseido's wellness initiative.",
    completionRate: "97%",
    averageRating: 4.9,
  },
  {
    id: 8,
    title: "Toyota Innovation Lab【Future Mobility】",
    company: "Toyota Motor Corporation",
    duration: "3 hours",
    capacity: "30 participants",
    status: "Confirmed",
    tags: ["Automotive", "Innovation", "Future"],
    location: "Toyota City Showcase",
    price: "¥10,500",
    instructor: "Takeshi",
    description: "Futuristic art workshop exploring themes of mobility and innovation.",
    completionRate: "91%",
    averageRating: 4.7,
  },
]

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.4,
    ease: [0.4, 0.0, 0.2, 1],
  },
}

export default function PrivateEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeStatus, setActiveStatus] = useState("All")
  const [showTemplateWizard, setShowTemplateWizard] = useState(false)

  const { toggleFavorite, isFavorite, favorites, getFavoriteCount } = useFavorites("events")

  const events = eventsData || []

  // Get favorited events for Featured section
  const featuredEvents = useMemo(() => {
    return events.filter((event) => isFavorite(event.id)).slice(0, 6)
  }, [events, isFavorite, favorites])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = activeStatus === "All" || event.status === activeStatus
    const matchesFavorites = activeStatus !== "Favorites" || isFavorite(event.id)
    return matchesSearch && matchesStatus && matchesFavorites
  })

  const getStatusCount = (status: string) => {
    if (status === "All") return events.length
    if (status === "Favorites") return getFavoriteCount()
    return events.filter((event) => event.status === status).length
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="private-events" className="flex flex-1 flex-col" {...pageTransition}>
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    {/* Featured Section */}
                    <FeaturedSection
                      title="Featured"
                      subtitle="Your frequently used private events"
                      isEmpty={featuredEvents.length === 0}
                    >
                      {featuredEvents.map((event) => (
                        <FeaturedCard key={event.id}>
                          <PaintlyCard
                            type="event"
                            image={`/placeholder.svg?height=400&width=500&query=${encodeURIComponent(event.title + " " + event.company + " corporate event featured")}`}
                            title={event.company}
                            subtitle={event.title}
                            badges={[
                              { text: event.status, badgeType: "category" },
                              { text: event.capacity, badgeType: "canvas" },
                              ...event.tags.slice(0, 2).map((tag) => ({ text: tag, badgeType: "category" })),
                            ]}
                            metaInfo={[
                              { text: event.duration },
                              { text: event.location },
                              { text: `Rating ${event.averageRating}` },
                            ]}
                            rating={event.averageRating}
                            primaryButton={{
                              text: "View Details",
                              onClick: () => console.log("View details", event.id),
                            }}
                            secondaryButton={{
                              text: "Schedule Event",
                              onClick: () => console.log("Schedule event", event.id),
                            }}
                            onFavorite={() => toggleFavorite(event.id)}
                            isFavorited={isFavorite(event.id)}
                            menuItems={[
                              { label: "Edit Event", onClick: () => console.log("Edit", event.id) },
                              { label: "Duplicate", onClick: () => console.log("Duplicate", event.id) },
                              { label: "Deactivate", onClick: () => console.log("Deactivate", event.id) },
                            ]}
                          />
                        </FeaturedCard>
                      ))}
                    </FeaturedSection>

                    {/* All Events Section */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Private Events</h2>
                        <p className="text-gray-600">Browse and manage your complete private events portfolio</p>
                      </div>

                      {/* Filters */}
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                          <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search events..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                              <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="ginza">Artbar Ginza</SelectItem>
                              <SelectItem value="daikanyama">Artbar Daikanyama</SelectItem>
                              <SelectItem value="catstreet">Artbar Cat Street</SelectItem>
                              <SelectItem value="yokohama">Artbar Yokohama</SelectItem>
                            </SelectContent>
                          </Select>

                          <Tabs value={activeStatus} onValueChange={setActiveStatus} className="w-auto">
                            <TabsList>
                              <TabsTrigger value="All" className="gap-1">
                                All{" "}
                                <Badge
                                  variant="secondary"
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                  {getStatusCount("All")}
                                </Badge>
                              </TabsTrigger>
                              <TabsTrigger value="Favorites" className="gap-1">
                                Favorites{" "}
                                <Badge
                                  variant="secondary"
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                  {getStatusCount("Favorites")}
                                </Badge>
                              </TabsTrigger>
                              <TabsTrigger value="Active" className="gap-1">
                                Active{" "}
                                <Badge
                                  variant="secondary"
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                  {getStatusCount("Active")}
                                </Badge>
                              </TabsTrigger>
                              <TabsTrigger value="Confirmed" className="gap-1">
                                Confirmed{" "}
                                <Badge
                                  variant="secondary"
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                  {getStatusCount("Confirmed")}
                                </Badge>
                              </TabsTrigger>
                              <TabsTrigger value="Planning" className="gap-1">
                                Planning{" "}
                                <Badge
                                  variant="secondary"
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                  {getStatusCount("Planning")}
                                </Badge>
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>

                          <div className="flex gap-2 ml-auto">
                            <Button variant="default" size="sm" onClick={() => setShowTemplateWizard(true)}>
                              Create Private Event
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Event Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEvents.map((event) => (
                          <PaintlyCard
                            key={event.id}
                            type="event"
                            image={`/placeholder.svg?height=240&width=320&query=${encodeURIComponent(event.title + " " + event.company + " corporate event")}`}
                            title={event.company}
                            subtitle={event.title}
                            badges={[
                              { text: event.status, badgeType: "category" },
                              { text: event.capacity, badgeType: "canvas" },
                              ...event.tags.slice(0, 1).map((tag) => ({ text: tag, badgeType: "category" })),
                            ]}
                            metaInfo={[
                              { text: event.duration },
                              { text: event.location },
                              { text: `Rating ${event.averageRating}` },
                            ]}
                            rating={event.averageRating}
                            primaryButton={{
                              text: "View Details",
                              onClick: () => console.log("View details", event.id),
                            }}
                            secondaryButton={{
                              text: "Schedule Event",
                              onClick: () => console.log("Schedule event", event.id),
                            }}
                            onFavorite={() => toggleFavorite(event.id)}
                            isFavorited={isFavorite(event.id)}
                            menuItems={[
                              { label: "Edit Event", onClick: () => console.log("Edit", event.id) },
                              { label: "Duplicate", onClick: () => console.log("Duplicate", event.id) },
                              { label: "Deactivate", onClick: () => console.log("Deactivate", event.id) },
                            ]}
                          />
                        ))}
                      </div>

                      {filteredEvents.length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-gray-400 text-sm">No events found matching your criteria.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
        <PrivateEventWizard open={showTemplateWizard} onOpenChange={setShowTemplateWizard} />
      </SidebarProvider>
    </ThemeProvider>
  )
}
