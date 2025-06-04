"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function SupabaseConnectionTest() {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [testMethod, setTestMethod] = useState<string>("")

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setLoading(true)
      setError(null)

      // First try: Test with the test table
      try {
        const { data, error } = await supabase.from("test").select("*").limit(1)
        if (!error) {
          setIsConnected(true)
          setTestMethod("test table")
          return
        }
      } catch (e) {
        // Test table doesn't exist, try alternative methods
      }

      // Second try: Test basic connection with auth
      try {
        const { data, error } = await supabase.auth.getSession()
        if (!error) {
          setIsConnected(true)
          setTestMethod("auth session")
          return
        }
      } catch (e) {
        // Auth test failed, try one more method
      }

      // Third try: Test with a simple RPC call
      try {
        const { data, error } = await supabase.rpc("version")
        if (!error) {
          setIsConnected(true)
          setTestMethod("version check")
          return
        }
      } catch (e) {
        // All methods failed
      }

      // If we get here, all connection methods failed
      setError("Unable to establish connection to Supabase. Please check your configuration.")
      setIsConnected(false)
    } catch (e: any) {
      setError(`Connection test failed: ${e.message}`)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <p className="text-muted-foreground">Testing connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`p-4 border rounded-lg ${isConnected ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
    >
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      {isConnected ? (
        <div>
          <p className="text-green-600 font-medium">✅ Successfully connected to Supabase!</p>
          <p className="text-sm text-green-700 mt-1">Connection method: {testMethod}</p>
        </div>
      ) : (
        <div>
          <p className="text-red-600 font-medium">❌ Failed to connect to Supabase</p>
          {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p className="font-medium text-yellow-800">💡 Setup Required:</p>
            <p className="text-yellow-700">
              Run the SQL script to create the test table, or check your Supabase configuration.
            </p>
          </div>
        </div>
      )}
      <button
        onClick={testConnection}
        disabled={loading}
        className="mt-3 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Again"}
      </button>
    </div>
  )
}
