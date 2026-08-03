# FUNDI

**Artisan services marketplace** — post a job, search artisans, get hired.
Styled as **"The Signboard Wall"**: the entire product is built on the visual
language of Nigerian hand-painted trade signage — the signs signwriters use to
advertise barbershops, tailors, mechanics, and carpenters across Lagos and beyond.

> Design spec: `design/` · Implementation guide: `guide/`
> (both kept out of the repo via `.gitignore`)

## Languages

Selectable locales (flag-less `PCM · HA · YO · IG` pill in the header):

| Code | Language | Notes |
|---|---|---|
| `pcm` | Nigerian Pidgin | Default / fallback locale (brand voice) |
| `ha` | Hausa | Plain Latin orthography (no hooked letters) |
| `yo` | Yoruba | Subdot vowels (ẹ ọ ṣ) |
| `ig` | Igbo | Subdot vowels (ị ọ ụ ṅ) |

- Bundles live in `client/public/locales/{lng}/{ns}.json` and are **lazy-loaded**
  per locale + namespace via `i18next-http-backend` — a Hausa user never
  downloads Yoruba or Igbo strings.
- Detection order: localStorage preference → browser language → `pcm`.
- User-generated content (job titles, offers, reviews, bios) is **never**
  auto-translated — it stays in whatever language the author wrote it.
- **Translation status:** `pcm` is complete; `ha`/`yo`/`ig` are best-effort
  scaffolding and need review by fluent native speakers before shipping.
- Yoruba/Igbo subdot diacritics are missing from Alfa Slab One/Caveat — the
  `Display` component (`src/components/Display.tsx`) auto-falls such strings
  back to the Work Sans/Noto Sans stack.

## Stack

- **client** — React 19 · Vite 8 · TypeScript · Tailwind CSS v4 · React Router ·
  TanStack Query · react-i18next
- **server** — Node.js + Express (API skeleton; DB/Prisma land with Phase 3)
- **fonts** — Alfa Slab One, Caveat, Work Sans (+ Noto Sans diacritic fallback)
- **hosting (target)** — Vercel (frontend) + Railway/Render (API + Postgres)

## Repository structure

```
fundi/
├── client/
│   ├── public/
│   │   ├── locales/            # lazy-loaded i18n bundles ({pcm,ha,yo,ig}/*.json)
│   │   └── favicon.svg
│   └── src/
│       ├── components/         # shared primitives + app-shell components
│       ├── features/           # page-scoped code
│       │   └── landing/        #   landing page + its components
│       ├── lib/                # i18n, theme/tilt helpers, cx, diacritics
│       └── index.css           # design tokens + signboard component styles
├── server/
│   └── src/                    # Express API (health check)
└── package.json                # pnpm workspace root
```

### Component convention

- `components/` holds **shared** components — used by more than one consumer —
  plus app-shell components (`Header`, `BottomNav`, `LanguageSwitcher`) and
  generic primitives (`Panel`, `Button`, `StatusStamp`, `Display`, icons).
- `features/<name>/` holds **page-scoped** components, e.g.
  `features/landing/components/CategoryTile.tsx`. A component used by exactly
  one feature lives here and is promoted to `components/` when a second
  consumer appears.

## Design system in 30 seconds

Ink-black borders, hard offset drop-shadows (no blur), a fixed rotation scale
(`-2deg … +1.6deg`), flat saturated signboard colors, two registers
(**Street** = full tilt/personality · **Workshop** = flattened, dense). Every
status/reputation stamp pairs color with a text label; focus rings stay
visible; `prefers-reduced-motion` is respected.

## Running

```sh
pnpm install
pnpm dev           # client  → http://localhost:5173
pnpm dev:server    # API     → http://localhost:4000/api/v1/health
```

```sh
pnpm build         # type-check + production build
pnpm lint
```
