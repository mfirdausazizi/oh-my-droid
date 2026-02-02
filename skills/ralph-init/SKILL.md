---
name: ralph-init
description: Use when user wants to initialize a PRD for structured ralph-loop execution
---

# Ralph Init Skill

Create a PRD (Product Requirements Document) that structures your task into discrete user stories for ralph-loop execution.

## PRD Structure

Creates `.omd/prd.json`:

```json
{
  "project": "[Project Name]",
  "branchName": "ralph/[feature-name]",
  "description": "[Feature description]",
  "userStories": [
    {
      "id": "US-001",
      "title": "[Short title]",
      "description": "As a [user], I want to [action] so that [benefit].",
      "acceptanceCriteria": ["Criterion 1", "Typecheck passes"],
      "priority": 1,
      "passes": false
    }
  ]
}
```

## Guidelines

1. **Right-sized stories**: Each completable in one focused session
2. **Verifiable criteria**: Include "Typecheck passes", "Tests pass"
3. **Independent stories**: Minimize dependencies between stories
4. **Priority order**: Foundational work (DB, types) before UI

## Progress Tracking

Also creates `.omd/progress.txt`:

```
# Ralph Progress Log
Started: [ISO timestamp]

## Codebase Patterns
(No patterns discovered yet)

---
```

## Output

After creating files:
- `.omd/prd.json` - The PRD
- `.omd/progress.txt` - Progress log

Then suggest running `/omd-ralph` to start execution.
