import { AudioPlayer } from "@/components/AudioPlayer";
import { SkillCard } from "@/components/SkillCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useMySkills } from "@/hooks/useBackend";
import type { SkillWithMeta } from "@/types";
import { Link } from "@tanstack/react-router";
import { LogIn, Mic } from "lucide-react";
import { useState } from "react";

export default function MySkillsPage() {
  const { isLoggedIn, login } = useAuth();
  const { data: skills, isLoading } = useMySkills();
  const [selected, setSelected] = useState<SkillWithMeta | null>(null);

  if (!isLoggedIn) {
    return (
      <div
        className="max-w-md mx-auto px-4 py-24 text-center space-y-6"
        data-ocid="my-skills.auth_prompt"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Mic size={28} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-h3 font-display">Your Skills</h2>
          <p className="text-muted-foreground text-sm">
            Sign in to see the skills you've shared.
          </p>
        </div>
        <Button
          onClick={login}
          data-ocid="my-skills.signin.button"
          className="gap-2"
        >
          <LogIn size={16} /> Sign In
        </Button>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8 space-y-6"
      data-ocid="my-skills.page"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h2 font-display">My Skills</h1>
          <p className="text-muted-foreground text-sm">
            Skills you've published and shared.
          </p>
        </div>
        <Button asChild data-ocid="my-skills.create.button" className="gap-2">
          <Link to="/create">
            <Mic size={16} /> New Skill
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="my-skills.loading_state"
        >
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : skills && skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.skillId}
              skill={{ ...skill, isUnlocked: true }}
              index={i + 1}
              onSelect={setSelected}
            />
          ))}
        </div>
      ) : (
        <div
          className="py-20 text-center space-y-4"
          data-ocid="my-skills.empty_state"
        >
          <p className="text-4xl">🎙️</p>
          <p className="font-display text-lg font-semibold">
            No skills published yet
          </p>
          <p className="text-muted-foreground text-sm">
            Share your first 10-second skill and start earning credits.
          </p>
          <Button asChild data-ocid="my-skills.empty.create.button">
            <Link to="/create">Publish a Skill</Link>
          </Button>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md" data-ocid="my-skills.detail.dialog">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {selected.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selected.category}</Badge>
                  {selected.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      #{t}
                    </Badge>
                  ))}
                </div>
                <AudioPlayer src={selected.audioUrl} title={selected.title} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
