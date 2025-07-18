"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, MapPin, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useFavorites } from "@/hooks/use-favorites"
import { AddLocationModal } from "@/components/add-location-modal"
import { PaintlyCard } from "@/components/paintly-card"

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
}

const locationsData = [
  {
    id: 1,
    name: { japanese: "アートバー代官山", english: "Artbar Daikanyama" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒150-0034 東京都渋谷区代官山町 7-2",
      english: "7-2 Daikanyamachō, Shibuya, Tōkyō 150-0034",
    },
    access: {
      japanese: "代官山駅から徒歩5分 | 恵比寿駅から徒歩5分",
      english: "5-minute walk from Daikanyama Station | 8-minute walk from Ebisu Station",
    },
    status: "active",
    type: "flagship",
    typeBadgeColor: "bg-yellow-100 text-yellow-800",
    capacity: 45,
    features: ["Private Events", "Outdoor Space", "Wheelchair Access"],
    openingHours: "11:00 - 21:00",
    phone: "+81 3-1234-5678",
    website: "artbar.co.jp/daikanyama",
  },
  {
    id: 2,
    name: { japanese: "アートバー キャットストリート原宿", english: "Artbar Cat Street Harajuku" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒150-0001東京都渋谷区神宮前5−30−2 Takaraビル 201",
      english: "5-30-2 Jingumae, Shibuya-ku, Tokyo – 201 Takara Building 150-0001",
    },
    access: {
      japanese: "渋谷駅から徒歩7分",
      english: "7-minute walk from Shibuya Station",
    },
    status: "active",
    type: "standard",
    typeBadgeColor: "bg-blue-100 text-blue-800",
    capacity: 30,
    features: ["Private Events", "Kids Classes"],
    openingHours: "12:00 - 20:00",
    phone: "+81 3-2345-6789",
    website: "artbar.co.jp/catstreet",
  },
  {
    id: 3,
    name: { japanese: "アートバー銀座", english: "Artbar Ginza" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒104-0061 東京都中央区銀座3-3-12 銀座ビル3階",
      english: "Ginza, Chuo-ku, 3-3-12 3rd Floor Ginza Building",
    },
    access: {
      japanese:
        "東京メトロ丸ノ内線・日比谷線・銀座線「銀座駅」C8出口より徒歩1分\n東京メトロ有楽町線「銀座一丁目駅」4番出口より徒歩4分\n東京メトロ有楽町線「有楽町駅」D8出口より徒歩5分",
      english:
        "1-minute walk from Ginza Station Exit C8 of Metro Marunouchi, Hibiya and Ginza Line\n4-minute walk from Ginza-itchome Station Exit 4 of Metro Yurakucho Line\n5-minute walk from Yurakucho Station Exit D8 of Metro Yurakucho Line",
    },
    status: "active",
    type: "premium",
    typeBadgeColor: "bg-purple-100 text-purple-800",
    capacity: 40,
    features: ["Private Events", "Corporate Events", "Wheelchair Access"],
    openingHours: "10:00 - 22:00",
    phone: "+81 3-3456-7890",
    website: "artbar.co.jp/ginza",
  },
  {
    id: 4,
    name: { japanese: "アートバー横浜元町", english: "Artbar Yokohama Motomachi" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "231-0861 神奈川県横浜市中区元町1-27-2 エンセント横濱元町ビル 2F",
      english: "231-0861 Kanagawa-ken, Yokohama-shi, Naka-ku Motomachi 1-27-2 Enscent Yokohama Motomachi Bld 2nd floor",
    },
    access: {
      japanese: "元町・中華街駅 – 徒歩3分 | 石川町駅 – 徒歩10分",
      english: "Motomachi-Chukagai station – 3 min walk | Ishikawacho station – 10 min walk",
    },
    status: "active",
    type: "standard",
    typeBadgeColor: "bg-blue-100 text-blue-800",
    capacity: 35,
    features: ["Private Events", "Kids Classes", "Wheelchair Access"],
    openingHours: "11:00 - 20:00",
    phone: "+81 45-123-4567",
    website: "artbar.co.jp/yokohama",
  },
  {
    id: 5,
    name: { japanese: "アートバー大阪", english: "Artbar Osaka" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒542-0076 大阪府大阪市中央区難波５丁目１−60 なんばスカイオ17Ｆ",
      english: "Namba Skio 17F, 5-1-60 Namba, Chuo-ku, Osaka 542-0076",
    },
    access: {
      japanese: "なんば駅から徒歩3分",
      english: "3-minute walk from Namba Station",
    },
    status: "active",
    type: "franchise",
    typeBadgeColor: "bg-green-100 text-green-800",
    capacity: 50,
    features: ["Private Events", "Corporate Events", "Kids Classes"],
    openingHours: "10:00 - 21:00",
    phone: "+81 6-1234-5678",
    website: "artbar.co.jp/osaka",
  },
  {
    id: 6,
    name: { japanese: "アートバー沖縄", english: "Artbar Okinawa" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒901-1515 沖縄県南城市知念字山里137-3 MSYビル3F",
      english: "MSY Building 3F, 137-3 Yamanzato, Chinen, Nanjo City, Okinawa 901-1515",
    },
    access: {
      japanese: "那覇空港から車で40分",
      english: "40-minute drive from Naha Airport",
    },
    status: "under_construction",
    type: "franchise",
    typeBadgeColor: "bg-green-100 text-green-800",
    capacity: 30,
    features: ["Private Events", "Ocean View", "Kids Classes"],
    openingHours: "10:00 - 19:00",
    phone: "+81 50-1808-2882",
    website: "artbar.co.jp/okinawa",
  },
  {
    id: 7,
    name: { japanese: "アートバー福岡", english: "Artbar Fukuoka" },
    photo: "/placeholder.svg?height=240&width=320",
    address: {
      japanese: "〒810-0001 福岡県福岡市中央区天神2-8-34",
      english: "2-8-34 Tenjin, Chuo-ku, Fukuoka 810-0001",
    },
    access: {
      japanese: "天神駅から徒歩5分",
      english: "5-minute walk from Tenjin Station",
    },
    status: "coming_soon",
    type: "franchise",
    typeBadgeColor: "bg-green-100 text-green-800",
    capacity: 40,
    features: ["Private Events", "Corporate Events"],
    openingHours: "11:00 - 21:00",
    phone: "Coming Soon",
    website: "artbar.co.jp/fukuoka",
  },
]

