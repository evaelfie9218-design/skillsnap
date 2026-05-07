import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { SkillWithMeta } from "@/types";
import { Clock, Lock, Unlock, User } from "lucide-react";

interface SkillCardProps {
  skill: SkillWithMeta;
  onUnlock?: (skillId: string) => void;
  onSelect?: (skill: SkillWithMeta) => void;
  isUnlocking?: boolean;
  index?: number;
}

export function SkillCard({
  skill,
  onUnlock,
  onSelect,
  isUnlocking,
  index = 1,
}: SkillCardProps) {
  return (
    <Card
      data-ocid={`skill.card.item.${index}`}
      className="group flex flex-col bg-card border-border hover:border-primary/40 transition-smooth cursor-pointer overflow-hidden"
      onClick={() => onSelect?.(skill)}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-primary/60 group-hover:bg-primary transition-smooth" />

      <CardContent className="flex-1 p-4 space-y-3">
        {/* Category + locked badge */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="text-xs font-medium truncate max-w-[120px]"
          >
            {skill.category}
          </Badge>
          {skill.isUnlocked ? (
            <span className="flex items-center gap-1 text-xs text-primary">
              <Unlock size={12} /> Unlocked
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock size={12} /> 1 credit
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2 text-foreground">
          {skill.title}
        </h3>

        {/* Creator + duration */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 truncate">
            <User size={11} />
            <span className="truncate">{skill.creatorName}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock size={11} />
            {Number(skill.durationSeconds)}s
          </span>
        </div>

        {/* Tags */}
        {skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between gap-2">
        <StarRating value={skill.rating} readonly size="sm" />

        {!skill.isUnlocked && onUnlock && (
          <Button
            size="sm"
            variant="default"
            data-ocid={`skill.unlock_button.${index}`}
            disabled={isUnlocking}
            onClick={(e) => {
              e.stopPropagation();
              onUnlock(skill.skillId);
            }}
            className="text-xs h-7 px-3 gap-1"
          >
            <Unlock size={11} />
            Unlock
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
