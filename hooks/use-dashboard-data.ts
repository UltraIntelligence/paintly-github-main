"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useDashboardData() {
  const [data, setData] = useState({
    locations: [],
    events: [],
    staff: [],
    businesses: [],
    recentBookings: [],
    stats: {
      totalLocations: 0,
      totalEvents: 0,
      totalStaff: 0,
      totalBookings: 0,
    },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)

        // Fetch all data in parallel
        const [locationsRes, eventsRes, staffRes, businessesRes, bookingsRes] = await Promise.all([
          supabase.from("locations").select("*").eq("is_active", true),
          supabase.from("events").select("*").eq("is_published", true).order("start_time"),
          supabase.from("staff").select("*").eq("is_active", true),
          supabase.from("businesses").select("*"),
          supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(10),
        ])

        // Check for errors
        const errors = [
          locationsRes.error,
          eventsRes.error,
          staffRes.error,
          businessesRes.error,
          bookingsRes.error,
        ].filter(Boolean)
        if (errors.length > 0) {
          throw new Error(errors[0]?.message || "Database error")
        }

        setData({
          locations: locationsRes.data || [],
          events: eventsRes.data || [],
          staff: staffRes.data || [],
          businesses: businessesRes.data || [],
          recentBookings: bookingsRes.data || [],
          stats: {
            totalLocations: locationsRes.data?.length || 0,
            totalEvents: eventsRes.data?.length || 0,
            totalStaff: staffRes.data?.length || 0,
            totalBookings: bookingsRes.data?.length || 0,
          },
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return { data, loading, error }
}
