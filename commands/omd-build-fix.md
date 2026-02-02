---
description: Fix build errors automatically
---

# Build Fix

Automatically fix build errors in the project.

## Usage

```
/build-fix [specific error or leave empty for all]
```

## Workflow

1. **Run build command** (detect from package.json or common patterns)
   - npm run build
   - tsc
   - make

2. **Parse errors** from build output

3. **Spawn fixers in parallel**:
   - `executor-low` for simple type errors
   - `executor` for logic errors
   - `executor-high` for complex refactoring

4. **Re-run build** to verify fixes

5. **Repeat** until build passes or max iterations reached

Focus: $ARGUMENTS
