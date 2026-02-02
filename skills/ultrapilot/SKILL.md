---
name: ultrapilot
description: Use when user needs parallel autopilot with file ownership partitioning for maximum speed
---

# Ultrapilot Skill

[ULTRAPILOT ACTIVATED - PARALLEL AUTONOMOUS EXECUTION MODE]

Parallel autopilot that spawns multiple workers with file ownership partitioning for maximum speed.

## Phases

### Phase 1: Analysis
Determine if task is parallelizable:
- Can be split into 2+ independent subtasks
- File boundaries are clear
- Dependencies between subtasks are minimal

If NOT parallelizable: Fall back to regular autopilot.

### Phase 2: Decomposition
Break task into parallel-safe subtasks:
1. Identify independent components (frontend, backend, database, tests)
2. Map each subtask to non-overlapping file set
3. Identify shared files for sequential handling

### Phase 3: File Partitioning
Create exclusive ownership map:
```
Worker 1: src/api/**     (exclusive)
Worker 2: src/ui/**      (exclusive)
Worker 3: src/db/**      (exclusive)
Worker 4: docs/**        (exclusive)
Worker 5: tests/**       (exclusive)
SHARED:   package.json, tsconfig.json (sequential)
```

### Phase 4: Parallel Execution
Spawn up to 5 workers with exclusive file ownership.

**Critical Rules:**
- Maximum 5 parallel workers
- Each worker owns exclusive file set
- No two workers touch same files

### Phase 5: Integration
After all workers complete:
1. Handle shared files sequentially
2. Resolve integration issues
3. Ensure all pieces work together

### Phase 6: Validation
Spawn architect for full system verification.

## Delegation Rules

**YOU ARE A COORDINATOR, NOT AN IMPLEMENTER.**

| Action | YOU Do | DELEGATE |
|--------|--------|----------|
| Decompose task | ✓ | |
| Partition files | ✓ | |
| Spawn workers | ✓ | |
| **ANY code change** | ✗ NEVER | executor workers |
