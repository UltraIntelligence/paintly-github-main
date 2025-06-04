"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface TestResult {
  name: string
  status: "success" | "error" | "warning" | "loading"
  message: string
  details?: string
}

export function SupabaseVerification() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateResult = (name: string, status: TestResult["status"], message: string, details?: string) => {
    setResults((prev) => {
      const existing = prev.find((r) => r.name === name)
      const newResult = { name, status, message, details }

      if (existing) {
        return prev.map((r) => (r.name === name ? newResult : r))
      } else {
        return [...prev, newResult]
      }
    })
  }

  const runTests = async () => {
    setIsRunning(true)
    setResults([])

    // Test 1: Environment Variables
    updateResult("Environment Variables", "loading", "Checking environment variables...")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      updateResult(
        "Environment Variables",
        "error",
        "Missing required environment variables",
        `Missing: ${!supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL " : ""}${!supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : ""}`,
      )
    } else {
      updateResult("Environment Variables", "success", "All client environment variables found")
    }

    // Test 2: Client Connection
    updateResult("Client Connection", "loading", "Testing client connection...")

    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        updateResult("Client Connection", "warning", "Client connected but auth error", error.message)
      } else {
        updateResult("Client Connection", "success", "Client connection successful")
      }
    } catch (error) {
      updateResult(
        "Client Connection",
        "error",
        "Client connection failed",
        error instanceof Error ? error.message : "Unknown error",
      )
    }

    // Test 3: Service Role Key Test (via API route)
    updateResult("Service Role Key", "loading", "Testing service role key...")

    try {
      const response = await fetch("/api/test-service-role")
      const result = await response.json()

      if (response.ok && result.success) {
        updateResult("Service Role Key", "success", "Service role key working correctly")
      } else {
        updateResult("Service Role Key", "error", "Service role key test failed", result.error || "Unknown error")
      }
    } catch (error) {
      updateResult(
        "Service Role Key",
        "error",
        "Failed to test service role key",
        error instanceof Error ? error.message : "Unknown error",
      )
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      success: "default",
      error: "destructive",
      warning: "secondary",
      loading: "outline",
    } as const

    return (
      <Badge variant={variants[status]} className="ml-2">
        {status === "loading" ? "Testing..." : status}
      </Badge>
    )
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Supabase Connection Verification
            {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          <CardDescription>Testing Supabase connection, authentication, and service role access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={runTests} disabled={isRunning} className="w-full">
              {isRunning ? "Running Tests..." : "Run Tests Again"}
            </Button>

            <div className="space-y-3">
              {results.map((result) => (
                <div key={result.name} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{result.name}</span>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
                    {result.details && (
                      <p className="text-xs text-muted-foreground mt-1 font-mono bg-muted p-2 rounded">
                        {result.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
