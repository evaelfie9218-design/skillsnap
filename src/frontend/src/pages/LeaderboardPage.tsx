import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeaderboard } from "@/hooks/useBackend";
import { LeaderboardSort } from "@/types";
import { BarChart3, Star, Trophy, Zap } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { value: LeaderboardSort.rating, label: "Top Rated", icon: Star },
  { value: LeaderboardSort.skillCount, label: "Most Skills", icon: BarChart3 },
  { value: LeaderboardSort.creditsEarned, label: "Most Credits", icon: Zap },
];

const medalColors = [
  "text-[oklch(0.78_0.18_85)]",
  "text-[oklch(0.72_0.06_240)]",
  "text-[oklch(0.65_0.14_55)]",
];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<LeaderboardSort>(LeaderboardSort.rating);
  const { data: entries, isLoading } = useLeaderboard(sortBy, 50);

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      data-ocid="leaderboard.page"
    >
      <div className="space-y-1">
        <h1 className="text-h2 font-display flex items-center gap-2">
          <Trophy size={28} className="text-secondary" /> Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Top contributors ranked by skills, ratings, and credits earned.
        </p>
      </div>

      <Tabs
        value={sortBy}
        onValueChange={(v) => setSortBy(v as LeaderboardSort)}
        data-ocid="leaderboard.sort.tab"
      >
        <TabsList className="w-full">
          {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-1 gap-2"
              data-ocid={`leaderboard.sort.${value}.tab`}
            >
              <Icon size={14} /> {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="space-y-3" data-ocid="leaderboard.loading_state">
          {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map((k) => (
            <Skeleton key={k} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : entries && entries.length > 0 ? (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={entry.userId.toText()}
              data-ocid={`leaderboard.item.${i + 1}`}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-smooth ${
                i < 3
                  ? "bg-card border-primary/20 shadow-subtle"
                  : "bg-muted/20 border-border hover:border-border/60"
              }`}
            >
              {/* Rank */}
              <span
                className={`w-8 text-center font-display font-bold text-lg ${
                  i < 3 ? medalColors[i] : "text-muted-foreground"
                }`}
              >
                {i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}
              </span>

              {/* Name + stats */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold font-display truncate">
                  {entry.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{Number(entry.skillCount)} skills</span>
                  <span>{entry.avgRating.toFixed(1)} ★</span>
                </div>
              </div>

              {/* Credits earned */}
              <Badge
                variant="outline"
                className="shrink-0 gap-1 border-primary/30 text-primary"
              >
                <Zap size={11} /> {Number(entry.creditsEarned)}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="py-20 text-center space-y-3"
          data-ocid="leaderboard.empty_state"
        >
          <p className="text-4xl">🏆</p>
          <p className="font-display text-lg font-semibold">No rankings yet</p>
          <p className="text-muted-foreground text-sm">
            Be the first to share skills and top the charts!
          </p>
        </div>
      )}
    </div>
  );
}
