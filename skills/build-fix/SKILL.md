---
name: build-fix
description: Use when user needs to fix build, TypeScript, or compilation errors with minimal changes
---

# Build Fix Skill

Fix build and compilation errors quickly with minimal code changes. Get the build green without refactoring.

## When to Use

- "fix the build", "build is broken"
- TypeScript compilation fails
- Type checker reports errors
- "minimal fixes" for errors

## What It Does

1. **Collect Errors**
   - Run type check command (tsc --noEmit, etc.)
   - Categorize errors by type and severity

2. **Fix Strategically**
   - Add type annotations where missing
   - Add null checks where needed
   - Fix import/export statements
   - Resolve module resolution issues

3. **Minimal Diff Strategy**
   - NO refactoring of unrelated code
   - NO architectural changes
   - NO performance optimizations
   - ONLY what's needed to make build pass

4. **Verify**
   - Run type check after each fix
   - Ensure no new errors introduced
   - Stop when build passes

## Output Format

```
BUILD FIX REPORT
================

Errors Fixed: 12
Files Modified: 8
Lines Changed: 47

Fixes Applied:
1. src/utils/validation.ts:15 - Added return type annotation
2. src/components/Header.tsx:42 - Added null check
...

Final Build Status: ✓ PASSING
```
