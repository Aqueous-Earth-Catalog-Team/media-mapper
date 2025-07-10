import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortableHeaderProps<T> {
  column: Column<T>;
  title: string;
}

export function SortableHeader<T>({ column, title }: SortableHeaderProps<T>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto p-0 font-semibold group justify-start"
      aria-label={`Sort by ${title} ${
        column.getIsSorted() === "asc"
          ? "ascending"
          : column.getIsSorted() === "desc"
          ? "descending"
          : ""
      }`}
    >
      <span>{title}</span>
      <div className="ml-2 w-4 h-4 flex items-center justify-center">
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
        )}
      </div>
    </Button>
  );
}