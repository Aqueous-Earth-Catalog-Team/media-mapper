import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full relative">
      <div className="px-4 py-2 w-full max-w-7xl mx-auto relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-168px)]">
        {/* Map Loading Skeleton */}
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    </div>
  );
}
