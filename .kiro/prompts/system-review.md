---
description: Analyze implementation against plan for process improvements
---

# System Review

Analyze how well implementation followed the plan and identify process improvements.

**This is NOT code review.** You're looking for bugs in the process, not the code.

## Inputs
- Plan file: $1
- Execution report: $2

## Analysis

### 1. Classify Each Divergence
- **Good ✅**: Plan assumed wrong thing, better pattern found, security fix needed
- **Bad ❌**: Ignored constraints, took shortcuts, misunderstood requirements

### 2. Trace Root Causes
- Was the plan unclear?
- Was context missing?
- Was validation missing?

### 3. Generate Improvements
- Steering document updates
- Plan command updates
- New commands to automate manual processes
- Validation additions

## Output
Save to: `.agents/system-reviews/[feature-name]-review.md`

Include: Alignment score (/10), divergence analysis, pattern compliance, improvement actions, key learnings.
