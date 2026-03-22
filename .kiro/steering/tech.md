---
inclusion: always
---

# Technical Architecture

## Hosting & Infrastructure
- Deploy on **CubePath** (hackathon requirement)
- Full-stack app (not frontend-only)
- DB self-hosted on same server

## Key Technical Dependencies
- Web-based code editor (HTML + CSS/Tailwind panels)
- Sandbox/renderer for HTML/CSS preview (secure, no JS execution)
- Tailwind CSS runtime in sandbox/preview
- Auth system (simple, connected to leaderboard)
- Self-hosted database
- AI scoring service (rubric-based evaluation)
- Screenshot/snapshot service for share cards

## Submission Sandbox
- Render HTML + CSS in isolated context
- Load Tailwind via CDN/runtime in sandbox
- Block: JavaScript, iframes, external scripts, external requests
- Support both Tailwind classes in HTML and raw CSS in style panel

## Challenge Data Model
Each challenge includes:
- title
- scenario (context/story)
- objective (what to build)
- constraints
- viewport: mobile | desktop | both
- template (optional, only for easy/tutorial challenges)
- type: daily | weekly

## Technology Stack
TODO — To be decided. Likely candidates:
- Frontend: React/Next.js or similar
- Editor: CodeMirror or Monaco
- Backend: Node.js or similar lightweight server
- DB: SQLite/PostgreSQL self-hosted
- AI: OpenAI API or similar for rubric scoring
- Preview: iframe sandbox with Tailwind runtime

## Code Standards
TODO — Will be defined once stack is chosen.

## Testing Strategy
TODO — Will be defined once stack is chosen.
