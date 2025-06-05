import Map from "@/components/map";
import { MediaPoint, mockMediaPoints } from "@/lib/data/mock-media";
import { LocationDetails } from "@/components/location-details";

async function getMediaPoint(mediaPointId?: string): Promise<MediaPoint> {
  if (!mediaPointId) {
    return mockMediaPoints[Math.floor(Math.random() * mockMediaPoints.length)];
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMediaPoints.find((point) => point.id === mediaPointId)!);
    }, 1000);
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: { mediaPointId?: string };
}) {
  const mediaPoint = await getMediaPoint(searchParams.mediaPointId);

  return (
    <div className="w-full h-full">
      {/* Desktop Layout */}
      <div className="h-[calc(100vh-4rem)] relative">
        <div className="absolute top-2 left-2 max-h-[calc(100vh-7rem)] rounded-xl overflow-y-auto w-[calc(100%-1rem)] shadow-2xl z-10 md:w-3/5 md:top-4 md:left-4 lg:top-10 lg:left-10 lg:w-1/2  xl:w-1/3">
          <LocationDetails data={mediaPoint} />
        </div>
        <Map selectedMediaPoint={mediaPoint} />
      </div>
    </div>
  );
}
