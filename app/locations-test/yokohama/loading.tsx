import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <Skeleton className="w-full h-48 sm:h-64 lg:w-40 lg:h-40 rounded-none lg:rounded-lg" />
        <div className="flex-1 px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-4">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards Skeleton */}
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      {/* Events Section Skeleton */}
      <div>
        <Skeleton className="h-7 w-36 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>

      {/* Chart Skeleton */}
      <Skeleton className="h-80 w-full" />

      {/* Quick Actions Skeleton */}
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  )
}
