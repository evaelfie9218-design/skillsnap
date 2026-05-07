import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useMyCredits,
  useMyProfile,
  useSaveMyProfile,
} from "@/hooks/useBackend";
import { BookOpen, LogIn, Plus, Star, User, X, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { isLoggedIn, login, principal } = useAuth();
  const { data: profile, isLoading } = useMyProfile();
  const { data: credits } = useMyCredits();
  const saveMutation = useSaveMyProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [langInput, setLangInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  if (!isLoggedIn) {
    return (
      <div
        className="max-w-md mx-auto px-4 py-24 text-center space-y-6"
        data-ocid="profile.auth_prompt"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <User size={28} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-h3 font-display">Your Profile</h2>
          <p className="text-muted-foreground text-sm">
            Sign in to view and manage your profile.
          </p>
        </div>
        <Button
          onClick={login}
          data-ocid="profile.signin.button"
          className="gap-2"
        >
          <LogIn size={16} /> Sign In
        </Button>
      </div>
    );
  }

  const startEdit = () => {
    setName(profile?.name ?? "");
    setLanguages(profile?.languages ?? ["English"]);
    setEditing(true);
  };

  const addLang = () => {
    const trimmed = langInput.trim();
    if (trimmed && !languages.includes(trimmed)) {
      setLanguages([...languages, trimmed]);
      setLangInput("");
    }
  };

  const removeLang = (lang: string) =>
    setLanguages(languages.filter((l) => l !== lang));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      await saveMutation.mutateAsync({ name, languages });
      toast.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save profile",
      );
    }
  };

  return (
    <div
      className="max-w-xl mx-auto px-4 py-10 space-y-8"
      data-ocid="profile.page"
    >
      <h1 className="text-h2 font-display">Profile</h1>

      {isLoading ? (
        <div className="space-y-4" data-ocid="profile.loading_state">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Zap,
                label: "Credits",
                value: credits != null ? Number(credits) : "—",
              },
              {
                icon: BookOpen,
                label: "Skills",
                value: profile ? Number(profile.skillCount) : "—",
              },
              {
                icon: Star,
                label: "Rating",
                value: profile ? profile.rating.toFixed(1) : "—",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-xl p-4 text-center space-y-1"
              >
                <Icon size={18} className="mx-auto text-primary" />
                <p className="text-xl font-display font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          {/* Profile info / edit */}
          {editing ? (
            <form
              onSubmit={handleSave}
              className="space-y-5 bg-card border border-border rounded-xl p-6"
              data-ocid="profile.edit_form"
            >
              <h2 className="font-display font-semibold text-lg">
                Edit Profile
              </h2>
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="profile.name.input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add language…"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addLang();
                      }
                    }}
                    data-ocid="profile.language.input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addLang}
                    disabled={!langInput.trim()}
                    data-ocid="profile.language.add_button"
                  >
                    <Plus size={15} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="gap-1">
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLang(lang)}
                        className="ml-1 hover:text-destructive transition-colors"
                        aria-label={`Remove ${lang}`}
                      >
                        <X size={11} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  data-ocid="profile.save.submit_button"
                >
                  {saveMutation.isPending ? "Saving…" : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(false)}
                  data-ocid="profile.edit.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              className="bg-card border border-border rounded-xl p-6 space-y-4"
              data-ocid="profile.info.card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground text-label">
                    Display Name
                  </p>
                  <p className="font-display font-semibold text-lg">
                    {profile?.name ?? "Anonymous"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startEdit}
                  data-ocid="profile.edit.button"
                >
                  Edit
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground text-label">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {(profile?.languages ?? []).length > 0 ? (
                    profile?.languages.map((l) => (
                      <Badge key={l} variant="secondary">
                        {l}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      None set
                    </span>
                  )}
                </div>
              </div>
              {principal && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground text-label">
                    Principal ID
                  </p>
                  <p className="text-xs font-mono text-muted-foreground break-all">
                    {principal}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
