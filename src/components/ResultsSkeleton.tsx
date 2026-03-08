import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonCard({ children }: { children?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-3 pt-5 px-5">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-2">
        {children || (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Hosting Provider */}
      <SkeletonCard>
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-32" />
      </SkeletonCard>

      {/* Server Location */}
      <SkeletonCard>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-28" />
      </SkeletonCard>

      {/* Performance - circular gauge */}
      <SkeletonCard>
        <div className="flex items-center gap-5">
          <Skeleton className="h-24 w-24 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </SkeletonCard>

      {/* Security Analysis */}
      <SkeletonCard>
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="space-y-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5 rounded-sm" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      </SkeletonCard>

      {/* Technologies - full width */}
      <div className="md:col-span-2">
        <SkeletonCard>
          <div className="space-y-3">
            <Skeleton className="h-3 w-20" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-3 w-16" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </SkeletonCard>
      </div>

      {/* Site Status */}
      <SkeletonCard>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-36 mt-2" />
      </SkeletonCard>

      {/* Email Provider */}
      <SkeletonCard>
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-3 w-16 mt-2" />
        <Skeleton className="h-3 w-48" />
      </SkeletonCard>

      {/* Site Screenshot */}
      <SkeletonCard>
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-3 w-20 mt-2" />
      </SkeletonCard>

      {/* DNS Records */}
      <SkeletonCard>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-4 w-20 mt-1" />
        <Skeleton className="h-3 w-3/4" />
      </SkeletonCard>
    </div>
  );
}
