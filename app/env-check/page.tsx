export default function EnvCheckPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Environment Variables Check</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_URL</h3>
          <p className="text-sm text-gray-600 mt-1">
            {supabaseUrl ? (
              <span className="text-green-600">✅ Set: {supabaseUrl}</span>
            ) : (
              <span className="text-red-600">❌ Not set</span>
            )}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</h3>
          <p className="text-sm text-gray-600 mt-1">
            {supabaseAnonKey ? (
              <span className="text-green-600">✅ Set: {supabaseAnonKey.substring(0, 20)}...</span>
            ) : (
              <span className="text-red-600">❌ Not set</span>
            )}
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800">How to set environment variables:</h3>
          <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-blue-700">
            <li>Go to your Supabase project dashboard</li>
            <li>Click on "Settings" → "API"</li>
            <li>Copy the "Project URL" and "anon public" key</li>
            <li>In v0, these should be automatically available</li>
          </ol>
        </div>

        <div className="p-4 bg-gray-50 border rounded-lg">
          <h3 className="font-semibold">Available Environment Variables:</h3>
          <div className="mt-2 text-sm font-mono">
            <div>SUPABASE_URL: {process.env.SUPABASE_URL ? "✅ Available" : "❌ Not set"}</div>
            <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Available" : "❌ Not set"}</div>
            <div>SUPABASE_ANON_KEY: {process.env.SUPABASE_ANON_KEY ? "✅ Available" : "❌ Not set"}</div>
            <div>
              NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Available" : "❌ Not set"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
