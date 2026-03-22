---
description: Create a Product Requirements Document from conversation
argument-hint: [output-filename]
---

# Create PRD

Generate a comprehensive Product Requirements Document based on conversation context.

## Output File
Write the PRD to: `$ARGUMENTS` (default: `PRD.md`)

## Required Sections

1. **Executive Summary** — Product overview, core value proposition
2. **Mission** — Mission statement, core principles
3. **Target Users** — Personas, needs, pain points
4. **MVP Scope** — In scope (✅) and out of scope (❌)
5. **User Stories** — 5-8 stories in "As a... I want... So that..." format
6. **Architecture** — High-level approach, directory structure, patterns
7. **Features** — Detailed feature specifications
8. **Technology Stack** — Languages, frameworks, dependencies
9. **Security & Configuration** — Auth, env vars, deployment
10. **Success Criteria** — Measurable criteria with checkboxes
11. **Implementation Phases** — 3-4 phases with deliverables
12. **Risks & Mitigations** — Key risks with strategies

## Instructions
1. Extract requirements from conversation history
2. Synthesize into appropriate sections
3. Fill in reasonable assumptions where details are missing
4. Use markdown formatting extensively
5. Confirm file path and highlight any assumptions made
