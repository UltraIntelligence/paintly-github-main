"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SupabaseDebug() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const results = []

    // Test 1: Basic connection
    try {
      console.log("🧪 Test 1: Basic connection")
      const { data, error } = await supabase.from("locations").select("count", { count: "exact" })
      results.push({
        test: "Basic Connection",
        status: error ? "❌ Failed" : "✅ Success",
        details: error ? error.message : `Connected successfully. Count: ${data?.length || 0}`,
        data: data,
      })
    } catch (err) {
      results.push({
        test: "Basic Connection",
        status: "❌ Failed",
        details: err instanceof Error ? err.message : "Unknown error",
        data: null,
      })
    }

    // Test 2: Simple select
    try {
      console.log("🧪 Test 2: Simple select")
      const { data, error } = await supabase.from("locations").select("id, name").limit(1)
      results.push({
        test: "Simple Select",
        status: error ? "❌ Failed" : "✅ Success",
        details: error ? error.message : `Fetched ${data?.length || 0} records`,
        data: data,
      })
    } catch (err) {
      results.push({
        test: "Simple Select",
        status: "❌ Failed",
        details: err instanceof Error ? err.message : "Unknown error",
        data: null,
      })
    }

    // Test 3: Check RLS
    try {
      console.log("🧪 Test 3: Check RLS")
      const { data, error } = await supabase.rpc("version")
      results.push({
        test: "RLS Check",
        status: error ? "❌ Failed" : "✅ Success",
        details: error ? error.message : "RPC call successful",
        data: data,
      })
    } catch (err) {
      results.push({
        test: "RLS Check",
        status: "❌ Failed",
        details: err instanceof Error ? err.message : "Unknown error",
        data: null,
      })
    }

    setTestResults(results)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Debug Tests</CardTitle>
        <Button onClick={runTests} disabled={loading}>
          {loading ? "Running Tests..." : "Run Debug Tests"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{result.test}</h3>
                <Badge variant={result.status.includes("✅") ? "default" : "destructive"}>{result.status}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{result.details}</p>
              {result.data && (
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
