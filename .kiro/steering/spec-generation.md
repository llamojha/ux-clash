---
inclusion: manual
---

# Spec Generation Guide

## Quick Start

To generate a spec, use this prompt:

```
Create a new spec for "[FEATURE_NAME]" for ux-clash.

Use the product context at #[[file:.kiro/steering/product.md]] and the architecture at #[[file:.kiro/steering/architecture.md]] for guidance.

Generate three files in .kiro/specs/[feature-slug]/:
1. requirements.md - User story and acceptance criteria
2. design.md - Technical approach and component design
3. tasks.md - Implementation checklist
```

## Spec Structure

```
.kiro/specs/[feature-name]/
├── requirements.md   # What to build (user story, acceptance criteria)
├── design.md         # How to build it (technical approach, components)
└── tasks.md          # Step-by-step implementation checklist
```

## Tips

- Keep specs small — one feature per spec
- Review generated specs before implementing
- Update steering files as patterns emerge
- Reference existing code with `#[[file:path/to/file]]`
