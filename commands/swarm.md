---
description: Spawn N coordinated agents on a shared task list
---

# Swarm Mode

Spawn N coordinated agents working on a shared task list.

## Usage

```
/swarm N:agent-type "task description"
```

### Parameters
- **N** - Number of agents (1-10)
- **agent-type** - Droid to spawn (executor, designer, etc.)
- **task** - High-level task to decompose and distribute

### Examples
```
/swarm 5:executor "fix all TypeScript errors"
/swarm 3:designer "implement responsive layouts"
/swarm 4:writer "add JSDoc to all exported functions"
```

## Workflow

1. **Parse input** from: $ARGUMENTS
2. **Analyze codebase** based on task
3. **Break into subtasks** (file-specific or feature-specific)
4. **Spawn N agents** via Task tool in parallel
5. **Track progress** and report completion

Each agent claims and completes tasks independently. Use TodoWrite to track overall progress.
