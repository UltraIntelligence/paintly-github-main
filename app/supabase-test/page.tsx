"use client"

import { useState } from "react"
import { createClientSideClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Database, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function SupabaseTestPage() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const supabase = createClientSideClient()

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading((prev) => ({ ...prev, [testName]: true }))
    try {
      const result = await testFn()
      setResults((prev) => ({ ...prev, [testName]: { success: true, data: result } }))
    } catch (error) {
      setResults((prev) => ({ ...prev, [testName]: { success: false, error: error.message } }))
    } finally {
      setLoading((prev) => ({ ...prev, [testName]: false }))
    }
  }

  const crudOperations = [
    {
      entity: "Events",
      description: "Workshop events and classes",
      operations: [
        {
          name: "events_read",
          label: "Read Events",
          icon: Eye,
          test: () => supabase.from("events").select("*").limit(5),
        },
        {
          name: "events_create",
          label: "Create Event",
          icon: Plus,
          test: () =>
            supabase
              .from("events")
              .insert({
                title: "Test Workshop",
                description: "A test workshop event",
                start_time: new Date().toISOString(),
                end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                location_id: 1,
                max_participants: 10,
                price: 5000,
              })
              .select(),
        },
        {
          name: "events_update",
          label: "Update Event",
          icon: Edit,
          test: async () => {
            const { data: events } = await supabase.from("events").select("id").limit(1)
            if (events && events.length > 0) {
              return supabase
                .from("events")
                .update({
                  title: "Updated Test Workshop",
                })
                .eq("id", events[0].id)
                .select()
            }
            throw new Error("No events found to update")
          },
        },
        {
          name: "events_delete",
          label: "Delete Event",
          icon: Trash2,
          test: async () => {
            const { data: events } = await supabase.from("events").select("id").ilike("title", "%test%").limit(1)
            if (events && events.length > 0) {
              return supabase.from("events").delete().eq("id", events[0].id)
            }
            throw new Error("No test events found to delete")
          },
        },
      ],
    },
    {
      entity: "Locations",
      description: "Studio locations and venues",
      operations: [
        {
          name: "locations_read",
          label: "Read Locations",
          icon: Eye,
          test: () => supabase.from("locations").select("*"),
        },
        {
          name: "locations_create",
          label: "Create Location",
          icon: Plus,
          test: () =>
            supabase
              .from("locations")
              .insert({
                name: "Test Studio",
                address: "123 Test Street, Tokyo",
                capacity: 20,
                amenities: ["WiFi", "Air Conditioning"],
              })
              .select(),
        },
        {
          name: "locations_update",
          label: "Update Location",
          icon: Edit,
          test: async () => {
            const { data: locations } = await supabase.from("locations").select("id").limit(1)
            if (locations && locations.length > 0) {
              return supabase
                .from("locations")
                .update({
                  name: "Updated Test Studio",
                })
                .eq("id", locations[0].id)
                .select()
            }
            throw new Error("No locations found to update")
          },
        },
      ],
    },
    {
      entity: "Instructors",
      description: "Workshop instructors and teachers",
      operations: [
        {
          name: "instructors_read",
          label: "Read Instructors",
          icon: Eye,
          test: () => supabase.from("instructors").select("*"),
        },
        {
          name: "instructors_create",
          label: "Create Instructor",
          icon: Plus,
          test: () =>
            supabase
              .from("instructors")
              .insert({
                name: "Test Instructor",
                email: "test@example.com",
                bio: "A test instructor profile",
                specialties: ["Pottery", "Ceramics"],
              })
              .select(),
        },
        {
          name: "instructors_update",
          label: "Update Instructor",
          icon: Edit,
          test: async () => {
            const { data: instructors } = await supabase.from("instructors").select("id").limit(1)
            if (instructors && instructors.length > 0) {
              return supabase
                .from("instructors")
                .update({
                  bio: "Updated test instructor profile",
                })
                .eq("id", instructors[0].id)
                .select()
            }
            throw new Error("No instructors found to update")
          },
        },
      ],
    },
    {
      entity: "Event Instructors",
      description: "Junction table for event-instructor relationships",
      operations: [
        {
          name: "event_instructors_read",
          label: "Read Event-Instructor Relations",
          icon: Eye,
          test: () =>
            supabase
              .from("event_instructors")
              .select(`
              *,
              events(title),
              instructors(name)
            `)
              .limit(5),
        },
        {
          name: "event_instructors_create",
          label: "Assign Instructor to Event",
          icon: Plus,
          test: async () => {
            const [{ data: events }, { data: instructors }] = await Promise.all([
              supabase.from("events").select("id").limit(1),
              supabase.from("instructors").select("id").limit(1),
            ])

            if (events?.length && instructors?.length) {
              return supabase
                .from("event_instructors")
                .insert({
                  event_id: events[0].id,
                  instructor_id: instructors[0].id,
                  role: "primary",
                })
                .select()
            }
            throw new Error("No events or instructors found")
          },
        },
      ],
    },
    {
      entity: "Corporate Inquiries",
      description: "Private event and corporate booking requests",
      operations: [
        {
          name: "corporate_inquiries_read",
          label: "Read Corporate Inquiries",
          icon: Eye,
          test: () => supabase.from("corporate_inquiries").select("*").limit(5),
        },
        {
          name: "corporate_inquiries_create",
          label: "Create Corporate Inquiry",
          icon: Plus,
          test: () =>
            supabase
              .from("corporate_inquiries")
              .insert({
                company_name: "Test Company",
                contact_email: "contact@testcompany.com",
                contact_phone: "090-1234-5678",
                event_type: "team_building",
                preferred_date: new Date().toISOString().split("T")[0],
                participant_count: 15,
                message: "Test corporate inquiry for team building event",
              })
              .select(),
        },
        {
          name: "corporate_inquiries_update",
          label: "Update Inquiry Status",
          icon: Edit,
          test: async () => {
            const { data: inquiries } = await supabase.from("corporate_inquiries").select("id").limit(1)
            if (inquiries && inquiries.length > 0) {
              return supabase
                .from("corporate_inquiries")
                .update({
                  status: "contacted",
                })
                .eq("id", inquiries[0].id)
                .select()
            }
            throw new Error("No inquiries found to update")
          },
        },
      ],
    },
    {
      entity: "Templates",
      description: "Workshop templates and course materials",
      operations: [
        {
          name: "templates_read",
          label: "Read Templates",
          icon: Eye,
          test: () => supabase.from("templates").select("*").limit(5),
        },
        {
          name: "templates_create",
          label: "Create Template",
          icon: Plus,
          test: () =>
            supabase
              .from("templates")
              .insert({
                name: "Test Template",
                description: "A test workshop template",
                category: "pottery",
                duration_minutes: 120,
                difficulty_level: "beginner",
                materials_needed: ["Clay", "Tools", "Glazes"],
              })
              .select(),
        },
      ],
    },
    {
      entity: "User Favorites",
      description: "User favorite events and bookmarks",
      operations: [
        {
          name: "favorites_read",
          label: "Read User Favorites",
          icon: Eye,
          test: () =>
            supabase
              .from("user_favorites")
              .select(`
              *,
              events(title, start_time)
            `)
              .limit(5),
        },
        {
          name: "favorites_create",
          label: "Add to Favorites",
          icon: Plus,
          test: async () => {
            const { data: events } = await supabase.from("events").select("id").limit(1)
            if (events && events.length > 0) {
              return supabase
                .from("user_favorites")
                .insert({
                  user_id: "test-user-id",
                  event_id: events[0].id,
                })
                .select()
            }
            throw new Error("No events found to favorite")
          },
        },
        {
          name: "favorites_delete",
          label: "Remove from Favorites",
          icon: Trash2,
          test: () => supabase.from("user_favorites").delete().eq("user_id", "test-user-id"),
        },
      ],
    },
  ]

  const getResultIcon = (testName: string) => {
    if (loading[testName]) return null
    if (!results[testName]) return null
    return results[testName].success ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const getResultBadge = (testName: string) => {
    if (loading[testName]) return <Badge variant="secondary">Testing...</Badge>
    if (!results[testName]) return <Badge variant="outline">Not tested</Badge>
    return results[testName].success ? (
      <Badge variant="default" className="bg-green-500">
        Success
      </Badge>
    ) : (
      <Badge variant="destructive">Failed</Badge>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Database className="h-8 w-8" />
          Supabase CRUD Operations Test
        </h1>
        <p className="text-muted-foreground">Test all CRUD operations for the Paintly application entities</p>
      </div>

      <div className="grid gap-6">
        {crudOperations.map((entityGroup) => (
          <Card key={entityGroup.entity}>
            <CardHeader>
              <CardTitle>{entityGroup.entity}</CardTitle>
              <CardDescription>{entityGroup.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {entityGroup.operations.map((operation) => (
                  <div key={operation.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <operation.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{operation.label}</div>
                        <div className="text-sm text-muted-foreground">Test {operation.name.replace(/_/g, " ")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getResultIcon(operation.name)}
                      {getResultBadge(operation.name)}
                      <Button
                        size="sm"
                        onClick={() => runTest(operation.name, operation.test)}
                        disabled={loading[operation.name]}
                      >
                        {loading[operation.name] ? "Testing..." : "Test"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show results for this entity */}
              {Object.entries(results).some(([key]) =>
                key.startsWith(entityGroup.entity.toLowerCase().replace(" ", "_")),
              ) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Results:</h4>
                    {Object.entries(results)
                      .filter(([key]) => key.startsWith(entityGroup.entity.toLowerCase().replace(" ", "_")))
                      .map(([key, result]) => (
                        <div key={key} className="text-sm">
                          <div className="flex items-center gap-2">
                            {result.success ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-500" />
                            )}
                            <span className="font-medium">{key.replace(/_/g, " ")}</span>
                          </div>
                          {result.success ? (
                            <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          ) : (
                            <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                              {result.error}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test All Operations</CardTitle>
          <CardDescription>Run all CRUD operations at once to verify database connectivity</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              crudOperations.forEach((entityGroup) => {
                entityGroup.operations.forEach((operation) => {
                  runTest(operation.name, operation.test)
                })
              })
            }}
            className="w-full"
          >
            Run All Tests
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
