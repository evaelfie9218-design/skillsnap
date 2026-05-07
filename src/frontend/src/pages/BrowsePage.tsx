import { AudioPlayer } from "@/components/AudioPlayer";
import { SkillCard } from "@/components/SkillCard";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useListSkills,
  useRateSkill,
  useUnlockSkill,
} from "@/hooks/useBackend";
import type { SkillFilter, SkillWithMeta } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Cooking",
  "Productivity",
  "Language",
  "Finance",
  "Fitness",
  "Tech",
  "Creativity",
];

export default function BrowsePage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillWithMeta | null>(
    null,
  );

  const effectiveFilter: SkillFilter = {
    ...(selectedCategory !== "All" ? { category: selectedCategory } : {}),
    ...(search ? { search } : {}),
  };

  const { data: skills, isLoading } = useListSkills(effectiveFilter);
  const unlockMutation = useUnlockSkill();
  const rateMutation = useRateSkill();

  const handleUnlock = async (skillId: string) => {
    try {
      await unlockMutation.mutateAsync(skillId);
      toast.success("Skill unlocked!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to unlock");
    }
  };

  const handleRate = async (skillId: string, rating: number) => {
    try {
      await rateMutation.mutateAsync({ skillId, rating });
      toast.success("Rating saved!");
      // Sync dialog state from refreshed query data
      const updated = qc.getQueryData<SkillWithMeta[]>([
        "skills",
        effectiveFilter,
      ]);
      if (updated && selectedSkill) {
        const refreshed = updated.find((s) => s.skillId === skillId);
        if (refreshed) setSelectedSkill(refreshed);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to rate");
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8 space-y-6"
      data-ocid="browse.page"
    >
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-h2 font-display">Browse Skills</h1>
        <p className="text-muted-foreground text-sm">
          Discover and unlock 10-second audio tips from experts worldwide.
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search skills…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="browse.search_input"
          />
        </div>
      </div>

      {/* Category pills */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
        data-ocid="browse.category.filter"
      >
        {CATEGORIES.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className="cursor-pointer shrink-0 transition-smooth"
            onClick={() => setSelectedCategory(cat)}
            data-ocid="browse.category.tab"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          data-ocid="browse.skills.loading_state"
        >
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <Skeleton key={k} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : skills && skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.skillId}
              skill={skill}
              index={i + 1}
              onUnlock={handleUnlock}
              onSelect={setSelectedSkill}
              isUnlocking={unlockMutation.isPending}
            />
          ))}
        </div>
      ) : (
        <div
          className="py-20 text-center space-y-3"
          data-ocid="browse.skills.empty_state"
        >
          <p className="text-4xl">🎧</p>
          <p className="font-display text-lg font-semibold">No skills yet</p>
          <p className="text-muted-foreground text-sm">
            Be the first to share a 10-second skill!
          </p>
        </div>
      )}

      {/* Skill detail dialog */}
      <Dialog
        open={!!selectedSkill}
        onOpenChange={(o) => !o && setSelectedSkill(null)}
      >
        <DialogContent
          className="max-w-md"
          data-ocid="browse.skill_detail.dialog"
        >
          {selectedSkill && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {selectedSkill.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedSkill.category}</Badge>
                  {selectedSkill.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      #{t}
                    </Badge>
                  ))}
                </div>
                {selectedSkill.isUnlocked ? (
                  <AudioPlayer
                    src={selectedSkill.audioUrl}
                    title={selectedSkill.title}
                  />
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Unlock to listen to this skill
                    </p>
                    <Button
                      onClick={() => handleUnlock(selectedSkill.skillId)}
                      disabled={unlockMutation.isPending}
                      data-ocid="browse.skill_detail.unlock_button"
                      className="gap-2"
                    >
                      Unlock for 1 credit
                    </Button>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">
                    Rate this skill
                  </p>
                  <StarRating
                    value={selectedSkill.rating}
                    onChange={(r) => handleRate(selectedSkill.skillId, r)}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
