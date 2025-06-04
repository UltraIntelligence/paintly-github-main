import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Location {
  id: string
  business_id: string
  name: string
  name_jp: string | null
  street_address: string | null
  street_address_jp: string | null
  city: string | null
  city_jp: string | null
  postal_code: string | null
  country: string | null
  public_phone: string | null
  public_email: string | null
  description: string | null
  description_jp: string | null
  map_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  business_id: string
  master_event_type_id: string
  event_category_id: string
  location_id: string
  title: string
  title_jp: string | null
  description: string | null
  description_jp: string | null
  featured_image_url: string | null
  price: number
  capacity: number
  start_time: string
  end_time: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Staff {
  user_id: string
  business_id: string
  full_name_override: string | null
  bio: string | null
  bio_jp: string | null
  photo_url: string | null
  is_instructor: boolean
  is_admin: boolean
  is_location_manager: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}
