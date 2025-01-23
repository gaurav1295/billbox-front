import { Skeleton } from "@/components/ui/skeleton"

export function TransactionListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="rounded-xl border bg-white shadow-sm divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-2 w-3/4" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

