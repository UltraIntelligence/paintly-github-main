"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface FeaturedSectionProps {
  title: string
  subtitle: string
  children: React.ReactNode
  isEmpty?: boolean
  emptyMessage?: string
}

export function FeaturedSection({
  title,
  subtitle,
  children,
  isEmpty = false,
  emptyMessage = "Favorite items appear here for quick access.",
}: FeaturedSectionProps) {
  if (isEmpty) {
    return (
      <div className="mb-12">
        <div className="mb-6">
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
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {/* Removed fixed height constraints and added generous padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">{children}</div>
    </div>
  )
}

export function FeaturedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export default { FeaturedSection, FeaturedCard }
