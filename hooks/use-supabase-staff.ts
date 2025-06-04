"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase, type Staff } from "@/lib/supabase"

export function useSupabaseStaff() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("staff").select("*").eq("is_active", true).order("full_name_override")

      if (error) throw error
      setStaff(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStaff()
  }, [fetchStaff])

  return { staff, loading, error, refetch: fetchStaff }
}
