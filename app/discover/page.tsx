"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, Search, X, ChevronDown } from "lucide-react"
import { CustomerEventCard } from "@/components/customer-event-card"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Sample events data with beautiful painting images
const sampleEvents = [
  // Keep the original 12 events first
  {
    id: "alcohol-ink-portrait",
    title: "アルコールインクで彩るオリジナルポートレート",
    titleEn: "Alcohol Ink Custom Portrait",
    instructor: "RIE",
    date: "2025-06-08",
    startTime: "10:00",
    endTime: "12:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "Intermediate",
    canvasSize: "F6",
    price: 4400,
    capacity: 12,
    booked: 8,
    rating: 4.8,
    popularity: "Used 12x this month",
    category: "Alcohol Ink",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "van-gogh-starry-night",
    title: "ゴッホの星月夜を描こう",
    titleEn: "Van Gogh's Starry Night",
    instructor: "YUKI",
    date: "2025-06-09",
    startTime: "14:00",
    endTime: "16:30",
    location: "Artbar Ginza",
    duration: "2.5 hours",
    difficulty: "Beginner",
    canvasSize: "F8",
    price: 3800,
    capacity: 15,
    booked: 15,
    rating: 4.9,
    popularity: "Most popular this week",
    category: "Van Gogh",
    image: "/placeholder.svg?height=400&width=600",
    status: "sold-out",
  },
  {
    id: "monet-water-lilies",
    title: "モネの睡蓮ガーデン",
    titleEn: "Monet's Water Lily Garden",
    instructor: "SAKURA",
    date: "2025-06-10",
    startTime: "11:00",
    endTime: "13:00",
    location: "Artbar Daikanyama",
    duration: "2 hours",
    difficulty: "Intermediate",
    canvasSize: "F6",
    price: 4200,
    capacity: 10,
    booked: 8,
    rating: 4.7,
    popularity: "Trending now",
    category: "Monet",
    image: "/placeholder.svg?height=400&width=600",
    status: "few-spots",
  },
  {
    id: "kids-rainbow-pour",
    title: "キッズレインボーペイント",
    titleEn: "Kids Rainbow Paint Pour",
    instructor: "MIKI",
    date: "2025-06-11",
    startTime: "10:00",
    endTime: "11:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "F4",
    price: 2800,
    capacity: 8,
    booked: 3,
    rating: 4.6,
    popularity: "Perfect for families",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "japanese-cherry-blossom",
    title: "日本の桜アート",
    titleEn: "Japanese Cherry Blossom Art",
    instructor: "HIROSHI",
    date: "2025-06-12",
    startTime: "15:00",
    endTime: "17:30",
    location: "Artbar Cat Street",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 4600,
    capacity: 12,
    booked: 5,
    rating: 4.8,
    popularity: "Cultural favorite",
    category: "Japanese Art",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "abstract-texture-art",
    title: "抽象テクスチャーアート",
    titleEn: "Abstract Texture Exploration",
    instructor: "ALEX",
    date: "2025-06-13",
    startTime: "19:00",
    endTime: "21:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Advanced",
    canvasSize: "F6",
    price: 5200,
    capacity: 8,
    booked: 6,
    rating: 4.9,
    popularity: "Artist's choice",
    category: "Abstract",
    image: "/placeholder.svg?height=400&width=600",
    status: "few-spots",
  },
  {
    id: "pet-portrait-class",
    title: "愛するペットの肖像画",
    titleEn: "Beloved Pet Portrait",
    instructor: "EMMA",
    date: "2025-06-14",
    startTime: "13:00",
    endTime: "16:00",
    location: "Artbar Osaka",
    duration: "3 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 5800,
    capacity: 6,
    booked: 4,
    rating: 4.7,
    popularity: "Heartwarming favorite",
    category: "Portraits",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "tokyo-skyline-night",
    title: "東京夜景スカイライン",
    titleEn: "Tokyo Skyline at Night",
    instructor: "KENJI",
    date: "2025-06-15",
    startTime: "18:00",
    endTime: "20:30",
    location: "Artbar Cat Street",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F10",
    price: 4800,
    capacity: 10,
    booked: 7,
    rating: 4.8,
    popularity: "Local inspiration",
    category: "Tokyo Scenes",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "couples-date-night",
    title: "カップルズペイントナイト",
    titleEn: "Couples Paint & Wine Night",
    instructor: "YUKI & RIE",
    date: "2025-06-16",
    startTime: "19:30",
    endTime: "22:00",
    location: "Artbar Daikanyama",
    duration: "2.5 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 6800,
    capacity: 16,
    booked: 12,
    rating: 4.9,
    popularity: "Perfect date night",
    category: "Date Night",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "fluid-art-pour",
    title: "フルイドアートポーリング",
    titleEn: "Fluid Art Paint Pouring",
    instructor: "MAYA",
    date: "2025-06-17",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Fukuoka",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 3600,
    capacity: 12,
    booked: 9,
    rating: 4.6,
    popularity: "Mesmerizing technique",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "van-gogh-sunflowers",
    title: "ゴッホのひまわり",
    titleEn: "Van Gogh's Sunflowers",
    instructor: "HIROSHI",
    date: "2025-06-18",
    startTime: "10:30",
    endTime: "13:00",
    location: "Artbar Ginza",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 4200,
    capacity: 12,
    booked: 10,
    rating: 4.8,
    popularity: "Classic masterpiece",
    category: "Van Gogh",
    image: "/placeholder.svg?height=400&width=600",
    status: "few-spots",
  },
  {
    id: "galaxy-pour-painting",
    title: "ギャラクシーポーリング",
    titleEn: "Galaxy Pour Painting",
    instructor: "ALEX",
    date: "2025-06-21",
    startTime: "17:00",
    endTime: "19:30",
    location: "Artbar Cat Street",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F6",
    price: 4400,
    capacity: 10,
    booked: 8,
    rating: 4.7,
    popularity: "Cosmic creation",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  // Add ALL the new June events from your data
  {
    id: "cupcake-sprinkles-jun8",
    title: "カップケーキ 25cm丸",
    titleEn: "Cupcake with Sprinkles on 25 cm round canvas",
    instructor: "Mineko",
    date: "2025-06-08",
    startTime: "11:00",
    endTime: "13:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "25cm",
    price: 6500,
    capacity: 12,
    booked: 5,
    rating: 4.7,
    popularity: "Sweet favorite",
    category: "Beginner",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-frida-kitty-jun8",
    title: "キッズ キレイな猫",
    titleEn: "Kids Only Frida Flower Kitty",
    instructor: "Michi",
    date: "2025-06-08",
    startTime: "12:00",
    endTime: "13:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "F4",
    price: 2800,
    capacity: 8,
    booked: 3,
    rating: 4.6,
    popularity: "Kids favorite",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "pouring-bear-keychain-jun9",
    title: "くまさんキーホルダー",
    titleEn: "Pouring Bear Key Chain",
    instructor: "Mineko",
    date: "2025-06-09",
    startTime: "11:00",
    endTime: "12:30",
    location: "Artbar Cat Street",
    duration: "1.5 hours",
    difficulty: "Beginner",
    canvasSize: "Keychain",
    price: 4800,
    capacity: 12,
    booked: 7,
    rating: 4.5,
    popularity: "Cute accessory",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "mini-alcohol-ink-tiles-jun9",
    title: "ミニタイル",
    titleEn: "Mini Alcohol Ink Tiles",
    instructor: "Daria",
    date: "2025-06-09",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Tile",
    price: 5800,
    capacity: 10,
    booked: 6,
    rating: 4.7,
    popularity: "Unique decor",
    category: "Alcohol Ink",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "custom-initial-art-jun10",
    title: "イニシャル",
    titleEn: "Custom Initial Art",
    instructor: "Emma",
    date: "2025-06-10",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Daikanyama",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "F4",
    price: 5800,
    capacity: 10,
    booked: 4,
    rating: 4.8,
    popularity: "Personalized gift",
    category: "Abstract",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-koinobori-flags-jun11",
    title: "キッズ 鯉のぼり",
    titleEn: "Kids Koinobori Flags",
    instructor: "Michi",
    date: "2025-06-11",
    startTime: "12:00",
    endTime: "13:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "Flag",
    price: 2800,
    capacity: 8,
    booked: 2,
    rating: 4.9,
    popularity: "Festive fun",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "japanese-sumi-ink-jun12",
    title: "墨絵",
    titleEn: "Japanese Sumi Ink",
    instructor: "Hiroshi",
    date: "2025-06-12",
    startTime: "18:00",
    endTime: "20:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "Intermediate",
    canvasSize: "F6",
    price: 5800,
    capacity: 12,
    booked: 6,
    rating: 4.6,
    popularity: "Traditional art",
    category: "Japanese Art",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "alcohol-ink-planters-jun13",
    title: "植木鉢",
    titleEn: "Alcohol Ink Planters",
    instructor: "Daria",
    date: "2025-06-13",
    startTime: "11:00",
    endTime: "13:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Planter",
    price: 6800,
    capacity: 10,
    booked: 5,
    rating: 4.7,
    popularity: "Green thumb",
    category: "Alcohol Ink",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "paint-your-partner-jun14",
    title: "お互いをペイント",
    titleEn: "Paint Your Partner",
    instructor: "Yuki & Rie",
    date: "2025-06-14",
    startTime: "19:30",
    endTime: "22:00",
    location: "Artbar Daikanyama",
    duration: "2.5 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 7800,
    capacity: 16,
    booked: 10,
    rating: 4.9,
    popularity: "Romantic night",
    category: "Date Night",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-animal-pour-jun15",
    title: "キッズ 動物",
    titleEn: "Kids Animal Paint Pour",
    instructor: "Michi",
    date: "2025-06-15",
    startTime: "10:00",
    endTime: "11:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "F4",
    price: 2800,
    capacity: 8,
    booked: 4,
    rating: 4.8,
    popularity: "Wild adventure",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "fluid-bearbrick-jun16",
    title: "ベアブリック",
    titleEn: "Fluid Bearbrick",
    instructor: "Maya",
    date: "2025-06-16",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Fukuoka",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Bearbrick",
    price: 5800,
    capacity: 12,
    booked: 8,
    rating: 4.7,
    popularity: "Trendy toy",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kintsugi-repair-jun17",
    title: "金継ぎ",
    titleEn: "Kintsugi Repair",
    instructor: "Hiroshi",
    date: "2025-06-17",
    startTime: "18:00",
    endTime: "20:30",
    location: "Artbar Cat Street",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "Various",
    price: 6800,
    capacity: 12,
    booked: 7,
    rating: 4.9,
    popularity: "Ancient craft",
    category: "Japanese Art",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  // Add ALL the July events from your data
  {
    id: "japanese-block-printing-jul1",
    title: "日本の版画とデザイン スタンプ帳",
    titleEn: "Japanese Block printing and design Stamp book",
    instructor: "Daria",
    date: "2025-07-01",
    startTime: "12:00",
    endTime: "14:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Intermediate",
    canvasSize: "Book",
    price: 6500,
    capacity: 10,
    booked: 4,
    rating: 4.8,
    popularity: "Cultural art",
    category: "Japanese Art",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "freestyle-studio-jul1",
    title: "2時間フリースタイル オープンスタジオ",
    titleEn: "2 Hr. Freestyle Open Studio",
    instructor: "Naomi",
    date: "2025-07-01",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "All Levels",
    canvasSize: "Various",
    price: 6500,
    capacity: 15,
    booked: 8,
    rating: 4.5,
    popularity: "Creative freedom",
    category: "Abstract",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "alcohol-ink-clock-jul2",
    title: "時計 20cm",
    titleEn: "Alcohol Ink Clock 20cm",
    instructor: "Daria",
    date: "2025-07-02",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "20cm",
    price: 7800,
    capacity: 10,
    booked: 3,
    rating: 4.7,
    popularity: "Time flies",
    category: "Alcohol Ink",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-fan-painting-jul3",
    title: "キッズ扇子",
    titleEn: "Kids Fan Painting",
    instructor: "Michi",
    date: "2025-07-03",
    startTime: "12:00",
    endTime: "13:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "Fan",
    price: 2800,
    capacity: 8,
    booked: 5,
    rating: 4.6,
    popularity: "Cool breeze",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "acrylic-pouring-jul4",
    title: "アクリルポーリング",
    titleEn: "Acrylic Pouring",
    instructor: "Maya",
    date: "2025-07-04",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Fukuoka",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 5800,
    capacity: 12,
    booked: 7,
    rating: 4.8,
    popularity: "Fluid art",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "van-gogh-irises-jul5",
    title: "ゴッホ アイリス",
    titleEn: "Van Gogh Irises",
    instructor: "Yuki",
    date: "2025-07-05",
    startTime: "14:00",
    endTime: "16:30",
    location: "Artbar Ginza",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 6800,
    capacity: 15,
    booked: 9,
    rating: 4.9,
    popularity: "Floral masterpiece",
    category: "Van Gogh",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "date-night-jul6",
    title: "ロマンチックデート",
    titleEn: "Romantic Date Night",
    instructor: "Yuki & Rie",
    date: "2025-07-06",
    startTime: "19:30",
    endTime: "22:00",
    location: "Artbar Daikanyama",
    duration: "2.5 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 7800,
    capacity: 16,
    booked: 12,
    rating: 4.7,
    popularity: "Love is in the air",
    category: "Date Night",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-fireworks-jul7",
    title: "キッズ花火",
    titleEn: "Kids Fireworks",
    instructor: "Michi",
    date: "2025-07-07",
    startTime: "12:00",
    endTime: "13:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "F4",
    price: 2800,
    capacity: 8,
    booked: 6,
    rating: 4.8,
    popularity: "Sparkling fun",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "sumi-ink-landscape-jul8",
    title: "墨絵風景",
    titleEn: "Sumi Ink Landscape",
    instructor: "Hiroshi",
    date: "2025-07-08",
    startTime: "18:00",
    endTime: "20:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "Intermediate",
    canvasSize: "F6",
    price: 6800,
    capacity: 12,
    booked: 8,
    rating: 4.9,
    popularity: "Zen garden",
    category: "Japanese Art",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "alcohol-ink-coaster-jul9",
    title: "アルコールインクコースター",
    titleEn: "Alcohol Ink Coaster",
    instructor: "Daria",
    date: "2025-07-09",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Ginza",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Coaster",
    price: 5800,
    capacity: 10,
    booked: 4,
    rating: 4.7,
    popularity: "Drink in style",
    category: "Alcohol Ink",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "fluid-art-planter-jul10",
    title: "フルイドアート植木鉢",
    titleEn: "Fluid Art Planter",
    instructor: "Maya",
    date: "2025-07-10",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Fukuoka",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Planter",
    price: 6800,
    capacity: 12,
    booked: 6,
    rating: 4.8,
    popularity: "Blooming beauty",
    category: "Paint Pouring",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "monet-bridge-jul11",
    title: "モネの橋",
    titleEn: "Monet's Bridge",
    instructor: "Sakura",
    date: "2025-07-11",
    startTime: "14:00",
    endTime: "16:30",
    location: "Artbar Daikanyama",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 7800,
    capacity: 10,
    booked: 5,
    rating: 4.9,
    popularity: "Iconic scene",
    category: "Monet",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
  {
    id: "kids-origami-jul12",
    title: "キッズ折り紙",
    titleEn: "Kids Origami",
    instructor: "Michi",
    date: "2025-07-12",
    startTime: "12:00",
    endTime: "13:30",
    location: "Artbar Yokohama",
    duration: "1.5 hours",
    difficulty: "Kids",
    canvasSize: "Paper",
    price: 2800,
    capacity: 8,
    booked: 3,
    rating: 4.6,
    popularity: "Paper magic",
    category: "Kids & Family",
    image: "/placeholder.svg?height=400&width=600",
    status: "available",
  },
]

// Extract unique values for filters
const allLocations = Array.from(new Set(sampleEvents.map((event) => event.location)))
const allCategories = Array.from(new Set(sampleEvents.map((event) => event.category)))
const allInstructors = Array.from(new Set(sampleEvents.map((event) => event.instructor)))
const allDifficulties = Array.from(new Set(sampleEvents.map((event) => event.difficulty)))

const categories = [
  "All Classes",
  "Paint Pouring",
  "Master Artists",
  "Beginner",
  "Kids & Family",
  "Japanese Art",
  "Abstract",
  "Portraits",
  "Tokyo Scenes",
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)

  // Multi-select filter states
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [availableOnly, setAvailableOnly] = useState(true)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  // Active filter count
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const categoryScrollRef = useRef<HTMLDivElement>(null)

  // Update active filter count
  useEffect(() => {
    let count = 0
    if (selectedLocations.length > 0) count++
    if (selectedCategories.length > 0) count++
    if (selectedInstructors.length > 0) count++
    if (selectedDifficulties.length > 0) count++
    if (selectedDate) count++
    if (availableOnly) count++
    setActiveFilterCount(count)
  }, [selectedLocations, selectedCategories, selectedInstructors, selectedDifficulties, selectedDate, availableOnly])

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const toggleFavorite = (eventId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(eventId)) {
      newFavorites.delete(eventId)
    } else {
      newFavorites.add(eventId)
    }
    setFavorites(newFavorites)
  }

  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }

  const clearAllFilters = () => {
    setSelectedLocations([])
    setSelectedCategories([])
    setSelectedInstructors([])
    setSelectedDifficulties([])
    setSelectedDate(undefined)
    setAvailableOnly(false)
    setPriceRange([0, 10000])
    setSearchQuery("")
  }

  const toggleLocationFilter = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    )
  }

  const toggleInstructorFilter = (instructor: string) => {
    setSelectedInstructors((prev) =>
      prev.includes(instructor) ? prev.filter((inst) => inst !== instructor) : [...prev, instructor],
    )
  }

  const toggleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((diff) => diff !== difficulty) : [...prev, difficulty],
    )
  }

  const filteredEvents = sampleEvents.filter((event) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.popularity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.canvasSize.toLowerCase().includes(searchQuery.toLowerCase())

    // Location filter
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(event.location)

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category)

    // Instructor filter
    const matchesInstructor = selectedInstructors.length === 0 || selectedInstructors.includes(event.instructor)

    // Difficulty filter
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(event.difficulty)

    // Availability filter
    const matchesAvailability = !availableOnly || event.status !== "sold-out"

    // Price range filter
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1]

    // Date filter
    const matchesDate = !selectedDate || event.date === format(selectedDate, "yyyy-MM-dd")

    // Month filter (June events)
    const isJuneEvent = event.date.startsWith("2025-06")

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesInstructor &&
      matchesDifficulty &&
      matchesAvailability &&
      matchesPrice &&
      matchesDate &&
      isJuneEvent
    )
  })

  const startingSoonEvents = [
    {
      id: "early-morning-pour-jun7",
      title: "モーニングポーリング",
      titleEn: "Early Morning Paint Pour",
      instructor: "MAYA",
      date: "2025-06-07",
      startTime: "08:00",
      endTime: "10:00",
      location: "Artbar Cat Street",
      duration: "2 hours",
      difficulty: "Beginner",
      canvasSize: "F6",
      price: 3800,
      capacity: 12,
      booked: 10,
      rating: 4.8,
      popularity: "Early bird special",
      category: "Paint Pouring",
      image: "/placeholder.svg?height=400&width=600",
      status: "few-spots",
    },
    {
      id: "sunrise-sumi-jun7",
      title: "朝の墨絵",
      titleEn: "Sunrise Sumi Ink",
      instructor: "HIROSHI",
      date: "2025-06-07",
      startTime: "09:00",
      endTime: "11:00",
      location: "Artbar Ginza",
      duration: "2 hours",
      difficulty: "Intermediate",
      canvasSize: "F6",
      price: 4200,
      capacity: 10,
      booked: 8,
      rating: 4.7,
      popularity: "Zen morning",
      category: "Japanese Art",
      image: "/placeholder.svg?height=400&width=600",
      status: "few-spots",
    },
    {
      id: "weekend-alcohol-ink-jun8",
      title: "週末アルコールインク",
      titleEn: "Weekend Alcohol Ink",
      instructor: "DARIA",
      date: "2025-06-08",
      startTime: "09:00",
      endTime: "11:00",
      location: "Artbar Daikanyama",
      duration: "2 hours",
      difficulty: "Beginner",
      canvasSize: "F4",
      price: 4000,
      capacity: 12,
      booked: 9,
      rating: 4.6,
      popularity: "Weekend starter",
      category: "Alcohol Ink",
      image: "/placeholder.svg?height=400&width=600",
      status: "few-spots",
    },
    {
      id: "early-van-gogh-jun8",
      title: "朝のゴッホ",
      titleEn: "Early Van Gogh Session",
      instructor: "YUKI",
      date: "2025-06-08",
      startTime: "09:30",
      endTime: "12:00",
      location: "Artbar Yokohama",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      canvasSize: "F8",
      price: 4500,
      capacity: 15,
      booked: 13,
      rating: 4.9,
      popularity: "Master class",
      category: "Van Gogh",
      image: "/placeholder.svg?height=400&width=600",
      status: "few-spots",
    },
    {
      id: "kids-early-fun-jun8",
      title: "キッズ朝の楽しみ",
      titleEn: "Kids Early Fun Session",
      instructor: "MICHI",
      date: "2025-06-08",
      startTime: "10:00",
      endTime: "11:30",
      location: "Artbar Osaka",
      duration: "1.5 hours",
      difficulty: "Kids",
      canvasSize: "F4",
      price: 2800,
      capacity: 8,
      booked: 6,
      rating: 4.8,
      popularity: "Family favorite",
      category: "Kids & Family",
      image: "/placeholder.svg?height=400&width=600",
      status: "available",
    },
    {
      id: "morning-abstract-jun8",
      title: "朝の抽象アート",
      titleEn: "Morning Abstract Art",
      instructor: "ALEX",
      date: "2025-06-08",
      startTime: "10:30",
      endTime: "12:30",
      location: "Artbar Fukuoka",
      duration: "2 hours",
      difficulty: "Advanced",
      canvasSize: "F6",
      price: 5000,
      capacity: 8,
      booked: 6,
      rating: 4.7,
      popularity: "Creative morning",
      category: "Abstract",
      image: "/placeholder.svg?height=400&width=600",
      status: "few-spots",
    },
  ]

  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div className="min-h-screen bg-white pt-8">
            {/* All existing content stays the same */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Developer-only navigation links */}
              <div className="absolute top-2 left-2 z-10 flex gap-2">
                <Button
                  onClick={() => (window.location.href = "/events/sample")}
                  variant="outline"
                  size="sm"
                  className="opacity-30 hover:opacity-100 text-xs border-dashed border-gray-300 bg-transparent"
                >
                  Dev: Event Page
                </Button>
              </div>

              {/* New Search and Filter Section */}
              <div className="mb-16">
                <div className="relative">
                  {/* Main search bar and filter button */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search classes, instructors, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-6 text-base rounded-full border-gray-200 focus:border-gray-300 focus:ring-gray-300 shadow-sm"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 px-6 py-6 rounded-full border-gray-200 hover:bg-gray-50"
                        >
                          <Filter className="w-5 h-5" />
                          <span className="font-medium">Filters</span>
                          {activeFilterCount > 0 && (
                            <Badge className="ml-1 bg-gray-900 hover:bg-gray-800">{activeFilterCount}</Badge>
                          )}
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[380px] p-0" align="end">
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">Filters</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearAllFilters}
                              className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                              Clear all
                            </Button>
                          </div>

                          {/* Date filter */}
                          <div className="mb-5">
                            <h4 className="font-medium mb-3">Date</h4>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <Separator className="my-4" />

                          {/* Location filter */}
                          <div className="mb-5">
                            <h4 className="font-medium mb-3">Location</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {allLocations.map((location) => (
                                <div key={location} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`location-${location}`}
                                    checked={selectedLocations.includes(location)}
                                    onCheckedChange={() => toggleLocationFilter(location)}
                                  />
                                  <Label htmlFor={`location-${location}`} className="text-sm cursor-pointer">
                                    {location}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Category filter */}
                          <div className="mb-5">
                            <h4 className="font-medium mb-3">Category</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {allCategories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={() => toggleCategoryFilter(category)}
                                  />
                                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                                    {category}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Instructor filter */}
                          <div className="mb-5">
                            <h4 className="font-medium mb-3">Instructor</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {allInstructors.map((instructor) => (
                                <div key={instructor} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`instructor-${instructor}`}
                                    checked={selectedInstructors.includes(instructor)}
                                    onCheckedChange={() => toggleInstructorFilter(instructor)}
                                  />
                                  <Label htmlFor={`instructor-${instructor}`} className="text-sm cursor-pointer">
                                    {instructor}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Difficulty filter */}
                          <div className="mb-5">
                            <h4 className="font-medium mb-3">Difficulty</h4>
                            <div className="space-y-2">
                              {allDifficulties.map((difficulty) => (
                                <div key={difficulty} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`difficulty-${difficulty}`}
                                    checked={selectedDifficulties.includes(difficulty)}
                                    onCheckedChange={() => toggleDifficultyFilter(difficulty)}
                                  />
                                  <Label htmlFor={`difficulty-${difficulty}`} className="text-sm cursor-pointer">
                                    {difficulty}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Availability filter */}
                          <div className="mb-5">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="available-only"
                                checked={availableOnly}
                                onCheckedChange={(checked) => setAvailableOnly(checked === true)}
                              />
                              <Label htmlFor="available-only" className="text-sm cursor-pointer">
                                Show available classes only
                              </Label>
                            </div>
                          </div>

                          {/* Apply filters button */}
                          <Button className="w-full mt-2" onClick={() => setFilterMenuOpen(false)}>
                            Apply Filters
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Active filters display */}
                  {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedDate && (
                        <Badge variant="secondary" className="px-3 py-1 rounded-full flex items-center gap-1">
                          {format(selectedDate, "MMM d, yyyy")}
                          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
                        </Badge>
                      )}

                      {selectedLocations.map((location) => (
                        <Badge
                          key={location}
                          variant="secondary"
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {location}
                          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleLocationFilter(location)} />
                        </Badge>
                      ))}

                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {category}
                          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategoryFilter(category)} />
                        </Badge>
                      ))}

                      {selectedInstructors.map((instructor) => (
                        <Badge
                          key={instructor}
                          variant="secondary"
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {instructor}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => toggleInstructorFilter(instructor)}
                          />
                        </Badge>
                      ))}

                      {selectedDifficulties.map((difficulty) => (
                        <Badge
                          key={difficulty}
                          variant="secondary"
                          className="px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {difficulty}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => toggleDifficultyFilter(difficulty)}
                          />
                        </Badge>
                      ))}

                      {availableOnly && (
                        <Badge variant="secondary" className="px-3 py-1 rounded-full flex items-center gap-1">
                          Available Only
                          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setAvailableOnly(false)} />
                        </Badge>
                      )}

                      {activeFilterCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Section - Dynamic Carousel */}
              <div className="mb-16">
                <FeaturedCarousel />
              </div>

              {/* Starting Soon Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Starting Soon</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
                  {startingSoonEvents.slice(0, 5).map((event) => (
                    <CustomerEventCard
                      key={event.id}
                      event={event}
                      isFavorite={favorites.has(event.id)}
                      onFavoriteToggle={toggleFavorite}
                      onEventClick={handleEventClick}
                    />
                  ))}
                </div>
              </div>

              {/* Main Discovery Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">June Classes</h2>
                  <div className="text-gray-500">
                    {filteredEvents.length} {filteredEvents.length === 1 ? "class" : "classes"} found
                  </div>
                </div>

                {/* Events Grid - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
                  {filteredEvents.map((event) => (
                    <CustomerEventCard
                      key={event.id}
                      event={event}
                      isFavorite={favorites.has(event.id)}
                      onFavoriteToggle={toggleFavorite}
                      onEventClick={handleEventClick}
                    />
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-6">
                      <Calendar className="w-20 h-20 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">No classes found</h3>
                    <p className="text-lg text-gray-600">Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>

              {/* July Classes Section */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">July Classes</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {sampleEvents
                    .filter((event) => event.date.startsWith("2025-07"))
                    .map((event) => (
                      <CustomerEventCard
                        key={event.id}
                        event={event}
                        isFavorite={favorites.has(event.id)}
                        onFavoriteToggle={toggleFavorite}
                        onEventClick={handleEventClick}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
