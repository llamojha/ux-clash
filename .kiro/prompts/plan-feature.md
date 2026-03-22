---
description: "Create comprehensive feature plan with codebase analysis and research"
---

# Plan a new task

## Feature: $ARGUMENTS

## Mission

Transform a feature request into a comprehensive implementation plan through systematic codebase analysis, external research, and strategic planning.

**Core Principle**: We do NOT write code in this phase. We create a context-rich plan that enables one-pass implementation success.

## Planning Process

### Phase 1: Feature Understanding
- Extract the core problem being solved
- Identify user value and business impact
- Determine feature type and complexity
- Create user story format

### Phase 2: Codebase Intelligence
- Map directory structure and architectural patterns
- Search for similar implementations in codebase
- Identify coding conventions and patterns
- Catalog relevant external libraries
- Identify test framework and patterns
- Map integration points and files to modify

### Phase 3: External Research
- Research latest library versions and best practices
- Find official documentation with specific sections
- Identify common gotchas and known issues

### Phase 4: Strategic Thinking
- How does this fit into existing architecture?
- What are critical dependencies and order of operations?
- What could go wrong? (edge cases, errors)
- How will this be tested?

### Phase 5: Plan Generation

Output to: `.agents/plans/{kebab-case-name}.md`

Include:
- Feature description and user story
- Context references (files to read, docs, patterns)
- Implementation phases with tasks
- Step-by-step tasks with validation commands
- Testing strategy
- Acceptance criteria and completion checklist

## Quality Criteria
- [ ] All necessary patterns identified and documented
- [ ] Tasks ordered by dependency
- [ ] Each task is atomic and independently testable
- [ ] Every task has executable validation command
- [ ] Another developer could execute without additional context
