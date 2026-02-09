---
description: Token-efficient parallel execution mode using lower-tier agents
argument-hint: <task>
---

# Ecomode

> ⚠️ **Soft-deprecated:** Prefer `/omd-ship [task description]` for the primary end-to-end workflow.

[ECOMODE ACTIVATED - TOKEN-EFFICIENT EXECUTION]

Activates token-efficient parallel execution for users who prioritize cost efficiency over maximum capability.

## When to Use Ecomode

- You want to conserve tokens
- Tasks don't require complex reasoning
- You want faster responses (smaller models = lower latency)
- Standard development work: features, bug fixes, refactoring

## How It Differs from Ultrawork

| Aspect | Ecomode | Ultrawork |
|--------|---------|-----------|
| **Default Tier** | LOW | MEDIUM |
| **Fallback Tier** | MEDIUM | HIGH |
| **Token Cost** | Lower | Higher |
| **Best For** | Standard dev work | Complex challenges |

## Agent Routing

| Domain | Ecomode Uses | Ultrawork Uses |
|--------|--------------|----------------|
| Analysis | architect-low | architect |
| Execution | executor-low | executor-high |
| Frontend | designer-low | designer-high |
| Search | explore | explore-medium |

## Task

$ARGUMENTS

## Activation Keywords

- "ecomode", "eco:", "efficient", "budget mode"

Example:
```
eco: fix the login bug
ecomode: refactor the API
```
