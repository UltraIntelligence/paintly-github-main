import { supabaseServer } from "./server"
import { supabase } from "./client"

// Types for your events
export interface Event {
  id?: string
  title: string
  description?: string
  location_id: string
  instructor_id: string
  start_time: string
  end_time: string
  max_participants: number
  current_participants: number
  price: number
  status: "active" | "cancelled" | "completed"
  created_at?: string
  updated_at?: string
}

// Server-side CRUD operations (using service role)
export const eventOperations = {
  // Create a new event
  async create(event: Omit<Event, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabaseServer.from("events").insert(event).select().single()

    if (error) throw error
    return data
  },

  // Read events with filters
  async getAll(filters?: { location_id?: string; instructor_id?: string; status?: string }) {
    let query = supabaseServer.from("events").select(`
      *,
      locations(name, address),
      instructors(name, email)
    `)

    if (filters?.location_id) {
      query = query.eq("location_id", filters.location_id)
    }
    if (filters?.instructor_id) {
      query = query.eq("instructor_id", filters.instructor_id)
    }
    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    const { data, error } = await query.order("start_time", { ascending: true })

    if (error) throw error
    return data
  },

  // Update an event
  async update(id: string, updates: Partial<Event>) {
    const { data, error } = await supabaseServer.from("events").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Delete an event
  async delete(id: string) {
    const { error } = await supabaseServer.from("events").delete().eq("id", id)

    if (error) throw error
    return true
  },
}

// Client-side operations (for user interactions)
export const clientEventOperations = {
  // Get events for display (read-only for users)
  async getPublicEvents() {
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        locations(name, address),
        instructors(name)
      `)
      .eq("status", "active")
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })

    if (error) throw error
    return data
  },

  // Subscribe to real-time updates
  subscribeToEvents(callback: (payload: any) => void) {
    return supabase
      .channel("events")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, callback)
      .subscribe()
  },
}
