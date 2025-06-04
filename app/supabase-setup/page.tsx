"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SupabaseSetupPage() {
  const [serviceRoleKey, setServiceRoleKey] = useState("")
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">Supabase Setup Guide</h1>
      <p className="text-gray-600 mb-6">Configure your Supabase environment for Paintly</p>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Missing Service Role Key</AlertTitle>
        <AlertDescription>
          Your SUPABASE_SERVICE_ROLE_KEY is missing. This key is required for admin operations and server-side
          functionality.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="setup">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
          <TabsTrigger value="code">Code Examples</TabsTrigger>
        </TabsList>
        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Getting Your Service Role Key</CardTitle>
              <CardDescription>Follow these steps to find your Supabase service role key</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">1. Log in to your Supabase Dashboard</h3>
                <p className="text-sm text-gray-600">
                  Go to{" "}
                  <a
                    href="https://app.supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://app.supabase.com
                  </a>{" "}
                  and sign in to your account.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">2. Select your project</h3>
                <p className="text-sm text-gray-600">
                  From the dashboard, select the project you're using for Paintly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">3. Go to Project Settings</h3>
                <p className="text-sm text-gray-600">
                  Click on the gear icon in the sidebar to access your project settings.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">4. Find API section</h3>
                <p className="text-sm text-gray-600">
                  In the settings menu, look for "API" or "Project API keys" section.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">5. Copy the service_role key</h3>
                <p className="text-sm text-gray-600">
                  You'll see a "service_role secret" or "service_role key". This is your SUPABASE_SERVICE_ROLE_KEY.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Add Service Role Key
              </CardTitle>
              <CardDescription>Add your service role key to your environment variables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-role-key">Service Role Key</Label>
                  <Input
                    id="service-role-key"
                    type="password"
                    placeholder="Enter your service role key"
                    value={serviceRoleKey}
                    onChange={(e) => setServiceRoleKey(e.target.value)}
                  />
                </div>

                <div className="rounded-md bg-gray-50 p-4">
                  <div className="font-mono text-sm">
                    <p>SUPABASE_SERVICE_ROLE_KEY={serviceRoleKey || "your_service_role_key"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCopy(`SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`)}>
                {copied ? "Copied!" : "Copy Environment Variable"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle>Using the Service Role Key</CardTitle>
              <CardDescription>Code examples for server-side operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Server-side Supabase Client</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">
                      {`// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js'

// This client should ONLY be used in server-side contexts
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
`}
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Example: Admin Operations</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">
                      {`// app/api/admin/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  // Only possible with service role key
  const { data, error } = await supabaseAdmin
    .from('restricted_table')
    .insert([{ name: 'Admin created record' }])
    
  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
  
  return Response.json({ success: true, data })
}
`}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
