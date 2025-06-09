"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  Share2,
  Heart,
  ChevronRight,
  Users,
  Palette,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Brush, Wine, Shirt, Package, PaletteIcon } from "lucide-react"

// Mock data for the sample event
const sampleEventData = {
  id: "van-gogh-starry-night",
  title: "ゴッホの星月夜を描こう",
  titleEn: "Van Gogh's Starry Night",
  instructor: {
    id: "yuki-1",
    name: "YUKI",
    avatar: "/placeholder.svg?height=200&width=200&text=YUKI",
    rating: 4.9,
    reviewCount: 128,
    bio: "東京を拠点とする芸術家。印象派と後期印象派を専門とし、10年以上の指導経験があります。ゴッホの技法に特に精通しており、初心者から上級者まで、誰もが名画の魅力を体験できるようサポートします。",
    bioEn:
      "Tokyo-based artist specializing in Impressionist and Post-Impressionist techniques with over 10 years of teaching experience. Particularly knowledgeable in Van Gogh's techniques, helping everyone from beginners to advanced painters experience the magic of masterpieces.",
    specialties: ["Impressionism", "Post-Impressionism", "Oil Painting"],
  },
  date: "2025-06-09",
  startTime: "14:00",
  endTime: "16:30",
  location: {
    name: "Artbar Ginza",
    address: "東京都中央区銀座5-6-7, Ginza Six 4F",
    addressEn: "Ginza Six 4F, 5-6-7 Ginza, Chuo-ku, Tokyo",
    coordinates: {
      lat: 35.6721,
      lng: 139.7636,
    },
  },
  duration: "2.5 hours",
  difficulty: "Beginner",
  canvasSize: "F8 (45.5 × 38.0 cm)",
  price: 3800,
  originalPrice: 4500,
  discount: 15,
  capacity: 15,
  booked: 12,
  rating: 4.9,
  reviewCount: 87,
  popularity: "Most popular this week",
  category: "Van Gogh",
  description:
    "ゴッホの代表作「星月夜」の模写に挑戦します。印象派の巨匠の筆使いや色彩感覚を学びながら、あなただけの星月夜を完成させましょう。初心者の方でも講師が丁寧にサポートするので安心してご参加いただけます。",
  descriptionEn:
    "Challenge yourself to recreate Van Gogh's masterpiece 'The Starry Night'. Learn the brushwork and color sensibilities of this Impressionist master while completing your own version of this iconic scene. Beginners are welcome as our instructor will provide step-by-step guidance.",
  whatYouCreate:
    "あなたは「星月夜」の美しい夜空と渦巻く星、静かな村の風景を描きます。ゴッホ特有の大胆な筆致と鮮やかな色彩を再現しながら、オリジナルの要素も加えることができます。完成した作品はもちろんお持ち帰りいただけます。",
  whatYouCreateEn:
    "You will paint the beautiful night sky, swirling stars, and quiet village landscape of 'The Starry Night'. While recreating Van Gogh's bold brushstrokes and vibrant colors, you can also add your own original elements. Of course, you'll take home your completed masterpiece.",
  materialsIncluded: [
    "キャンバス (F8サイズ)",
    "アクリル絵の具セット",
    "筆セット (平筆、丸筆、細筆)",
    "パレット",
    "エプロン",
    "作品持ち帰り用袋",
    "ワンドリンク (ワイン、ビール、ソフトドリンクから選択)",
  ],
  materialsIncludedEn: [
    "Canvas (F8 size)",
    "Acrylic paint set",
    "Brush set (flat, round, detail)",
    "Palette",
    "Apron",
    "Carrying bag for your artwork",
    "One complimentary drink (choice of wine, beer, or soft drink)",
  ],
  images: [
    "/placeholder.svg?height=600&width=800&text=Starry+Night+Class+1",
    "/placeholder.svg?height=300&width=400&text=Starry+Night+Class+2",
    "/placeholder.svg?height=300&width=400&text=Starry+Night+Class+3",
    "/placeholder.svg?height=300&width=400&text=Starry+Night+Class+4",
    "/placeholder.svg?height=300&width=400&text=Starry+Night+Class+5",
  ],
  exampleArtworks: [
    "/placeholder.svg?height=300&width=400&text=Example+Artwork+1",
    "/placeholder.svg?height=300&width=400&text=Example+Artwork+2",
    "/placeholder.svg?height=300&width=400&text=Example+Artwork+3",
  ],
}

