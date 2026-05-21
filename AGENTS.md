# AGENTS.md — vecchio (DSG Portale)

Guidance for agents working in this repository. Prefer these facts over re-deriving from scratch.

## Workspace

- **Monorepo** with main app at `apps/web` (Next.js App Router, port **3001** via `bun run dev:web`).
- Product is **DSG Portale** — Italian notary document portal demo (mock data, no real backend for most flows).
- Shared UI lives under `apps/web/src/components/dataweb/` and tokens in `apps/web/src/index.css` (`--dsg-*`, `.dsg-card`, `dsg-app-shell`).

## Information architecture (legacy-aligned)

- **Fascicoli Notarili** and **Successioni** are **separate routes**, not tabs or hash on one page:
  - `/fascicoli` — repertorio, raccolta, data atto, anagrafica parti; results use **Mostra** → detail
  - `/successioni` — data atto + anagrafica parti only; own detail routes under `/successioni/[id]`
- Sidebar sections:
  - **Navigazione:** Dashboard (`/`), Richiesta fascicoli (`/richiesta-fascicoli`)
  - **Elenco documenti:** Fascicoli Notarili (`/fascicoli`), Successioni (`/successioni`)
- User block belongs in the **sidebar footer** (above Logout), not the top bar. **No notifications** control in the header.

## Visual / UX conventions

- **Light mode only** for the portale: `forcedTheme="light"`, `color-scheme: light` — do not add dark-mode variants or theme toggles for this app.
- Visual language: deep blue sidebar, light gray canvas, white cards, blue primary actions — keep new pages on `DsgCard` / `dsg-ui` helpers, not glass/blur panels.
- When the user supplies **reference images** or **Agentation** feedback, treat them as the source of truth and match layout/copy closely.
- User often attaches **`image-to-code`** for visual work: analyze reference first, then implement faithfully (avoid generic dashboard drift).

## Git / workflow

- **Do not create git commits** unless the user explicitly asks.

## Do not store here

- Secrets (`.env`, API keys).
- One-off Agentation coordinates or single-session tweak details.
- Unrelated projects mentioned in transcripts (e.g. other apps’ `/tv/` routes).
