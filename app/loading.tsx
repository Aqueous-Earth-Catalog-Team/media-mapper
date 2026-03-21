import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full relative">
      <h1 className="sr-only">Media Mapper - Interactive Map View</h1>
      <div className="w-full h-[calc(100vh-4rem)] relative">
        <div className="relative w-full h-full overflow-hidden">
          {/* Map skeleton */}
          <Skeleton className="w-full h-full" />

          {/* Drawer skeleton */}
          <div className="absolute top-0 left-0 bottom-0 w-80 lg:w-96 bg-background shadow-lg flex flex-col gap-3 p-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="flex-1 w-full" />
          </div>

          {/* Filters button skeleton */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
