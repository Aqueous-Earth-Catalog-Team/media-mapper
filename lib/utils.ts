import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Row } from "@tanstack/react-table";
import { MediaLocation } from "@/lib/airtable/types";
import { formatLocation } from "@/components/media-locations-table/columns";

const headers = [
  "Media Title",
  "Media Type",
  "Director",
  "Release Year",
  "Location",
  "Natural Feature",
  "Subjects",
  "Language",
  "Coordinates",
  "Description",
  "Original Title",
  "References",
  "Rights",
];

export function exportToCSV(filteredRows: Row<MediaLocation>[]) {
  const csvData = filteredRows.map((row) => {
    const item = row.original;
    return [
      item.media?.name || "",
      item.media?.media_type || "",
      item.media?.director || "",
      item.media?.release_year || "",
      formatLocation(item),
      item.natural_feature_name || "",
      item.media?.subjects?.join("; ") || "",
      item.media?.language?.join("; ") || "",
      `${item.latitude}, ${item.longitude}`,
      item.media?.description || "",
      item.media?.original_title || "",
      item.media?.references || "",
      item.media?.rights || "",
    ];
  });

  const csvContent = [headers, ...csvData]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `media-locations-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
