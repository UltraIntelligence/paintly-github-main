"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase, type Location } from "@/lib/supabase"

export function useSupabaseLocations() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Fetching locations...")

      // Simple query without joins to avoid RLS issues
      const { data, error, status, statusText } = await supabase
        .from("locations")
        .select("*")
        .eq("is_active", true)
        .order("name")

      console.log("📊 Locations response:", { data, error, status, statusText })

      if (error) {
        console.error("❌ Locations error:", error)
        throw error
      }

      console.log("✅ Locations fetched:", data?.length || 0)
      setLocations(data || [])
    } catch (err) {
      console.error("💥 Locations fetch error:", err)
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  return { locations, loading, error, refetch: fetchLocations }
}
