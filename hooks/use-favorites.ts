"use client"

import { useState, useEffect } from "react"

export function useFavorites(type: "templates" | "instructors" | "locations") {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`artbar-favorites-${type}`)
    if (stored) {
      try {
        const favoriteIds = JSON.parse(stored)
        setFavorites(new Set(favoriteIds))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error)
      }
    }
  }, [type])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`artbar-favorites-${type}`, JSON.stringify(Array.from(favorites)))
  }, [favorites, type])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const isFavorite = (id: number) => favorites.has(id)

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.size,
  }
}
