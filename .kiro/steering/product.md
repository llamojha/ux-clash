---
inclusion: always
---

# Product Overview

## One-line Pitch
UX Clash es una arena competitiva donde creas interfaces con HTML y Tailwind para retos reales, y compites en un leaderboard con scoring de IA y validación social.

## Mission
Convertir la práctica de UI/UX en una competición creativa, pública y útil, donde el talento se demuestra construyendo interfaces reales bajo retos claros.

## Vision
Ser la plataforma de referencia para practicar, medir y exhibir criterio de diseño de interfaces a través de retos competitivos de código y UX/UI.

## Target Users
- Devs frontend
- Diseñadores junior/mid
- Estudiantes de producto/diseño

## Job to be Done
"Quiero practicar diseño de interfaces en contextos realistas, ver cómo se compara mi trabajo con otros y ganar visibilidad/ranking."

## Core Loop
1. Ver reto (daily/weekly)
2. Abrir editor
3. Escribir HTML + CSS/Tailwind
4. Preview en tiempo real
5. Submit
6. Score IA + score social
7. Leaderboard
8. Compartir entry

## MVP Scope

### In Scope
- 10 retos manuales (daily + weekly)
- Editor: HTML panel + CSS/Tailwind panel + preview
- Retos mobile, desktop, o ambos
- Login para submit y social
- Explorar sin login
- Leaderboard por reto
- Scoring: 50% IA (rúbrica) + 50% social (likes)
- Página de entry shareable con share card
- Histórico básico de submissions por usuario
- Plantillas solo en retos fáciles/tutoriales
- Weekly sin plantilla

### Out of Scope (MVP)
- JavaScript en submissions
- Drag and drop / visual builder
- Moderación manual
- Categorías de dificultad
- Sistema social complejo (A/B voting, etc.)
- Tiempo real / time limits
- Leaderboard global (solo por reto en MVP)

## Scoring System
- 50% IA con rúbrica (6 criterios)
- 50% señal social (likes)

### IA Rubric
1. Claridad
2. Jerarquía visual
3. Cumplimiento del reto
4. Usabilidad
5. Accesibilidad básica
6. Calidad visual/profesional

### IA Output
- Nota total + nota por criterio
- 2 fortalezas, 2 debilidades
- 1 mejora concreta

## Auth Model
- Explorar sin login
- Abrir editor sin login
- Submit requiere login
- Social (likes) requiere login
- Perfil mínimo: username, avatar opcional, submissions, score/ranking

## Submission Rules
- Permitido: HTML, CSS, Tailwind
- Bloqueado: JavaScript, scripts externos, imports inseguros, requests externas
- Tailwind via runtime en sandbox
- Submissions vacías/rotas se publican — IA las penaliza, social las hunde
- Sin moderación en MVP

## Success Metrics
- Submissions por reto
- % apertura editor → submit
- Likes por submission
- Shares por submission
- Retención a siguiente reto
- Usuarios con más de una submission

## Risks
- Likes como señal social poco fiable
- IA inconsistente
- Sandbox/render problemático
- Retos flojos → submissions flojas
- Sin moderación puede haber basura visible

## Design Principles
- Claridad primero
- Menos fricción
- Feedback inmediato
- Competición visible
- Resultado compartible

## Hackathon Context
- **Event:** Hackatón CubePath 2026 — https://github.com/midudev/hackaton-cubepath-2026
- **Deadline:** 31 March 2026, 23:59:59 CET
- **Evaluation criteria (by importance):** UX > Creativity > Utility > Technical implementation
- **Requirements:** Deploy on CubePath, public repo, README with demo link + screenshots/GIFs + CubePath explanation, register via issue
- **Full rules:** see `docs/hackathon.md`

## Visual Style
- Oscuro, limpio, técnico
- Estética de arena/scoreboard
- Tipografía fuerte y legible
- Contraste alto
- Énfasis en preview y ranking
