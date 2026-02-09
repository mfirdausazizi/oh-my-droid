---
name: ralplan
description: Use when user needs iterative planning with Planner, Architect, and Critic until consensus is reached
---

# Ralplan Skill

[RALPLAN ACTIVATED - ITERATIVE PLANNING CONSENSUS MODE]

Orchestrates three specialized agents—Planner, Architect, and Critic—in an iterative loop until consensus is reached.

## The Planning Triad

| Agent | Role | Output |
|-------|------|--------|
| **Planner** | Strategic Planner | Creates/refines the work plan |
| **Architect** | Strategic Advisor | Answers questions, validates architecture |
| **Critic** | Ruthless Reviewer | Critiques and identifies gaps |

## The Iteration Loop

```
PLANNER ──► ARCHITECT (if questions) ──►
    │
    ▼
 CRITIC ──► REJECT? ──► Back to PLANNER
    │
    ▼ OKAY
PLAN APPROVED
```

## Iteration Rules

| Rule | Description |
|------|-------------|
| **Max 5 iterations** | Safety limit |
| **Planner owns plan** | Only Planner writes to plan file |
| **Architect provides wisdom** | Reads and advises, never modifies |
| **Critic has final say** | Plan approved only when Critic signals OKAY |

## Quality Gates

1. Plan file exists
2. File references are valid
3. Acceptance criteria are concrete
4. No ambiguous language

## State Management

Track state in `.omd/ralplan-state.json`:
```json
{
  "active": true,
  "iteration": 1,
  "max_iterations": 5,
  "plan_path": ".omd/plans/[feature].md",
  "current_phase": "planner_planning"
}
```

## User Confirmation Gate

After the Critic approves the plan (or max iterations reached):

1. **Save the plan** to `.omd/plans/[feature-name].md` immediately
2. **Present the plan** to the user with a concise summary
3. **Use the AskUser tool** to get explicit confirmation before handing off to execution:

```
1. [question] The plan is saved to .omd/plans/[feature-name].md. How should we proceed?
[topic] Plan-Approval
[option] Approve and proceed to execution
[option] Revise the plan (provide feedback)
[option] Cancel
```

4. If the user requests revisions, incorporate feedback and re-run the Critic loop
5. Only proceed to the next workflow stage after explicit user approval

**CRITICAL**: Never skip the AskUser confirmation. The user must approve the saved plan before any execution begins.

## Output

Plan saved to `.omd/plans/[feature-name].md` ready for `/omd-ralph` execution.
