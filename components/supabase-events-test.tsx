"use client"

import { useSupabaseEvents } from "@/hooks/use-supabase-events"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function SupabaseEventsTest() {
  const { events, loading, error, refetch } = useSupabaseEvents()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Fetching events from Supabase...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Events ({events.length})
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-gray-500">No events found</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <Badge variant="secondary">¥{event.price}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Capacity: {event.capacity}</span>
                  <span>{new Date(event.start_time).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
