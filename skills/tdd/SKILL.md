---
name: tdd
description: Use when user wants Test-Driven Development enforcement - write tests first, always
---

# TDD Mode

> ⚠️ **Soft-deprecated:** Prefer `ship:` (or `/omd-ship`) for the primary end-to-end workflow.

[TDD MODE ACTIVATED]

## The Iron Law

**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST**

Write code before test? DELETE IT. Start over. No exceptions.

## Red-Green-Refactor Cycle

### 1. RED: Write Failing Test
- Write test for the NEXT piece of functionality
- Run test - MUST FAIL
- If it passes, your test is wrong

### 2. GREEN: Minimal Implementation
- Write ONLY enough code to pass the test
- No extras. No "while I'm here."
- Run test - MUST PASS

### 3. REFACTOR: Clean Up
- Improve code quality
- Run tests after EVERY change
- Must stay green

### 4. REPEAT
- Next failing test
- Continue cycle

## Enforcement Rules

| If You See | Action |
|------------|--------|
| Code written before test | STOP. Delete code. Write test first. |
| Test passes on first run | Test is wrong. Fix it to fail first. |
| Multiple features in one cycle | STOP. One test, one feature. |
| Skipping refactor | Go back. Clean up before next feature. |

## Output Format

```
## TDD Cycle: [Feature Name]

### RED Phase
Test: [test code]
Expected failure: [what error you expect]

### GREEN Phase
Implementation: [minimal code]
Result: [tests pass]

### REFACTOR Phase
Changes: [what was cleaned up]
```

**Remember:** The discipline IS the value.
