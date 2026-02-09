---
description: Test-driven development workflow
---

# TDD Mode

> ⚠️ **Soft-deprecated:** Prefer `/omd-ship [task description]` for the primary end-to-end workflow.

Test-driven development workflow: write tests first, then implement.

## Usage

```
/tdd "feature to implement"
```

## Workflow

1. **Understand the feature** from: $ARGUMENTS

2. **Write tests FIRST**:
   - Spawn `qa-tester` to write failing tests
   - Tests should cover happy path and edge cases
   - Verify tests fail (no implementation yet)

3. **Implement minimally**:
   - Spawn `executor` to write just enough code to pass tests
   - No over-engineering

4. **Refactor**:
   - Clean up code while keeping tests green
   - Spawn `critic` to review

5. **Verify**:
   - Run full test suite
   - Spawn `oracle` to verify completion

Red → Green → Refactor
