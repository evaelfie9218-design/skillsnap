# Design Brief

## Direction

SkillSnap — A bold, energetic 10-second audio skill marketplace where creators shine and learners discover focused micro-lessons.

## Tone

Confident and high-energy with dark theme focus — minimalist, modern SaaS aesthetic that prioritizes creator recognition and marketplace discovery.

## Differentiation

Audio-first identity with electric teal accent (representing waveforms) paired with warm amber secondary for achievements, creating a distinctive creator-centric brand.

## Color Palette

| Token      | Light OKLCH | Dark OKLCH      | Role                           |
| ---------- | ----------- | --------------- | ------------------------------ |
| background | 0.98 0 255  | 0.145 0.012 255 | Page background                |
| foreground | 0.18 0.012  | 0.93 0.008 255  | Primary text                   |
| card       | 1.0 0 0     | 0.19 0.015 255  | Card/surface backgrounds       |
| primary    | 0.52 0.22   | 0.65 0.24 195   | Teal/cyan for CTAs & focus     |
| secondary  | 0.68 0.18 30| 0.72 0.18 50    | Warm amber for earnings/badges |
| accent     | 0.6 0.2 195 | 0.72 0.2 85     | Teal for accents               |
| muted      | 0.94 0 255  | 0.25 0.015 255  | Disabled, muted states         |

## Typography

- Display: Space Grotesk — geometric, bold, futuristic (headlines, hero text)
- Body: DM Sans — clean, readable at all sizes (body copy, labels, UI)
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl font-bold`, h3 `text-h3`, body `text-sm-body`

## Elevation & Depth

Minimal shadow hierarchy: `shadow-subtle` for hover states (2px offset, 6px blur), `shadow-elevated` for modals/popovers (8px offset, 24px blur). No decorative blur or glassmorphism.

## Structural Zones

| Zone    | Background            | Border                    | Notes                              |
| ------- | --------------------- | ------------------------- | ---------------------------------- |
| Header  | `bg-card` with border | `border-b border-border`  | Navigation, branding, user menu    |
| Content | `bg-background`       | —                         | Main grid/list alternates with bg  |
| Card    | `bg-card` rounded-lg  | `border border-border`    | Skills, creators, leaderboard rows |
| Footer  | `bg-muted/30`         | `border-t border-border`  | Links, credits                     |

## Spacing & Rhythm

Spacious (16px+ gaps between sections), mobile-first responsive. Compact density inside cards (8–12px padding), open breathing room between major sections. Consistent 12px rounded corners for all interactive surfaces.

## Component Patterns

- Buttons: Primary (teal bg, white text, rounded-lg, hover shadow-elevated), Secondary (muted bg, foreground text, hover state)
- Cards: Rounded-lg, border, light shadow, hover lift (transform translate-y, transition-smooth)
- Badges: Small uppercase labels (category, language), muted bg, secondary text, rounded-full
- Skill cards: Title, creator, rating (stars), play icon, unlock/play button state (locked = primary, unlocked = accent)

## Motion

- Entrance: `fade-in 0.5s ease-out` on page load and modal opens
- Hover: `transition-smooth` for all interactive elements; buttons lift via `translate-y -1` on hover
- Decorative: Subtle `float 3s ease-in-out` on hero elements, `pulse 2s` on live indicators

## Constraints

- No full-page gradients or decorative backgrounds — composition-driven depth only
- All colors OKLCH-only, no hex or rgb fallbacks
- Rounded corners strictly 0px (sharp), 6px (subtle), 12px (standard), 24px (pill buttons/avatars)
- Typography hierarchy via size + weight, never just color
- Accessibility: AA+ contrast on all text, clear focus states with ring color, disabled state opacity 50%

## Signature Detail

Electric teal waveform accent used sparingly on CTAs and creator badges — represents audio essence of the marketplace without visual clutter.
