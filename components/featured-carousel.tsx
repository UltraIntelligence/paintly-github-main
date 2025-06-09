"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface FeaturedContent {
  id: string
  type: string
  title: string
  subtitle: string
  description: string
  instructor: string
  date: string
  location: string
  price: string
  originalPrice?: string
  discount: string
  cta: string
  image: string
  badge: string
}

const featuredContent: FeaturedContent[] = [
  {
    id: "event-spotlight",
    type: "Event Spotlight",
    title: "マスタークラス：ゴッホの星月夜",
    subtitle: "Master Class: Van Gogh's Starry Night",
    description:
      "Join our most celebrated instructor for an exclusive masterpiece recreation with premium materials and wine pairing.",
    instructor: "Master YUKI",
    date: "June 15 • 6:00 PM",
    location: "Artbar Ginza",
    price: "¥6,800",
    originalPrice: "¥8,500",
    discount: "20% OFF",
    cta: "Book Now",
    image: "/placeholder.svg?height=600&width=1200&text=Van Gogh Starry Night Masterclass",
    badge: "FEATURED",
  },
  {
    id: "team-building",
    type: "Team Building",
    title: "チームビルディング体験",
    subtitle: "Corporate Team Building Experience",
    description:
      "Strengthen team bonds through collaborative art creation. Perfect for corporate events, team retreats, and building workplace connections.",
    instructor: "Professional Facilitators",
    date: "Available Daily",
    location: "All Locations",
    price: "¥4,500",
    originalPrice: undefined,
    discount: "per person",
    cta: "Plan Your Event",
    image: "/placeholder.svg?height=600&width=1200&text=Team Building Art Experience",
    badge: "CORPORATE",
  },
  {
    id: "birthday-parties",
    type: "Birthday Celebration",
    title: "誕生日パーティー",
    subtitle: "Birthday Party Art Experience",
    description:
      "Make birthdays unforgettable with personalized art parties. Includes decorations, art supplies, and a special birthday canvas.",
    instructor: "Party Specialists",
    date: "Weekends Available",
    location: "Private Rooms",
    price: "¥3,200",
    originalPrice: undefined,
    discount: "per guest",
    cta: "Celebrate Here",
    image: "/placeholder.svg?height=600&width=1200&text=Birthday Party Art Celebration",
    badge: "PARTY",
  },
  {
    id: "seasonal",
    type: "Seasonal Collection",
    title: "夏の特別コレクション",
    subtitle: "Summer Special Collection",
    description:
      "Discover our curated summer art collection featuring vibrant beach scenes, tropical florals, and refreshing watercolor techniques.",
    instructor: "Various Artists",
    date: "June - August",
    location: "All Locations",
    price: "¥3,800",
    originalPrice: undefined,
    discount: "starting from",
    cta: "Explore Collection",
    image: "/placeholder.svg?height=600&width=1200&text=Summer Art Collection",
    badge: "SEASONAL",
  },
]

export function FeaturedCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length)
  }

  const currentContent = featuredContent[currentSlide]

  return (
    <div
      className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-[400px] lg:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Left side - Featured Image */}
        <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full">
          <img
            src={currentContent.image || "/placeholder.svg"}
            alt={currentContent.subtitle}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Badge positioned in top-left of image */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-gray-900/90 backdrop-blur-sm text-white font-semibold px-4 py-2 text-sm shadow-lg">
              {currentContent.badge}
            </Badge>
          </div>

          {/* Navigation Dots positioned in bottom-right of image */}
          <div className="absolute bottom-6 right-6 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125 shadow-sm" : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-4 lg:p-8 flex flex-col justify-center">
          <div className="mb-3 lg:mb-4">
            <div className="text-xs lg:text-sm font-medium text-gray-500 mb-1 lg:mb-2 uppercase tracking-wide">
              {currentContent.type}
            </div>
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2 leading-tight">
              {currentContent.title}
            </h2>
            <h3 className="text-base lg:text-lg text-gray-600 font-medium mb-2 lg:mb-3">{currentContent.subtitle}</h3>
          </div>

          <p className="text-gray-600 text-sm lg:text-base mb-3 lg:mb-4 leading-relaxed line-clamp-3 lg:line-clamp-none">
            {currentContent.description}
          </p>

          <div className="space-y-1 lg:space-y-2 mb-4 lg:mb-6 text-xs lg:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">with {currentContent.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              <span className="text-gray-600">{currentContent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{currentContent.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl lg:text-2xl font-bold text-gray-900">{currentContent.price}</span>
              {currentContent.originalPrice && (
                <span className="text-sm lg:text-base text-gray-400 line-through">{currentContent.originalPrice}</span>
              )}
              <Badge className="bg-red-100 text-red-700 font-semibold text-xs">{currentContent.discount}</Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs lg:text-sm"
            >
              {currentContent.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs lg:text-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