const statusOptions = ["All Status", "Active", "Under Construction", "Coming Soon"]

// Featured Section Component with comprehensive bottom margin fix
function FeaturedSection({
  title,
  subtitle,
  children,
  isEmpty = false,
  emptyMessage = "Favorite items appear here for quick access.",
}) {
  if (isEmpty) {
    return (
      <div className="mb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Heart className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center max-w-md">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {/* Generous spacing and padding to prevent clipping */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </div>
  )
}

// Featured Card Component
function FeaturedCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}

function LocationsContent() {
  const router = useRouter()
  const [showAddLocationModal, setShowAddLocationModal] = useState(false)

  // Get favorited locations for Featured section
  const { toggleFavorite, isFavorite, favorites } = useFavorites("locations")

  const featuredLocations = useMemo(() => {
    return locationsData.filter((location) => isFavorite(location.id)).slice(0, 6)
  }, [isFavorite, favorites])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [activeTab, setActiveTab] = useState("all")

  const filteredLocations = useMemo(() => {
    return locationsData.filter((location) => {
      const matchesSearch =
        searchTerm === "" ||
        location.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.name.japanese.includes(searchTerm) ||
        location.address.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.japanese.includes(searchTerm)

      const statusMap: Record<string, string> = {
        active: "Active",
        under_construction: "Under Construction",
        coming_soon: "Coming Soon",
      }

      const matchesStatus = selectedStatus === "All Status" || statusMap[location.status] === selectedStatus

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && location.status === "active") ||
        (activeTab === "franchise" && location.type === "franchise") ||
        (activeTab === "upcoming" && (location.status === "under_construction" || location.status === "coming_soon")) ||
        (activeTab === "favorites" && isFavorite(location.id))

      return matchesSearch && matchesStatus && matchesTab
    })
  }, [searchTerm, selectedStatus, activeTab, isFavorite, favorites])

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "under_construction":
        return "bg-amber-100 text-amber-700"
      case "coming_soon":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "under_construction":
        return "Under Construction"
      case "coming_soon":
        return "Coming Soon"
      default:
        return "Active"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "flagship":
        return "bg-yellow-100 text-yellow-700"
      case "premium":
        return "bg-purple-100 text-purple-700"
      case "standard":
        return "bg-blue-100 text-blue-700"
      case "franchise":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      {/* Featured Section */}
      <FeaturedSection
        title="Featured"
        subtitle="Your frequently used locations"
        isEmpty={featuredLocations.length === 0}
      >
        {featuredLocations.map((location) => (
          <PaintlyCard
            key={location.id}
            type="location"
            image={location.photo}
            title={location.name.japanese}
            subtitle={location.name.english}
            badges={[
              { text: getStatusText(location.status), badgeType: "category" },
              { text: location.type.charAt(0).toUpperCase() + location.type.slice(1), badgeType: "skill" },
              { text: `${location.capacity} capacity`, badgeType: "canvas" },
            ]}
            metaInfo={[
              { text: `${Math.floor(Math.random() * 5) + 1} events today` },
              { text: `${Math.floor(Math.random() * 30) + 70}% capacity` },
              { text: location.openingHours },
            ]}
            primaryButton={{
              text: "View Details",
              onClick: () => {
                const locationRoutes: Record<number, string> = {
                  1: "/locations/daikanyama",
                  2: "/locations/cat-street",
                  3: "/locations/ginza",
                  4: "/locations/yokohama",
                  5: "/locations/osaka",
                  6: "/locations/okinawa",
                  7: "/locations/fukuoka",
                }
                router.push(locationRoutes[location.id] || "/locations/daikanyama")
              },
            }}
            secondaryButton={{
              text: "Schedule Event",
              onClick: () => console.log("Schedule event for", location.name.english),
              variant: "outline",
            }}
            onFavorite={() => toggleFavorite(location.id)}
            isFavorited={isFavorite(location.id)}
            menuItems={[
              { label: "Edit Location", onClick: () => console.log("Edit", location.name.english) },
              { label: "View Analytics", onClick: () => console.log("Analytics", location.name.english) },
              { label: "Deactivate", onClick: () => console.log("Deactivate", location.name.english) },
            ]}
          />
        ))}
      </FeaturedSection>

      {/* All Locations Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Locations</h2>
          <p className="text-gray-600">Manage your complete network of studio locations</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="lg:ml-auto">
            <Button size="sm" className="w-full" onClick={() => setShowAddLocationModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Locations</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="franchise">Franchise</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites{" "}
              {favorites.size > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {favorites.size}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredLocations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No locations found</h3>
                <p className="text-muted-foreground mb-4">
                  No locations match your current search and filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedStatus("All Status")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PaintlyCard
                      type="location"
                      image={location.photo}
                      title={location.name.japanese}
                      subtitle={location.name.english}
                      badges={[
                        { text: getStatusText(location.status), badgeType: "category" },
                        { text: location.type.charAt(0).toUpperCase() + location.type.slice(1), badgeType: "skill" },
                        { text: `${location.capacity} capacity`, badgeType: "canvas" },
                      ]}
                      metaInfo={[
                        { text: `${Math.floor(Math.random() * 5) + 1} events today` },
                        { text: `${Math.floor(Math.random() * 30) + 70}% capacity` },
                        { text: location.openingHours },
                        {
                          text:
                            location.features.slice(0, 2).join(", ") +
                            (location.features.length > 2 ? ` +${location.features.length - 2}` : ""),
                        },
                      ]}
                      primaryButton={{
                        text: "View Details",
                        onClick: () => {
                          const locationRoutes: Record<number, string> = {
                            1: "/locations/daikanyama",
                            2: "/locations/cat-street",
                            3: "/locations/ginza",
                            4: "/locations/yokohama",
                            5: "/locations/osaka",
                            6: "/locations/okinawa",
                            7: "/locations/fukuoka",
                          }
                          router.push(locationRoutes[location.id] || "/locations/daikanyama")
                        },
                      }}
                      secondaryButton={{
                        text: "Schedule Event",
                        onClick: () => console.log("Schedule event for", location.name.english),
                        variant: "outline",
                      }}
                      onFavorite={() => toggleFavorite(location.id)}
                      isFavorited={isFavorite(location.id)}
                      menuItems={[
                        { label: "Edit Location", onClick: () => console.log("Edit", location.name.english) },
                        { label: "View Analytics", onClick: () => console.log("Analytics", location.name.english) },
                        { label: "Deactivate", onClick: () => console.log("Deactivate", location.name.english) },
                      ]}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Location Modal */}
      <AddLocationModal open={showAddLocationModal} onOpenChange={setShowAddLocationModal} />
    </div>
  )
}

export default function LocationsPage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <AnimatePresence mode="wait">
            <motion.div key="locations" {...pageTransition} className="flex-1">
              <LocationsContent />
            </motion.div>
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
