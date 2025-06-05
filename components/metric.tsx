import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </span>
  );
}

export function Metric({
  className,
  href,
  label,
  value,
}: {
  className?: string;
  href?: string;
  label: string;
  value: string | string[];
}) {
  if (href) {
    return (
      <Container className={className}>
        <Label>{label}</Label>
        <a
          className="text-[16px] flex items-center gap-1 underline"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
          <ExternalLink className="size-3.5" />
        </a>
      </Container>
    );
  } else if (Array.isArray(value)) {
    return (
      <Container className={className}>
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2">
          {value.map((v) => (
            <Badge key={v} variant="secondary">
              {v}
            </Badge>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <p className="text-[16px]">{value}</p>
    </Container>
  );
}
