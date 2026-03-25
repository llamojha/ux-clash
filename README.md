# ⚡ UX Clash

**La arena competitiva de UX/UI en código.**

Diseña interfaces con HTML + Tailwind para retos reales, compite en un leaderboard con scoring social y demuestra tu criterio de diseño.

🔗 **Demo:** [ux-clash.amllamojha.com](https://ux-clash.amllamojha.com/)

---

## ¿Qué es UX Clash?

UX Clash es una plataforma donde diseñadores y developers frontend resuelven retos de interfaz usando HTML + CSS/Tailwind en un editor en vivo. Cada reto tiene un escenario real (login de app, pricing page, dashboard…) y los participantes compiten por likes en un leaderboard público.

### Core Loop

1. Elige un reto (diario o semanal)
2. Abre el editor con preview en tiempo real
3. Escribe HTML + CSS/Tailwind
4. Envía tu solución
5. Recibe likes de la comunidad
6. Sube en el leaderboard

## Screenshots

<!-- TODO: Add screenshots/GIFs -->
> Screenshots coming soon. The app is live at [ux-clash.amllamojha.com](https://ux-clash.amllamojha.com/)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript (strict) |
| UI | shadcn/ui + Tailwind CSS v4 |
| Editor | Monaco Editor |
| Auth + DB | Supabase (PostgreSQL + GitHub OAuth) |
| Runtime | Bun |
| Deploy | CubePath VPS + Dokploy |

## CubePath

UX Clash is deployed on a **CubePath VPS** using [Dokploy](https://dokploy.com/) for Git-based auto-deploy:

- Docker image built with `oven/bun` (multi-stage: deps → build → run)
- Next.js standalone output for minimal image size
- Supabase Cloud for managed PostgreSQL + Auth
- Auto-deploy on push to `main` via Dokploy's GitHub integration

## Development

```bash
# Clone
git clone https://github.com/amllamojha/ux-clash.git
cd ux-clash

# Install
bun install

# Environment variables
cp .env.example .env.local
# Fill in:
#   NEXT_PUBLIC_SUPABASE_URL=
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Run
bun dev
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages + API routes
│   ├── api/          # Submissions, likes
│   ├── challenge/    # Challenge detail
│   ├── challenges/   # Challenge list
│   ├── editor/       # Code editor arena
│   ├── leaderboard/  # Global leaderboard
│   └── submission/   # Public submission page
├── components/       # React components (shadcn/ui + custom)
└── lib/              # Supabase clients, utils, sanitization
```

## Docs

- [Roadmap](docs/roadmap.md) — MVP phases and timeline
- [PRD](docs/prd.md) — Product requirements
- [Design](docs/design.md) — UX principles and visual style
- [Hackathon Rules](docs/hackathon.md) — CubePath 2026 hackathon rules

## License

MIT
