"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Heart, Filter } from "lucide-react"

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
  const [selectedCategory, setSelectedCategory] = useState("All Classes")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [availableOnly, setAvailableOnly] = useState(true)

  const categoryScrollRef = useRef<HTMLDivElement>(null)

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

  const getStatusBadge = (status: string, booked: number, capacity: number) => {
    switch (status) {
      case "sold-out":
        return <Badge className="bg-red-500 text-white text-xs px-1 py-0.5 text-xs">SOLD OUT</Badge>
      case "few-spots":
        return <Badge className="bg-orange-500 text-white text-xs px-1 py-0.5 text-xs">FEW SPOTS</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesCategory = selectedCategory === "All Classes" || event.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "all" || event.location.includes(selectedLocation)
    const matchesDifficulty = selectedDifficulty === "all" || event.difficulty === selectedDifficulty
    const matchesAvailability = !availableOnly || event.status !== "sold-out"
    const isJuneEvent = event.date.startsWith("2025-06")

    return (
      matchesCategory && matchesSearch && matchesLocation && matchesDifficulty && matchesAvailability && isJuneEvent
    )
  })

  const startingSoonEvents = sampleEvents
    .filter((event) => {
      const eventDate = new Date(event.date)
      const today = new Date()
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      return eventDate >= today && eventDate <= weekFromNow
    })
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Search Section */}
        <div className="py-8 mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search by painting, instructor, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 md:h-16 pl-4 md:pl-6 pr-12 md:pr-16 text-base md:text-lg border-2 border-gray-200 rounded-full focus:border-gray-400 focus:ring-0 shadow-sm"
            />
            <div className="absolute right-3 md:right-6 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Paint Style Categories */}
        <div className="mb-16">
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-9 gap-3 w-full">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCategory === category ? "opacity-100" : "opacity-70 hover:opacity-90"
                }`}
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 shadow-sm">
                  <img
                    src={`/placeholder.svg?height=64&width=64&text=${encodeURIComponent(category)}`}
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-gray-900 text-left leading-tight">{category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          <div className="relative bg-gray-50 rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full opacity-30 transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-100 rounded-full opacity-30 transform -translate-x-12 translate-y-12"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              {/* Left side - Featured Image */}
              <div className="w-full lg:w-2/5 flex-shrink-0">
                <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg?height=400&width=400&text=Van Gogh Starry Night Masterclass"
                    alt="Featured Class"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gray-800 text-white font-semibold px-3 py-1">FEATURED</Badge>
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full lg:w-3/5 text-center lg:text-left">
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    マスタークラス：ゴッホの星月夜
                  </h2>
                  <h3 className="text-lg md:text-xl text-gray-700 font-medium">
                    Master Class: Van Gogh's Starry Night
                  </h3>
                </div>

                <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                  Join our most celebrated instructor for an exclusive masterpiece recreation with premium materials and
                  wine pairing.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 text-sm md:text-base">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="font-medium text-gray-700">with Master YUKI</span>
                  </div>
                  <div className="hidden sm:block text-gray-400">•</div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">June 15 • 6:00 PM</span>
                  </div>
                  <div className="hidden sm:block text-gray-400">•</div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="text-gray-600">Artbar Ginza</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">¥6,800</span>
                    <span className="text-lg text-gray-400 line-through">¥8,500</span>
                    <Badge className="bg-red-100 text-red-700 font-semibold">20% OFF</Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Starting Soon Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Starting Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3">
            {startingSoonEvents.map((event) => (
              <Card
                key={event.id}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden"
                onClick={() => console.log("Event clicked:", event)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.titleEn}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(event.id)
                      }}
                      className="absolute top-2 right-2 w-6 h-6 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                    >
                      <Heart
                        className={`w-3 h-3 ${favorites.has(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1">
                        {formatDate(event.date).toUpperCase()}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      {getStatusBadge(event.status, event.booked, event.capacity)}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{event.startTime}</span>
                      <span className="font-bold text-gray-900">¥{event.price.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Discovery Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">June Classes</h2>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-2xl p-8 mb-12 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="Cat Street">Cat Street</SelectItem>
                      <SelectItem value="Ginza">Ginza</SelectItem>
                      <SelectItem value="Daikanyama">Daikanyama</SelectItem>
                      <SelectItem value="Yokohama">Yokohama</SelectItem>
                      <SelectItem value="Osaka">Osaka</SelectItem>
                      <SelectItem value="Fukuoka">Fukuoka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-base text-gray-700">Available only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Events Grid - Airbnb Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden"
                onClick={() => console.log("Event clicked:", event)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.titleEn}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(event.id)
                      }}
                      className="absolute top-2 right-2 w-6 h-6 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                    >
                      <Heart
                        className={`w-3 h-3 ${favorites.has(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1">
                        {formatDate(event.date).toUpperCase()}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      {getStatusBadge(event.status, event.booked, event.capacity)}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{event.startTime}</span>
                      <span className="font-bold text-gray-900">¥{event.price.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3">
            {sampleEvents
              .filter((event) => event.date.startsWith("2025-07"))
              .map((event) => (
                <Card
                  key={event.id}
                  className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden"
                  onClick={() => console.log("Event clicked:", event)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.titleEn}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(event.id)
                        }}
                        className="absolute top-2 right-2 w-6 h-6 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                      >
                        <Heart
                          className={`w-3 h-3 ${favorites.has(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1">
                          {formatDate(event.date).toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        {getStatusBadge(event.status, event.booked, event.capacity)}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{event.startTime}</span>
                        <span className="font-bold text-gray-900">¥{event.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