// Mock related events data
const relatedEventsData = [
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
    image: "/placeholder.svg?height=400&width=600&text=Monet+Class",
    status: "few-spots",
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
    image: "/placeholder.svg?height=400&width=600&text=Sunflowers+Class",
    status: "few-spots",
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
    image: "/placeholder.svg?height=400&width=600&text=Abstract+Class",
    status: "few-spots",
  },
]

const additionalRelatedEvents = [
  {
    id: "watercolor-basics",
    title: "水彩画基礎",
    titleEn: "Watercolor Basics",
    instructor: "KENJI",
    date: "2025-06-20",
    startTime: "14:00",
    endTime: "16:00",
    location: "Artbar Cat Street",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "F6",
    price: 3600,
    capacity: 12,
    booked: 7,
    rating: 4.6,
    popularity: "Great for beginners",
    category: "Watercolor",
    image: "/placeholder.svg?height=400&width=600&text=Watercolor+Class",
    status: "available",
  },
  {
    id: "oil-painting-intro",
    title: "油絵入門",
    titleEn: "Oil Painting Introduction",
    instructor: "EMMA",
    date: "2025-06-22",
    startTime: "10:00",
    endTime: "13:00",
    location: "Artbar Ginza",
    duration: "3 hours",
    difficulty: "Intermediate",
    canvasSize: "F8",
    price: 6200,
    capacity: 8,
    booked: 5,
    rating: 4.8,
    popularity: "Classic technique",
    category: "Oil Painting",
    image: "/placeholder.svg?height=400&width=600&text=Oil+Painting+Class",
    status: "few-spots",
  },
  {
    id: "digital-art-basics",
    title: "デジタルアート基礎",
    titleEn: "Digital Art Basics",
    instructor: "ALEX",
    date: "2025-06-25",
    startTime: "18:00",
    endTime: "20:00",
    location: "Artbar Daikanyama",
    duration: "2 hours",
    difficulty: "Beginner",
    canvasSize: "Digital",
    price: 4800,
    capacity: 10,
    booked: 8,
    rating: 4.7,
    popularity: "Modern art",
    category: "Digital",
    image: "/placeholder.svg?height=400&width=600&text=Digital+Art+Class",
    status: "few-spots",
  },
]

// Combine the arrays for display
const allRelatedEvents = [...relatedEventsData, ...additionalRelatedEvents]

