"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SupabaseLocationsTest } from "@/components/supabase-locations-test"
import { SupabaseEventsTest } from "@/components/supabase-events-test"
import { SupabaseDebug } from "@/components/supabase-debug"

export default function SupabaseTestPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Integration Test</h1>
              <p className="text-gray-600">Testing real database connections with your Supabase data</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <SupabaseDebug />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SupabaseLocationsTest />
                <SupabaseEventsTest />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
