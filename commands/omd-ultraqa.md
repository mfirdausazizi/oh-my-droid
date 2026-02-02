---
description: QA cycling workflow - test, verify, fix, repeat until goal met
argument-hint: [--tests|--build|--lint|--typecheck|--custom] <goal>
---

# UltraQA

[ULTRAQA ACTIVATED - AUTONOMOUS QA CYCLING]

Autonomous QA cycling workflow that runs until your quality goal is met.

**Cycle**: qa-tester → architect verification → fix → repeat

## Goal Types

| Flag | Goal Type | What to Check |
|------|-----------|---------------|
| `--tests` | tests | All test suites pass |
| `--build` | build | Build succeeds with exit 0 |
| `--lint` | lint | No lint errors |
| `--typecheck` | typecheck | No TypeScript errors |
| `--custom "pattern"` | custom | Custom success pattern in output |

## Goal

$ARGUMENTS

## Cycle Workflow

### Each Cycle (Max 5)

1. **RUN QA**: Execute verification based on goal type
2. **CHECK RESULT**: Did the goal pass?
   - **YES** → Exit with success message
   - **NO** → Continue to step 3
3. **ARCHITECT DIAGNOSIS**: Spawn architect to analyze failure
4. **FIX ISSUES**: Apply architect's recommendations
5. **REPEAT**: Go back to step 1

## Exit Conditions

| Condition | Action |
|-----------|--------|
| **Goal Met** | Exit: "ULTRAQA COMPLETE: Goal met after N cycles" |
| **Cycle 5 Reached** | Exit with diagnosis |
| **Same Failure 3x** | Exit early with root cause |

## Progress Output

```
[ULTRAQA Cycle 1/5] Running tests...
[ULTRAQA Cycle 1/5] FAILED - 3 tests failing
[ULTRAQA Cycle 1/5] Architect diagnosing...
[ULTRAQA Cycle 1/5] Fixing: auth.test.ts - missing mock
[ULTRAQA Cycle 2/5] Running tests...
[ULTRAQA Cycle 2/5] PASSED - All 47 tests pass
[ULTRAQA COMPLETE] Goal met after 2 cycles
```
