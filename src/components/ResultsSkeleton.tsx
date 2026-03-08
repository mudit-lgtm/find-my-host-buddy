import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonCard({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-2.5 sm:gap-3 pb-2 sm:pb-3 pt-4 sm:pt-5 px-4 sm:px-5">
        <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg" />
        <Skeleton className="h-4 sm:h-5 w-28 sm:w-32" />
      </CardHeader>
      <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2">
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

function SectionLabel() {
  return <Skeleton className="h-3 w-24 mb-3 sm:mb-4 ml-1" />;
}

function SummaryBannerSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 sm:px-4 sm:py-3">
          <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-2.5 w-12" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Overview */}
      <div>
        <SectionLabel />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <SkeletonCard>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
            </SkeletonCard>
          </div>
          <SkeletonCard>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-28" />
          </SkeletonCard>
          <SkeletonCard>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-36 mt-2" />
          </SkeletonCard>
        </div>
      </div>

      {/* Security & Performance */}
      <div>
        <SectionLabel />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <SkeletonCard>
            <div className="flex items-center gap-4 sm:gap-5">
              <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </SkeletonCard>
          <SkeletonCard>
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </SkeletonCard>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <SectionLabel />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <SkeletonCard>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </SkeletonCard>
          </div>
          <SkeletonCard>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-3 w-48 mt-2" />
          </SkeletonCard>
          <SkeletonCard>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </SkeletonCard>
          <div className="md:col-span-2">
            <SkeletonCard>
              <Skeleton className="h-48 sm:h-64 w-full rounded-lg" />
            </SkeletonCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SummaryBannerSkeleton };
