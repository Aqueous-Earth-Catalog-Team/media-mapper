"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
