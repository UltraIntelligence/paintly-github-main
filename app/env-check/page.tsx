"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

export default function EnvCheckPage() {
  const [connectionTest, setConnectionTest] = useState<{
    status: "idle" | "testing" | "success" | "error"
    message: string
    details?: any
  }>({ status: "idle", message: "" })

  // Client-side environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const testSupabaseConnection = async () => {
    setConnectionTest({ status: "testing", message: "Testing connection..." })

    try {
      // Import Supabase client dynamically to avoid SSR issues
      const { supabase } = await import("@/lib/supabase")

      // Test basic connection
      const { data, error } = await supabase.from("test").select("*").limit(1)

      if (error) {
        setConnectionTest({
          status: "error",
          message: "Connection failed",
          details: error,
        })
      } else {
        setConnectionTest({
          status: "success",
          message: "Connection successful!",
          details: data,
        })
      }
    } catch (err) {
      setConnectionTest({
        status: "error",
        message: "Failed to connect to Supabase",
        details: err,
      })
    }
  }

  const getStatusIcon = (isSet: boolean) => {
    return isSet ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusBadge = (isSet: boolean) => {
    return <Badge variant={isSet ? "default" : "destructive"}>{isSet ? "✅ Set" : "❌ Missing"}</Badge>
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Environment Variables Check</h1>
        <p className="text-muted-foreground">Verify your Supabase configuration and test the database connection</p>
      </div>

      <div className="grid gap-6">
        {/* Environment Variables Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Environment Variables
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(!!supabaseUrl)}
                  <div>
                    <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_URL</h3>
                    <p className="text-sm text-muted-foreground">
                      {supabaseUrl ? <span className="font-mono text-xs">{supabaseUrl}</span> : "Not configured"}
                    </p>
                  </div>
                </div>
                {getStatusBadge(!!supabaseUrl)}
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(!!supabaseAnonKey)}
                  <div>
                    <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</h3>
                    <p className="text-sm text-muted-foreground">
                      {supabaseAnonKey ? (
                        <span className="font-mono text-xs">{supabaseAnonKey.substring(0, 20)}...</span>
                      ) : (
                        "Not configured"
                      )}
                    </p>
                  </div>
                </div>
                {getStatusBadge(!!supabaseAnonKey)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Database Connection Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={testSupabaseConnection}
                disabled={connectionTest.status === "testing" || !supabaseUrl || !supabaseAnonKey}
              >
                {connectionTest.status === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Test Connection
              </Button>

              {connectionTest.status !== "idle" && (
                <div className="flex items-center gap-2">
                  {connectionTest.status === "testing" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {connectionTest.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {connectionTest.status === "error" && <XCircle className="h-4 w-4 text-red-600" />}
                  <span
                    className={
                      connectionTest.status === "success"
                        ? "text-green-600"
                        : connectionTest.status === "error"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }
                  >
                    {connectionTest.message}
                  </span>
                </div>
              )}
            </div>

            {connectionTest.details && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Connection Details:</h4>
                <pre className="text-xs overflow-auto">{JSON.stringify(connectionTest.details, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">How to configure Supabase:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                  <li>Go to your Supabase project dashboard</li>
                  <li>Click on "Settings" → "API"</li>
                  <li>Copy the "Project URL" and "anon public" key</li>
                  <li>In v0, these should be automatically available as environment variables</li>
                </ol>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Available Environment Variables:</h3>
                <div className="text-sm font-mono space-y-1">
                  <div>SUPABASE_URL: {process.env.SUPABASE_URL ? "✅ Available" : "❌ Not set"}</div>
                  <div>
                    NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Available" : "❌ Not set"}
                  </div>
                  <div>SUPABASE_ANON_KEY: {process.env.SUPABASE_ANON_KEY ? "✅ Available" : "❌ Not set"}</div>
                  <div>
                    NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Available" : "❌ Not set"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
