# Prime: Load Project Context

## Objective
Build comprehensive understanding of the codebase by analyzing structure, documentation, and key files.

## Process

### 1. Analyze Project Structure
```bash
git ls-files
tree -L 3 -I 'node_modules|__pycache__|.git|dist|build'
```

### 2. Read Core Documentation
- Read README files at project root and major directories
- Read any architecture documentation
- Review steering documents for project context

### 3. Identify Key Files
Based on the structure, identify and read:
- Main entry points
- Core configuration files
- Key model/schema definitions
- Important service or controller files

### 4. Understand Current State
```bash
git log -10 --oneline
git status
```

## Output Report
Provide a concise summary covering:

### Project Overview
- Purpose and type of application
- Primary technologies and frameworks

### Architecture
- Overall structure and organization
- Key architectural patterns
- Important directories and their purposes

### Tech Stack
- Languages and versions
- Frameworks and major libraries
- Build tools and package managers

### Current State
- Active branch
- Recent changes or development focus
- Any immediate observations or concerns
