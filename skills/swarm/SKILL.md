---
name: swarm
description: Use when user wants multiple coordinated agents on a shared task, or uses 'swarm:' keyword
---

# Swarm Skill

Activate coordinated multi-agent mode for parallel task execution.

## When to Use

Use swarm mode when you need:
- Multiple agents working on independent subtasks
- File-by-file processing (lint fixes, type errors, docs)
- Parallel execution with coordination

## Instructions

When swarm mode is active:

1. **Parse the request** for:
   - N (number of agents)
   - Agent type (executor, designer, writer, etc.)
   - Task description

2. **Analyze and decompose** the task:
   - Identify all independent subtasks
   - Create a task list (one per file or feature)

3. **Spawn N agents in parallel**:
   ```
   Task(subagent_type="[agent-type]", prompt="Task: [subtask]")
   Task(subagent_type="[agent-type]", prompt="Task: [subtask]")
   ...
   ```

4. **Track progress** with TodoWrite:
   - Each subtask as a todo item
   - Update as agents complete

5. **Report completion** when all subtasks done

## Example

```
swarm 5:executor fix all TypeScript errors
```

Decomposes into:
- Agent 1: Fix errors in src/utils/
- Agent 2: Fix errors in src/components/
- Agent 3: Fix errors in src/api/
- Agent 4: Fix errors in src/hooks/
- Agent 5: Fix errors in src/types/
