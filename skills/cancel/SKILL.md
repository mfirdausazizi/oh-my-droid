---
name: cancel
description: Use when user wants to stop running background agents or cancel ongoing tasks
---

# Cancel Skill

Stop all running background tasks and operations.

## When to Use

Use cancel when:
- Too many agents are running
- A task is going in the wrong direction
- You want to start fresh
- Background tasks are stuck

## Instructions

When cancel is activated:

1. **Stop all background Task agents**
2. **Clear pending work** in any queues
3. **Mark state files as cancelled**:
   - `.omd/state/ralph-state.json` → set active: false
   - `.omd/state/ultrawork-state.json` → set active: false
4. **Report** what was cancelled

## Usage

```
/cancel
```

Or just say "cancel" or "stop everything".
