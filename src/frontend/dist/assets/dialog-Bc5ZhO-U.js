import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as Button, g as cn, B as Badge, U as User, N as Root, O as Content, Q as Close, X, T as Title, V as Portal, W as Overlay } from "./index-l4XOU5JU.js";
import { S as Star } from "./star-CDXf6tOb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
function AudioPlayer({ src, title, className }) {
  const audioRef = reactExports.useRef(null);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration * 100);
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
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };
  const handleSeekKey = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    if (e.key === "ArrowRight")
      audio.currentTime = Math.min(audio.currentTime + 1, audio.duration);
    if (e.key === "ArrowLeft")
      audio.currentTime = Math.max(audio.currentTime - 1, 0);
  };
  const formatTime = (s) => {
    if (Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 rounded-xl bg-muted/40 border border-border px-4 py-3",
        className
      ),
      "data-ocid": "audio_player.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src, preload: "metadata", children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "default",
            onClick: togglePlay,
            "data-ocid": "audio_player.play_button",
            "aria-label": isPlaying ? "Pause" : "Play",
            className: "shrink-0 w-9 h-9 rounded-full",
            children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative h-2 rounded-full bg-border cursor-pointer overflow-hidden",
              onClick: handleSeek,
              onKeyDown: handleSeekKey,
              "data-ocid": "audio_player.progress_bar",
              role: "progressbar",
              tabIndex: 0,
              "aria-valuenow": progress,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-150",
                  style: { width: `${progress}%` }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(progress / 100 * duration) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(duration) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "ghost",
            onClick: toggleMute,
            "data-ocid": "audio_player.mute_button",
            "aria-label": isMuted ? "Unmute" : "Mute",
            className: "shrink-0 w-8 h-8",
            children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 15 })
          }
        )
      ]
    }
  );
}
const sizeMap = {
  sm: 14,
  md: 18,
  lg: 22
};
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  max = 5
}) {
  const [hovered, setHovered] = reactExports.useState(null);
  const px = sizeMap[size];
  const display = hovered !== null ? hovered : value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-0.5",
      role: readonly ? void 0 : "radiogroup",
      "aria-label": readonly ? `Rating: ${value} out of ${max}` : "Rate this skill",
      "data-ocid": readonly ? void 0 : "star_rating.input",
      children: [
        Array.from({ length: max }).map((_, i) => {
          const starVal = i + 1;
          const filled = starVal <= display;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: readonly ? void 0 : "radio",
              "aria-checked": readonly ? void 0 : starVal === Math.round(value),
              "aria-label": readonly ? void 0 : `${starVal} star`,
              disabled: readonly,
              onClick: () => !readonly && (onChange == null ? void 0 : onChange(starVal)),
              onMouseEnter: () => !readonly && setHovered(starVal),
              onMouseLeave: () => !readonly && setHovered(null),
              className: cn(
                "transition-colors duration-150",
                readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  size: px,
                  className: cn(
                    "transition-colors duration-150",
                    filled ? "fill-secondary text-secondary" : "fill-none text-muted-foreground/40"
                  )
                }
              )
            },
            starVal
          );
        }),
        !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-muted-foreground tabular-nums", children: hovered ?? (value > 0 ? value.toFixed(1) : "—") })
      ]
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
function SkillCard({
  skill,
  onUnlock,
  onSelect,
  isUnlocking,
  index = 1
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `skill.card.item.${index}`,
      className: "group flex flex-col bg-card border-border hover:border-primary/40 transition-smooth cursor-pointer overflow-hidden",
      onClick: () => onSelect == null ? void 0 : onSelect(skill),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-primary/60 group-hover:bg-primary transition-smooth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs font-medium truncate max-w-[120px]",
                children: skill.category
              }
            ),
            skill.isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 12 }),
              " Unlocked"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
              " 1 credit"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm leading-snug line-clamp-2 text-foreground", children: skill.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: skill.creatorName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              Number(skill.durationSeconds),
              "s"
            ] })
          ] }),
          skill.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: skill.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground",
              children: [
                "#",
                tag
              ]
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "px-4 pb-4 pt-0 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: skill.rating, readonly: true, size: "sm" }),
          !skill.isUnlocked && onUnlock && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "default",
              "data-ocid": `skill.unlock_button.${index}`,
              disabled: isUnlocking,
              onClick: (e) => {
                e.stopPropagation();
                onUnlock(skill.skillId);
              },
              className: "text-xs h-7 px-3 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 11 }),
                "Unlock"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
export {
  AudioPlayer as A,
  Dialog as D,
  SkillCard as S,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  StarRating as d
};
