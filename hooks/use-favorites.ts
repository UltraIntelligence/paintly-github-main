"use client"

import { useState, useEffect, useCallback } from "react"

export function useFavorites(type: "templates" | "instructors" | "locations") {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const storageKey = `artbar-favorites-${type}`

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const favoriteIds = JSON.parse(stored)
        setFavorites(new Set(favoriteIds))
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    }
  }, [storageKey])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(favorites)))
    } catch (error) {
      console.error("Failed to save favorites:", error)
    }
  }, [favorites, storageKey])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites])

  const getFavoriteCount = useCallback(() => favorites.size, [favorites])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
  }
}
