"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredEvents = [
  {
    id: "featured-1",
    title: "ゴッホの星月夜マスタークラス",
    titleEn: "Van Gogh Starry Night Masterclass",
    instructor: "YUKI",
    image: "/placeholder.svg?height=400&width=600&text=Van+Gogh+Starry+Night+Class",
    price: 4800,
    duration: "3 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    participants: 156,
    description: "Learn the iconic swirling techniques of Van Gogh's most famous masterpiece",
    descriptionJa: "ゴッホの最も有名な傑作の象徴的な渦巻き技法を学ぼう",
    featured: true,
    category: "Master Artists",
  },
  {
    id: "featured-2",
    title: "アルコールインク・ギャラクシー",
    titleEn: "Alcohol Ink Galaxy Creation",
    instructor: "DARIA",
    image: "/placeholder.svg?height=400&width=600&text=Alcohol+Ink+Galaxy+Workshop",
    price: 3600,
    duration: "2 hours",
    difficulty: "Beginner",
    rating: 4.8,
    participants: 89,
    description: "Create stunning cosmic artworks with flowing alcohol ink techniques",
    descriptionJa: "流れるアルコールインク技法で見事な宇宙アートワークを作成",
    featured: true,
    category: "Alcohol Ink",
  },
  {
    id: "featured-3",
    title: "キッズ・レインボーアドベンチャー",
    titleEn: "Kids Rainbow Adventure",
    instructor: "MICHI",
    image: "/placeholder.svg?height=400&width=600&text=Kids+Rainbow+Art+Class",
    price: 2800,
    duration: "1.5 hours",
    difficulty: "Kids",
    rating: 4.7,
    participants: 234,
    description: "A colorful journey perfect for young artists to explore creativity",
    descriptionJa: "若いアーティストが創造性を探求するのに最適なカラフルな旅",
    featured: true,
    category: "Kids & Family",
  },
]

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length)
    setIsAutoPlaying(false)
  }

  const currentEvent = featuredEvents[currentIndex]

  return (
    <div className="relative">
      {/* Main Featured Card - Fully Responsive */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Mobile Layout - Stacked Vertically */}
        <div className="block lg:hidden">
          {/* Mobile Image */}
          <div className="relative h-64 sm:h-72">
            <img
              src={currentEvent.image || "/placeholder.svg"}
              alt={currentEvent.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-orange-500 text-white text-xs px-2 py-1">Featured</Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {currentEvent.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentEvent.difficulty}
              </Badge>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2">{currentEvent.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{currentEvent.descriptionJa}</p>

            {/* Mobile Stats */}
            <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span>{currentEvent.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{currentEvent.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{currentEvent.participants}</span>
              </div>
            </div>

            {/* Mobile Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ¥{currentEvent.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 ml-1">per person</span>
              </div>
              <Button className="px-4 py-2 text-sm">Book Now</Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex">
          {/* Desktop Image - Responsive */}
          <div className="relative w-3/5">
            <img
              src={currentEvent.image || "/placeholder.svg"}
              alt={currentEvent.titleEn}
              className="w-full h-full object-cover min-h-[350px] max-h-[450px]"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-white">Featured</Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 bg-white/80 hover:bg-white">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="w-2/5 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{currentEvent.category}</Badge>
                <Badge variant="outline">{currentEvent.difficulty}</Badge>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{currentEvent.title}</h3>
              <p className="text-lg text-gray-600 mb-2">{currentEvent.titleEn}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{currentEvent.description}</p>

              {/* Desktop Stats */}
              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{currentEvent.rating}</span>
                  <span className="text-sm">({currentEvent.participants} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{currentEvent.duration}</span>
                </div>
              </div>
            </div>

            {/* Desktop Price and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-gray-900">¥{currentEvent.price.toLocaleString()}</span>
                <span className="text-gray-600 ml-2">per person</span>
              </div>
              <Button size="lg" className="px-8">
                Book Now
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on Mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-white/80 hover:bg-white shadow-md z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-white/80 hover:bg-white shadow-md z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Dots Indicator - Responsive */}
      <div className="flex justify-center mt-4 gap-2">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-gray-900 scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="flex md:hidden justify-center mt-4 gap-4">
        <Button variant="outline" size="sm" onClick={prevSlide} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={nextSlide} className="flex items-center gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
