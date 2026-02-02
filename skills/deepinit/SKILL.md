---
name: deepinit
description: Use when user needs deep codebase initialization with hierarchical AGENTS.md documentation
---

# Deep Init Skill

Creates comprehensive, hierarchical AGENTS.md documentation across the entire codebase.

## Core Concept

AGENTS.md files serve as **AI-readable documentation** that helps agents understand:
- What each directory contains
- How components relate to each other
- Special instructions for working in that area
- Dependencies and relationships

## Hierarchical Structure

```
/AGENTS.md                          ← Root (no parent tag)
├── src/AGENTS.md                   ← <!-- Parent: ../AGENTS.md -->
│   ├── src/components/AGENTS.md    ← <!-- Parent: ../AGENTS.md -->
│   └── src/utils/AGENTS.md         ← <!-- Parent: ../AGENTS.md -->
└── docs/AGENTS.md                  ← <!-- Parent: ../AGENTS.md -->
```

## AGENTS.md Template

Each file includes:
- Parent reference tag
- Purpose description
- Key files table
- Subdirectories table
- AI agent instructions
- Testing requirements
- Dependencies (internal/external)

## Execution Workflow

1. **Map** directory structure (exclude node_modules, .git, dist)
2. **Plan** work by depth level (parents before children)
3. **Generate** AGENTS.md for each directory
4. **Validate** hierarchy (parent refs resolve, no orphans)

## Smart Delegation

| Task | Agent |
|------|-------|
| Directory mapping | explore |
| File analysis | architect-low |
| Content generation | writer |
| Multi-file writes | executor |

## Parallelization

- Same-level directories: Process in parallel
- Different levels: Sequential (parent first)
- Large directories: Dedicated agent per directory
