"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  className?: string
}

export function FavoriteButton({ isFavorite, onToggle, className }: FavoriteButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    setIsAnimating(true)
    onToggle()
    setTimeout(() => setIsAnimating(false), 200)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 z-10 shadow-sm",
        isAnimating && "scale-110",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation()
        handleToggle()
      }}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isFavorite ? "fill-red-500 text-red-500 drop-shadow-sm" : "text-gray-600 hover:text-red-400",
          isAnimating && "scale-125",
        )}
      />
    </Button>
  )
}
