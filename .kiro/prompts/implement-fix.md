---
description: Implement fix from RCA document for GitHub issue
argument-hint: [github-issue-id]
---

# Implement Fix: GitHub Issue #$ARGUMENTS

## Prerequisites
- RCA document exists at `docs/rca/issue-$ARGUMENTS.md`

## Process

### 1. Read RCA Document
Read `docs/rca/issue-$ARGUMENTS.md` thoroughly.

### 2. Implement the Fix
Following the "Proposed Fix" section:
- Make changes as described in RCA
- Maintain code style and conventions
- Add comments if the fix is non-obvious

### 3. Add/Update Tests
- Verify the fix resolves the issue
- Test edge cases related to the bug
- Ensure no regression

### 4. Run Validation
Execute validation commands from RCA.

### 5. Output Report
- Files modified with change descriptions
- Tests added
- Validation results
- Suggested commit message with `Fixes #$ARGUMENTS`