// Simple CustomerEventCard component for related events
function CustomerEventCard({ event, isFavorite = false, onFavoriteToggle, onEventClick }) {
  return (
    <Card
      className="cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden"
      onClick={() => onEventClick(event)}
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
              onFavoriteToggle(event.id)
            }}
            className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg">
              {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
            </Badge>
          </div>
          {event.status === "sold-out" && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">SOLD OUT</Badge>
            </div>
          )}
          {event.status === "few-spots" && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">FEW SPOTS</Badge>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
          <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{event.startTime}</span>
            <span className="font-extrabold text-gray-900">¥{event.price.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventDetailsPage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (eventId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(eventId)) {
      newFavorites.delete(eventId)
    } else {
      newFavorites.add(eventId)
    }
    setFavorites(newFavorites)
  }

  const handleRelatedEventClick = (event: any) => {
    console.log("Related event clicked:", event)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link href="/discover" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Discover</span>
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero Image Card - Square 2x2 Grid */}
          <Card className="lg:col-span-8 overflow-hidden shadow-lg border-0 rounded-3xl">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 aspect-square">
                {/* Four equal-sized images in 2x2 grid */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={sampleEventData.images[0] || "/placeholder.svg"}
                    alt={sampleEventData.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={sampleEventData.images[1] || "/placeholder.svg"}
                    alt={`${sampleEventData.titleEn} 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={sampleEventData.images[2] || "/placeholder.svg"}
                    alt={`${sampleEventData.titleEn} 3`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={sampleEventData.images[3] || "/placeholder.svg"}
                    alt={`${sampleEventData.titleEn} 4`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Card - Sticky Sidebar */}
          <Card className="lg:col-span-4 shadow-lg border-0 rounded-3xl lg:sticky lg:top-24 h-fit">
            <CardContent className="p-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">¥{sampleEventData.price.toLocaleString()}</span>
                  {sampleEventData.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through ml-2 text-lg">
                        ¥{sampleEventData.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-red-100 text-red-700 ml-2">{sampleEventData.discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{sampleEventData.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="text-gray-600">{sampleEventData.reviewCount} reviews</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg mb-6">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Date</div>
                      <div className="text-gray-700 text-sm">{formatDate(sampleEventData.date)}</div>
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Time</div>
                      <div className="text-gray-700 text-sm">
                        {sampleEventData.startTime} - {sampleEventData.endTime}
                      </div>
                    </div>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>¥{sampleEventData.price.toLocaleString()} × 1 person</span>
                  <span>¥{sampleEventData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Service fee</span>
                  <span>¥500</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>¥{(sampleEventData.price + 500).toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold py-6 rounded-lg">
                Book Now
              </Button>

              <div className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</div>

              <div className="mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-700">
                    {sampleEventData.capacity - sampleEventData.booked} spots left
                  </Badge>
                  <span>for this date</span>
                </div>
                <div>This class usually sells out.</div>
              </div>
            </CardContent>
          </Card>

          {/* Event Title Card */}
          <Card className="lg:col-span-8 shadow-lg border-0 rounded-3xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{sampleEventData.title}</h1>
                  <h2 className="text-xl text-gray-700 mb-4">{sampleEventData.titleEn}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{sampleEventData.rating}</span>
                      <span className="mx-1">·</span>
                      <span className="underline">{sampleEventData.reviewCount} reviews</span>
                    </div>
                    <span className="mx-1">·</span>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{sampleEventData.location.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="lg:col-span-4 shadow-lg border-0 rounded-3xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{sampleEventData.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Max {sampleEventData.capacity}</div>
                  <div className="text-xs text-gray-500">Class Size</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{sampleEventData.difficulty}</div>
                  <div className="text-xs text-gray-500">Level</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{sampleEventData.canvasSize}</div>
                  <div className="text-xs text-gray-500">Canvas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Overview Card */}
          <Card className="lg:col-span-6 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Class Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{sampleEventData.descriptionEn}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{sampleEventData.description}</p>
            </CardContent>
          </Card>

          {/* What You'll Create Card */}
          <Card className="lg:col-span-6 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">What You'll Create</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-4">{sampleEventData.whatYouCreateEn}</p>
              <div className="grid grid-cols-3 gap-2">
                {sampleEventData.exampleArtworks.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Example Artwork ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Materials Included Card */}
          <Card className="lg:col-span-4 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Materials Included</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Canvas</div>
                    <div className="text-xs text-gray-500">F8 size</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <PaletteIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Paint Set</div>
                    <div className="text-xs text-gray-500">Acrylic colors</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                    <Brush className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Brush Set</div>
                    <div className="text-xs text-gray-500">All sizes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                    <Shirt className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Apron</div>
                    <div className="text-xs text-gray-500">Protection</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                    <Wine className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Drink</div>
                    <div className="text-xs text-gray-500">Wine or soft</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                    <Package className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Take Home</div>
                    <div className="text-xs text-gray-500">Carry bag</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Card */}
          <Card className="lg:col-span-8 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Hosted by {sampleEventData.instructor.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={sampleEventData.instructor.avatar || "/placeholder.svg"}
                    alt={sampleEventData.instructor.name}
                  />
                  <AvatarFallback>{sampleEventData.instructor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{sampleEventData.rating}</span>
                    <span className="mx-1">·</span>
                    <span>{sampleEventData.reviewCount} reviews</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sampleEventData.instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{sampleEventData.instructor.bioEn}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="lg:col-span-12 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Location</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-1">{sampleEventData.location.name}</h4>
                <p className="text-gray-600 text-sm">{sampleEventData.location.addressEn}</p>
                <p className="text-gray-600 text-sm">{sampleEventData.location.address}</p>
              </div>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Map would be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Events Card */}
          <Card className="lg:col-span-12 shadow-lg border-0 rounded-3xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">You might also like</CardTitle>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  See all <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {allRelatedEvents.map((event) => (
                  <div key={event.id} className="cursor-pointer group">
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(event.id)
                        }}
                        className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
                      >
                        <Heart
                          className={`w-4 h-4 ${favorites.has(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </Button>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg">
                          {new Date(event.date)
                            .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            .toUpperCase()}
                        </Badge>
                      </div>
                      {event.status === "sold-out" && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">SOLD OUT</Badge>
                        </div>
                      )}
                      {event.status === "few-spots" && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">FEW SPOTS</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{event.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">with {event.instructor}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{event.startTime}</span>
                        <span className="font-extrabold text-gray-900">¥{event.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
