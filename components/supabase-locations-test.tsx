"use client"

import { useSupabaseLocations } from "@/hooks/use-supabase-locations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, MapPin, Phone, Mail } from "lucide-react"

export function SupabaseLocationsTest() {
  const { locations, loading, error, refetch } = useSupabaseLocations()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Fetching locations from Supabase...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Locations</CardTitle>
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
          Locations ({locations.length})
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.length === 0 ? (
            <p className="text-gray-500">No locations found</p>
          ) : (
            locations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{location.name}</h3>
                  <Badge variant={location.is_active ? "default" : "secondary"}>
                    {location.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  {location.street_address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {location.street_address}, {location.city}
                      </span>
                    </div>
                  )}
                  {location.public_phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{location.public_phone}</span>
                    </div>
                  )}
                  {location.public_email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>{location.public_email}</span>
                    </div>
                  )}
                </div>
                {location.description && <p className="text-xs text-gray-500 mt-2">{location.description}</p>}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
