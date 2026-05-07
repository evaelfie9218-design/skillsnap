import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useCreateSkill } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, LogIn, Mic, Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Cooking",
  "Productivity",
  "Language",
  "Finance",
  "Fitness",
  "Tech",
  "Creativity",
  "Other",
];

export default function CreatePage() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const createSkill = useCreateSkill();

  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadDone, setUploadDone] = useState(false);
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoggedIn) {
    return (
      <div
        className="max-w-md mx-auto px-4 py-24 text-center space-y-6"
        data-ocid="create.auth_prompt"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Mic size={28} className="text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-h3 font-display">Share Your Skills</h2>
          <p className="text-muted-foreground text-sm">
            Sign in to record and share your 10-second skill tips.
          </p>
        </div>
        <Button
          onClick={login}
          data-ocid="create.signin.button"
          className="gap-2"
        >
          <LogIn size={16} /> Sign In to Create
        </Button>
      </div>
    );
  }

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed) && tags.length < 5) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      toast.error("Please select an audio file.");
      return;
    }

    // Validate duration ≤ 10 seconds
    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio(objectUrl);
    const duration = await new Promise<number>((resolve) => {
      audio.addEventListener("loadedmetadata", () => resolve(audio.duration));
      audio.addEventListener("error", () => resolve(0));
    });
    URL.revokeObjectURL(objectUrl);

    if (duration > 10) {
      toast.error("Audio must be 10 seconds or less.");
      return;
    }

    setAudioFile(file);
    setUploadDone(false);
    setUploadProgress(null);
    setAudioUrl("");

    // Convert to base64 data URL for backend storage
    try {
      setUploadProgress(0);
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onprogress = (evt) => {
          if (evt.lengthComputable) {
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
          }
        };
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
      setAudioUrl(dataUrl);
      setUploadDone(true);
      setUploadProgress(null);
      toast.success("Audio ready to publish!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      setAudioFile(null);
      setUploadProgress(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !audioUrl || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!uploadDone) {
      toast.error("Please upload an audio file first.");
      return;
    }
    try {
      await createSkill.mutateAsync({ title, audioUrl, category, tags });
      toast.success("Skill published! 🎉");
      navigate({ to: "/my-skills" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create skill",
      );
    }
  };

  return (
    <div
      className="max-w-xl mx-auto px-4 py-10 space-y-8"
      data-ocid="create.page"
    >
      <div className="space-y-1">
        <h1 className="text-h2 font-display">Share a Skill</h1>
        <p className="text-muted-foreground text-sm">
          Record a 10-second audio tip and earn credits when others unlock it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="skill-title">Title *</Label>
          <Input
            id="skill-title"
            placeholder="e.g. 'How to soft-boil a perfect egg'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid="create.title.input"
            required
          />
        </div>

        {/* Audio Upload */}
        <div className="space-y-2">
          <Label>
            Audio File *{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (≤ 10 seconds)
            </span>
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="create.audio_file.input"
          />
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-8 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-smooth w-full"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload audio file"
            data-ocid="create.audio.dropzone"
          >
            {uploadDone && audioFile ? (
              <>
                <CheckCircle2 size={28} className="text-primary" />
                <div className="text-center">
                  <p className="font-medium text-sm">{audioFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Uploaded successfully — click to replace
                  </p>
                </div>
              </>
            ) : audioFile && uploadProgress !== null ? (
              <>
                <Upload
                  size={28}
                  className="text-muted-foreground animate-pulse"
                />
                <div className="w-full space-y-1">
                  <p className="text-sm text-center">{audioFile.name}</p>
                  <Progress value={uploadProgress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground text-center">
                    {uploadProgress}%
                  </p>
                </div>
              </>
            ) : (
              <>
                <Mic size={28} className="text-muted-foreground" />
                <div className="text-center">
                  <p className="font-medium text-sm">Click to select audio</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    MP3, AAC, OGG — max 10 seconds
                  </p>
                </div>
              </>
            )}
          </button>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger data-ocid="create.category.select">
              <SelectValue placeholder="Pick a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags (optional, up to 5)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag…"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              data-ocid="create.tag.input"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addTag}
              disabled={!tagInput.trim() || tags.length >= 5}
              data-ocid="create.tag.add_button"
            >
              <Plus size={16} />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive transition-colors"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X size={11} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={
            createSkill.isPending || !uploadDone || uploadProgress !== null
          }
          data-ocid="create.submit_button"
          className="w-full gap-2"
          size="lg"
        >
          <Mic size={16} />
          {createSkill.isPending ? "Publishing…" : "Publish Skill"}
        </Button>
      </form>
    </div>
  );
}
