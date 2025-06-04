import { createClient } from "@supabase/supabase-js"

// Client-side client with anon key for user operations
export function createClientSideClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Singleton client for client-side operations
export const supabase = createClientSideClient()
