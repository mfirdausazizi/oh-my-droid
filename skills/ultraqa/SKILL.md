---
name: ultraqa
description: Use when user needs autonomous QA cycling - test, verify, fix, repeat until goal met
---

# UltraQA Skill

> ⚠️ **Soft-deprecated:** Prefer `ship:` (or `/omd-ship`) for the primary end-to-end workflow.

[ULTRAQA ACTIVATED - AUTONOMOUS QA CYCLING]

Autonomous QA cycling workflow that runs until your quality goal is met.

**Cycle**: qa-tester → architect verification → fix → repeat

## Goal Types

| Flag | Goal Type | What to Check |
|------|-----------|---------------|
| --tests | tests | All test suites pass |
| --build | build | Build succeeds |
| --lint | lint | No lint errors |
| --typecheck | typecheck | No TypeScript errors |
| --custom | custom | Custom success pattern |

## Cycle Workflow (Max 5 Cycles)

1. **RUN QA**: Execute verification based on goal type
2. **CHECK RESULT**: Did the goal pass?
   - **YES** → Exit with success
   - **NO** → Continue
3. **ARCHITECT DIAGNOSIS**: Analyze failure
4. **FIX ISSUES**: Apply recommendations
5. **REPEAT**: Go back to step 1

## Exit Conditions

| Condition | Action |
|-----------|--------|
| **Goal Met** | Exit: "ULTRAQA COMPLETE" |
| **Cycle 5 Reached** | Exit with diagnosis |
| **Same Failure 3x** | Exit early with root cause |

## Progress Output

```
[ULTRAQA Cycle 1/5] Running tests...
[ULTRAQA Cycle 1/5] FAILED - 3 tests failing
[ULTRAQA Cycle 1/5] Architect diagnosing...
[ULTRAQA Cycle 1/5] Fixing: auth.test.ts
[ULTRAQA Cycle 2/5] Running tests...
[ULTRAQA Cycle 2/5] PASSED
[ULTRAQA COMPLETE] Goal met after 2 cycles
```

## State Tracking

Track state in `.omd/ultraqa-state.json`:
```json
{
  "active": true,
  "goal_type": "tests",
  "cycle": 1,
  "max_cycles": 5,
  "failures": []
}
```
