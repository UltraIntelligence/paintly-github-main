"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Download,
  Upload,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Globe,
  Building,
} from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    photo: "/placeholder.svg?height=240&width=320&query=modern art studio in daikanyama",
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
    photo: "/placeholder.svg?height=240&width=320&query=trendy art studio in harajuku",
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
    photo: "/placeholder.svg?height=240&width=320&query=upscale art studio in ginza tokyo",
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
    photo: "/placeholder.svg?height=240&width=320&query=art studio in yokohama motomachi",
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
    photo: "/placeholder.svg?height=240&width=320&query=art studio in osaka japan",
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
    photo: "/placeholder.svg?height=240&width=320&query=art studio in okinawa japan",
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
    photo: "/placeholder.svg?height=240&width=320&query=art studio in fukuoka japan",
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

const regions = ["All Regions", "Tokyo", "Kanagawa", "Osaka", "Okinawa", "Fukuoka"]
const statusOptions = ["All Status", "Active", "Under Construction", "Coming Soon"]

function LocationsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
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

      const getRegion = (address: string) => {
        if (address.includes("Tokyo") || address.includes("東京")) return "Tokyo"
        if (address.includes("Kanagawa") || address.includes("神奈川")) return "Kanagawa"
        if (address.includes("Osaka") || address.includes("大阪")) return "Osaka"
        if (address.includes("Okinawa") || address.includes("沖縄")) return "Okinawa"
        if (address.includes("Fukuoka") || address.includes("福岡")) return "Fukuoka"
        return ""
      }

      const locationRegion = getRegion(location.address.english + location.address.japanese)
      const matchesRegion = selectedRegion === "All Regions" || locationRegion === selectedRegion

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
        (activeTab === "upcoming" && (location.status === "under_construction" || location.status === "coming_soon"))

      return matchesSearch && matchesRegion && matchesStatus && matchesTab
    })
  }, [searchTerm, selectedRegion, selectedStatus, activeTab])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-3 w-3 text-green-500" />
      case "under_construction":
        return <AlertCircle className="h-3 w-3 text-amber-500" />
      case "coming_soon":
        return <XCircle className="h-3 w-3 text-blue-500" />
      default:
        return <CheckCircle2 className="h-3 w-3 text-green-500" />
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

  const getFeatureBadgeColor = (feature: string) => {
    switch (feature) {
      case "Private Events":
        return "bg-blue-100 text-blue-800"
      case "Corporate Events":
        return "bg-purple-100 text-purple-800"
      case "Kids Classes":
        return "bg-pink-100 text-pink-800"
      case "Wheelchair Access":
        return "bg-green-100 text-green-800"
      case "Outdoor Space":
        return "bg-emerald-100 text-emerald-800"
      case "Ocean View":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        <div className="flex flex-col gap-2 sm:flex-row ml-auto">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
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
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No locations found</h3>
              <p className="text-muted-foreground mb-4">No locations match your current search and filter criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("All Regions")
                  setSelectedStatus("All Status")
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLocations.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 bg-muted/50 hover:bg-background hover:shadow-md transition-all duration-200">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={location.photo || "/placeholder.svg?height=240&width=320&query=art studio"}
                        alt={`${location.name.english} location`}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      {/* Header with name and type */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm leading-tight mb-1 truncate">{location.name.japanese}</h3>
                          <p className="text-xs text-muted-foreground truncate">{location.name.english}</p>
                        </div>
                        <Badge variant="secondary" className={`ml-2 text-xs px-2 py-0.5 ${location.typeBadgeColor}`}>
                          {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                        </Badge>
                      </div>

                      {/* Address */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{location.address.japanese}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{location.address.english}</p>
                      </div>

                      {/* Access */}
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Access:</p>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{location.access.japanese}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{location.access.english}</p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {location.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} className={`text-xs px-2 py-0.5 ${getFeatureBadgeColor(feature)}`}>
                            {feature}
                          </Badge>
                        ))}
                        {location.features.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{location.features.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Status and Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(location.status)}
                          <span className="text-xs font-medium">{getStatusText(location.status)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          <span className="truncate">Capacity: {location.capacity} people</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span className="truncate">{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          <span className="truncate">{location.website}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 h-8 text-xs">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function LocationsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
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
