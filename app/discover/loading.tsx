export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-8 animate-pulse"></div>
          <div className="h-14 bg-gray-200 rounded-full max-w-2xl mx-auto animate-pulse"></div>
        </div>

        {/* Categories skeleton */}
        <div className="flex gap-3 mb-12 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-full w-32 flex-shrink-0 animate-pulse"></div>
          ))}
        </div>

        {/* Starting soon skeleton */}
        <div className="mb-12">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse"></div>
                <div className="p-4 border border-t-0 rounded-b-lg">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main grid skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
