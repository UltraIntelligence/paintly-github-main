"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase, type Event } from "@/lib/supabase"

export function useSupabaseEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Fetching events...")

      // Simple query without any joins to avoid RLS policy issues
      const { data, error, status, statusText } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("start_time")

      console.log("📊 Events response:", { data, error, status, statusText })

      if (error) {
        console.error("❌ Events error:", error)
        throw error
      }

      console.log("✅ Events fetched:", data?.length || 0)
      setEvents(data || [])
    } catch (err) {
      console.error("💥 Events fetch error:", err)
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, error, refetch: fetchEvents }
}
