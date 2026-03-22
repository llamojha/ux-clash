---
description: Analyze and document root cause for a GitHub issue
argument-hint: [github-issue-id]
---

# Root Cause Analysis: GitHub Issue #$ARGUMENTS

## Objective

Investigate GitHub issue #$ARGUMENTS, identify the root cause, and document findings.

## Investigation Process

### 1. Fetch Issue Details
```bash
gh issue view $ARGUMENTS
```

### 2. Search Codebase
- Search for components mentioned in issue
- Find related functions, classes, or modules
- Check recent changes to affected areas

### 3. Analyze Root Cause
- What is the actual bug or issue?
- Why is it happening?
- Is this a logic error, edge case, or missing validation?

### 4. Assess Impact
- How widespread is this issue?
- What features are affected?
- Are there workarounds?

### 5. Propose Fix
- What needs to be changed?
- Which files will be modified?
- What testing is needed?

## Output

Save analysis as: `docs/rca/issue-$ARGUMENTS.md`

Include: Issue summary, root cause, affected components, proposed fix, testing requirements.
