"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export function SupabaseConnectionTest() {
  const [testResults, setTestResults] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  const runTests = async () => {
    setTesting(true)
    const results: any = {}

    try {
      // Test locations
      const { data: locations, error: locError } = await supabase.from("locations").select("id, name").limit(5)

      results.locations = {
        success: !locError,
        count: locations?.length || 0,
        error: locError?.message,
      }

      // Test events
      const { data: events, error: evError } = await supabase.from("events").select("id, title").limit(5)

      results.events = {
        success: !evError,
        count: events?.length || 0,
        error: evError?.message,
      }

      // Test staff
      const { data: staff, error: staffError } = await supabase
        .from("staff")
        .select("user_id, full_name_override")
        .limit(5)

      results.staff = {
        success: !staffError,
        count: staff?.length || 0,
        error: staffError?.message,
      }

      // Test businesses
      const { data: businesses, error: bizError } = await supabase.from("businesses").select("id, name").limit(5)

      results.businesses = {
        success: !bizError,
        count: businesses?.length || 0,
        error: bizError?.message,
      }
    } catch (error) {
      results.error = error instanceof Error ? error.message : "Unknown error"
    }

    setTestResults(results)
    setTesting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Supabase Connection Test
          <Button onClick={runTests} disabled={testing} size="sm">
            {testing ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Run Tests"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!testResults ? (
          <p className="text-gray-500">Click "Run Tests" to check database connectivity</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(testResults).map(([table, result]: [string, any]) => (
              <div key={table} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium capitalize">{table}</span>
                <div className="flex items-center space-x-2">
                  {result.success ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="outline" className="text-green-700">
                        {result.count} records
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive">Error</Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
