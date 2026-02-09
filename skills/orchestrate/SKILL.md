---
name: orchestrate
description: Use when user needs intelligent task routing and multi-agent orchestration
---

# Orchestrate Skill

Intelligent task routing and multi-agent orchestration for complex tasks.

## What It Does

The orchestrator analyzes your task and:
1. Determines the best execution strategy
2. Routes to appropriate agents
3. Coordinates parallel execution
4. Synthesizes results

## Routing Logic

| Task Type | Strategy | Agents |
|-----------|----------|--------|
| Simple lookup | Direct | explore |
| Standard work | Sequential | executor |
| Complex analysis | Tiered | architect → executor |
| Multi-part task | Parallel | multiple executors |
| Research needed | Research-first | librarian → architect |

## Tier Selection

| Complexity | Tier | Examples |
|------------|------|----------|
| Simple | LOW | "What does this function return?" |
| Standard | MEDIUM | "Add error handling" |
| Complex | HIGH | "Debug this race condition" |

## Parallel Execution

When high-parallel execution is needed:
1. Spawn 5-10+ agents minimum
2. No limit on concurrent agents
3. Never do sequential what can be parallel
4. Maximize parallelism

## Delegation Rules

The orchestrator:
- ✓ Reads files for context
- ✓ Tracks progress (TODO)
- ✓ Spawns parallel agents
- ✗ NEVER writes code directly

All implementation delegated to executor agents.

## Verification

Before completion:
1. All todo items complete
2. Diagnostics clean
3. Oracle verification (for critical tasks)
