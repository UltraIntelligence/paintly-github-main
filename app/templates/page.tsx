"use client"

import type React from "react"

import { useFavorites } from "@/hooks/use-favorites"
import { FavoriteButton } from "@/components/favorite-button"

import type { Template } from "@/types"

interface TemplatesProps {
  templates: Template[]
}

const TemplatesContent: React.FC<TemplatesProps> = ({ templates }) => {
  const { toggleFavorite, isFavorite } = useFavorites("templates")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <div key={template.id} className="relative rounded-lg overflow-hidden shadow-md">
          <div className="relative">
            <img src={template.image || "/placeholder.svg"} alt={template.name} className="w-full h-48 object-cover" />
            <FavoriteButton isFavorite={isFavorite(template.id)} onToggle={() => toggleFavorite(template.id)} />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-gray-600">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TemplatesContent
