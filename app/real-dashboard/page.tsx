"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { RealDataDashboard } from "@/components/real-data-dashboard"
import { SupabaseConnectionTest } from "@/components/supabase-connection-test"

export default function RealDashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Dashboard</h1>
              <p className="text-gray-600">Real-time data from your Supabase database</p>
            </div>

            <SupabaseConnectionTest />
            <RealDataDashboard />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
