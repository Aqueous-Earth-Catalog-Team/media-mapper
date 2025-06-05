"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CircleX, ZoomIn } from "lucide-react";
import { MediaPoint } from "@/lib/data/mock-media";
import { Metric } from "@/components/metric";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LocationDetailsProps {
  data: MediaPoint | null;
}

export function LocationDetails({ data }: LocationDetailsProps) {
  const [isOpen, setIsOpen] = useState(!!data);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(!!data);
  }, [data]);

  function handleClose() {
    setIsOpen(false);
    router.push("/");
  }

  if (!isOpen || !data) return null;

  return (
    <Card>
      <CardHeader>
        <Badge className="capitalize" variant="secondary">
          {data.media_type}
        </Badge>
        <div className="flex justify-between gap-1">
          <div>
            <CardTitle className="text-2xl font-bold">
              {data.title} ({data.year})
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Created by {data.creator}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={handleClose}
          >
            <CircleX className="size-6" />
          </Button>
        </div>

        {data.media_thumbnail_url && (
          <div className="relative w-full h-50 mt-2">
            <Image
              src={data.media_thumbnail_url || ""}
              alt={data.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <Button variant="default" className="w-full mt-2">
          <ZoomIn />
          Zoom To
        </Button>
      </CardHeader>
      <CardContent>
        <Metric label="Language" value={data.language} />
        <Metric label="Summary" value={data.description} className="mt-4" />
        <Metric
          label="Nearest Municipality"
          value={`${data.city}, ${data.country}`}
          className="mt-4"
        />

        <Metric label="Subjects" value={data.subjects} className="mt-4" />

        <Metric
          href={data.rights_url}
          label="Media Rights"
          value={data.rights}
          className="mt-4"
        />

        <div className="flex justify-between gap-2 mt-6 border-t pt-6">
          <div className="flex gap-2">
            <Button variant="outline">
              <ArrowLeft />
              Previous Item
            </Button>
            <Button variant="outline">
              Next Item
              <ArrowRight />
            </Button>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Close
            <CircleX />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
