import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full relative">
      <h1 className="sr-only">Media Mapper - Interactive Map View</h1>
      <div className="px-4 py-2 w-full h-[calc(100vh-16rem)] max-w-7xl mx-auto relative">

        {/* Search and filter skeleton */}
        <div className="flex justify-between gap-2 mt-5 mb-2 mx-2">
          <Skeleton className="h-12 w-full md:w-[350px] mb-1" />
          <div className='gap-2 hidden md:flex'>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            -
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
          <Skeleton className="h-12 w-10 md:hidden" />
        </div>
        {/* Map Loading Skeleton */}
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    </div>
  );
}
