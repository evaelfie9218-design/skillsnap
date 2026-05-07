import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  max?: number;
}

const sizeMap = {
  sm: 14,
  md: 18,
  lg: 22,
};

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  max = 5,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const px = sizeMap[size];
  const display = hovered !== null ? hovered : value;

  return (
    <div
      className="flex items-center gap-0.5"
      role={readonly ? undefined : "radiogroup"}
      aria-label={
        readonly ? `Rating: ${value} out of ${max}` : "Rate this skill"
      }
      data-ocid={readonly ? undefined : "star_rating.input"}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starVal = i + 1;
        const filled = starVal <= display;
        return (
          <button
            key={starVal}
            type="button"
            role={readonly ? undefined : "radio"}
            aria-checked={readonly ? undefined : starVal === Math.round(value)}
            aria-label={readonly ? undefined : `${starVal} star`}
            disabled={readonly}
            onClick={() => !readonly && onChange?.(starVal)}
            onMouseEnter={() => !readonly && setHovered(starVal)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className={cn(
              "transition-colors duration-150",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
            )}
          >
            <Star
              size={px}
              className={cn(
                "transition-colors duration-150",
                filled
                  ? "fill-secondary text-secondary"
                  : "fill-none text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
      {!readonly && (
        <span className="ml-1 text-xs text-muted-foreground tabular-nums">
          {hovered ?? (value > 0 ? value.toFixed(1) : "—")}
        </span>
      )}
    </div>
  );
}
