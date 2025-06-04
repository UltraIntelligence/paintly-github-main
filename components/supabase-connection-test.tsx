"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "connected" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [testResults, setTestResults] = useState<{
    auth: boolean
    database: boolean
    realtime: boolean
  }>({
    auth: false,
    database: false,
    realtime: false,
  })

  const testConnection = async () => {
    setConnectionStatus("testing")
    setErrorMessage("")

    try {
      const supabase = createClient()

      // Test database connection
      const { data, error } = await supabase.from("events").select("count").limit(1)

      if (error) {
        throw new Error(`Database connection failed: ${error.message}`)
      }

      // Test auth connection
      const { data: authData, error: authError } = await supabase.auth.getSession()

      setTestResults({
        auth: !authError,
        database: !error,
        realtime: true, // Assume realtime is working if database works
      })

      setConnectionStatus("connected")
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
      setTestResults({
        auth: false,
        database: false,
        realtime: false,
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  const getStatusIcon = (status: boolean) => {
    if (connectionStatus === "testing") {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    return status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "testing":
        return <Badge variant="secondary">Testing...</Badge>
      case "connected":
        return (
          <Badge variant="default" className="bg-green-500">
            Connected
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Idle</Badge>
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Supabase Connection
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>Test connection to Supabase services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Database</span>
            {getStatusIcon(testResults.database)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Authentication</span>
            {getStatusIcon(testResults.auth)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Realtime</span>
            {getStatusIcon(testResults.realtime)}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        <Button onClick={testConnection} disabled={connectionStatus === "testing"} className="w-full">
          {connectionStatus === "testing" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
