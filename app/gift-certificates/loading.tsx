import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-[300px]" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[150px]" />
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-[200px] mb-4" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card overflow-hidden">
                    <Skeleton className="h-[125px] w-full" />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Skeleton className="h-5 w-[120px] mb-1" />
                          <Skeleton className="h-4 w-[80px]" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-5 w-[60px] mb-1" />
                          <Skeleton className="h-3 w-[100px]" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <Skeleton className="h-4 w-[150px] mb-1" />
                        <Skeleton className="h-3 w-[180px]" />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-[100px]" />
                          <Skeleton className="h-9 w-[100px]" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
