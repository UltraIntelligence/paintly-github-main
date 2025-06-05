"use client"

import React from "react"

import { Heart, Star, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PaintlyCardProps {
  type: "template" | "instructor" | "location" | "event"
  image?: string
  title: string
  subtitle?: string
  badges?: Array<{
    text: string
    variant?: "default" | "outline" | "secondary"
    badgeType?: "skill" | "category" | "canvas" | "default"
  }>
  metaInfo?: Array<{ icon?: string; text: string }>
  rating?: number
  primaryButton: { text: string; onClick: () => void; variant?: "default" | "outline" }
  secondaryButton?: { text: string; onClick: () => void; variant?: "default" | "outline" }
  onFavorite?: () => void
  isFavorited?: boolean
  className?: string
  menuItems?: Array<{ label: string; onClick: () => void }>
}

export function PaintlyCard({
  type,
  image,
  title,
  subtitle,
  badges = [],
  metaInfo = [],
  rating,
  primaryButton,
  secondaryButton,
  onFavorite,
  isFavorited = false,
  className,
  menuItems = [],
}: PaintlyCardProps) {
  const renderRating = () => {
    if (!rating) return null

    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    )
  }

  const renderImage = () => {
    if (!image) return null

    // Use square aspect ratio for template cards, keep 16:9 for others
    const aspectRatio = type === "template" ? "aspect-square" : "aspect-video"

    return (
      <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-t-lg`}>
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavorite()
            }}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
          >
            <Heart
              className={cn("h-4 w-4 transition-colors", isFavorited ? "fill-red-500 text-red-500" : "text-gray-600")}
            />
          </button>
        )}
      </div>
    )
  }

  const getBadgeStyles = (badge: { text: string; badgeType?: string }) => {
    // Determine badge type based on content or explicit type
    const text = badge.text.toLowerCase()

    const badgeType =
      badge.badgeType ||
      // Skill level detection
      (text.includes("beginner") ||
      text.includes("intermediate") ||
      text.includes("advanced") ||
      text.includes("expert")
        ? "skill"
        : // Canvas size detection - look for F followed by number, or canvas dimensions
          (text.includes("f") && /f\d+/.test(text)) ||
            text.includes("canvas") ||
            text.includes("cm") ||
            (text.includes("x") && text.includes("cm"))
          ? "canvas"
          : // Category detection - common art terms
            text.includes("landscape") ||
              text.includes("portrait") ||
              text.includes("abstract") ||
              text.includes("master") ||
              text.includes("artist") ||
              text.includes("style") ||
              text.includes("nature") ||
              text.includes("floral") ||
              text.includes("modern") ||
              text.includes("traditional") ||
              text.includes("watercolor") ||
              text.includes("acrylic")
            ? "category"
            : // Default fallback
              "default")

    console.log(`Badge "${badge.text}" detected as type: ${badgeType}`) // Debug log

    switch (badgeType) {
      case "skill":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
      case "canvas":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200"
      case "category":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200"
      default:
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200"
    }
  }

  const renderBadges = () => {
    if (badges.length === 0) return null

    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => {
          // Create a custom badge with our styling
          const badgeStyle = getBadgeStyles(badge)

          return (
            <Badge key={index} variant="secondary" className={badgeStyle}>
              {badge.text}
            </Badge>
          )
        })}
      </div>
    )
  }

  const renderMetaInfo = () => {
    if (metaInfo.length === 0) return null

    return (
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {metaInfo.map((info, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-1">
              {info.icon && <span className="text-xs">{info.icon}</span>}
              <span>{info.text}</span>
            </div>
            {index < metaInfo.length - 1 && <span className="text-slate-300">•</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const renderButtons = () => {
    return (
      <div className="flex gap-2">
        <Button onClick={primaryButton.onClick} variant={primaryButton.variant || "default"} className="flex-1">
          {primaryButton.text}
        </Button>
        {secondaryButton && (
          <Button onClick={secondaryButton.onClick} variant={secondaryButton.variant || "outline"} className="flex-1">
            {secondaryButton.text}
          </Button>
        )}
      </div>
    )
  }

  const renderMenu = () => {
    if (menuItems.length === 0) return null

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Card className={cn("group overflow-hidden transition-all hover:shadow-md h-full flex flex-col", className)}>
      {/* 1. Image Section - Fixed */}
      {image && (
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {onFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavorite()
              }}
              className="absolute right-3 top-3 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
            >
              <Heart
                className={cn("h-4 w-4 transition-colors", isFavorited ? "fill-red-500 text-red-500" : "text-gray-600")}
              />
            </button>
          )}
        </div>
      )}

      {/* 2. Content Section - Flexible */}
      <div className="flex-1 p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold leading-tight">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {rating && renderRating()}
            {renderMenu()}
            {!image && onFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite()
                }}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorited ? "fill-red-500 text-red-500" : "text-gray-600",
                  )}
                />
              </button>
            )}
          </div>
        </div>
        {renderBadges()}
      </div>

      {/* 3. Meta Section - Consistent */}
      {metaInfo.length > 0 && <div className="px-4 pb-4">{renderMetaInfo()}</div>}

      {/* 4. Action Section - Fixed Height */}
      <div className="p-4 pt-0">{renderButtons()}</div>
    </Card>
  )
}
