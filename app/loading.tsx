import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full p-4">
      {/* Map Loading */}
      <div className="fixed top-[4rem] left-0 w-full h-[calc(100vh-6rem)] lg:relative lg:top-0">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    </div>
  );
}
