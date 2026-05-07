import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export function AudioPlayer({ src, title, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleSeekKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    if (e.key === "ArrowRight")
      audio.currentTime = Math.min(audio.currentTime + 1, audio.duration);
    if (e.key === "ArrowLeft")
      audio.currentTime = Math.max(audio.currentTime - 1, 0);
  };

  const formatTime = (s: number) => {
    if (Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-muted/40 border border-border px-4 py-3",
        className,
      )}
      data-ocid="audio_player.panel"
    >
      <audio ref={audioRef} src={src} preload="metadata">
        <track kind="captions" />
      </audio>

      <Button
        type="button"
        size="icon"
        variant="default"
        onClick={togglePlay}
        data-ocid="audio_player.play_button"
        aria-label={isPlaying ? "Pause" : "Play"}
        className="shrink-0 w-9 h-9 rounded-full"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>

      <div className="flex-1 min-w-0 space-y-1">
        {title && (
          <p className="text-xs font-medium text-foreground truncate">
            {title}
          </p>
        )}
        {/* Seek bar */}
        <div
          className="relative h-2 rounded-full bg-border cursor-pointer overflow-hidden"
          onClick={handleSeek}
          onKeyDown={handleSeekKey}
          data-ocid="audio_player.progress_bar"
          role="progressbar"
          tabIndex={0}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={toggleMute}
        data-ocid="audio_player.mute_button"
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="shrink-0 w-8 h-8"
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </Button>
    </div>
  );
}
