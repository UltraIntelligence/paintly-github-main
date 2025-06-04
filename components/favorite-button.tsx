"use client"

import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  className?: string
}

export function FavoriteButton({ isFavorite, onToggle, className = "" }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 hover:bg-muted ${className}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
    >
      <motion.div initial={false} animate={{ scale: isFavorite ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
        <Heart
          className={`h-4 w-4 transition-colors duration-200 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-400"
          }`}
        />
      </motion.div>
    </Button>
  )
}
