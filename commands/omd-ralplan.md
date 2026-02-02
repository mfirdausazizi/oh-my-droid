---
description: Iterative planning with Planner, Architect, and Critic until consensus
argument-hint: <task-to-plan>
---

# Ralplan Command

[RALPLAN ACTIVATED - ITERATIVE PLANNING CONSENSUS MODE]

Orchestrates three specialized agents—Planner, Architect, and Critic—in an iterative loop until consensus is reached on a comprehensive work plan.

## The Planning Triad

| Agent | Role | Output |
|-------|------|--------|
| **Planner** | Strategic Planner | Creates/refines the work plan |
| **Architect** | Strategic Advisor | Answers questions, validates architecture |
| **Critic** | Ruthless Reviewer | Critiques and identifies gaps |

## Task

$ARGUMENTS

## The Iteration Loop

```
┌─────────────────────────────────────────────┐
│              RALPLAN LOOP                   │
│                                             │
│  PLANNER ──► ARCHITECT (if questions) ──►  │
│      │                                      │
│      ▼                                      │
│   CRITIC ──► REJECT? ──► Back to PLANNER   │
│      │                                      │
│      ▼ OKAY                                 │
│  PLAN APPROVED                              │
└─────────────────────────────────────────────┘
```

## Iteration Rules

| Rule | Description |
|------|-------------|
| **Max 5 iterations** | Safety limit prevents infinite loops |
| **Planner owns plan** | Only Planner writes to plan file |
| **Architect provides wisdom** | Reads and advises, never modifies |
| **Critic has final say** | Plan approved only when Critic signals OKAY |

## Quality Gates

1. Plan file exists
2. File references are valid
3. Acceptance criteria are concrete
4. No ambiguous language

## Output

Plan saved to `.omd/plans/[feature-name].md` ready for `/omd-ralph` execution.
