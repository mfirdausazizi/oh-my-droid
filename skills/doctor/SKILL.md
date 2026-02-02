---
name: doctor
description: Use when user needs to diagnose and fix Oh-My-Droid installation issues
---

# Doctor Skill

Diagnose and fix Oh-My-Droid installation issues.

## Checks

### 1. Plugin Installation
```bash
# Check if plugin is installed
ls ~/.factory/plugins/ 2>/dev/null | grep -q "oh-my-droid"
```

### 2. AGENTS.md Setup
```bash
# Check if AGENTS.md exists
ls -la ~/.factory/AGENTS.md 2>/dev/null
grep -q "Orchestrator" ~/.factory/AGENTS.md 2>/dev/null
```

### 3. Memory System
```bash
# Check memory files
ls -la ~/.factory/memories.md 2>/dev/null
ls -la .omd/memories.md 2>/dev/null
```

### 4. Droids Available
```bash
# List installed droids
ls ~/.factory/droids/ 2>/dev/null
```

### 5. Skills Available
```bash
# List installed skills
ls ~/.factory/skills/ 2>/dev/null
```

### 6. Hooks Status
```bash
# Check hooks configuration
cat ~/.factory/settings.json 2>/dev/null | grep -q "hooks"
```

## Report Format

```
## OMD Doctor Report

### Summary
[HEALTHY / ISSUES FOUND]

### Checks

| Check | Status | Details |
|-------|--------|---------|
| Plugin | OK/WARN/CRITICAL | ... |
| AGENTS.md | OK/WARN/CRITICAL | ... |
| Memory System | OK/WARN | ... |
| Droids | OK/WARN | ... |
| Skills | OK/WARN | ... |
| Hooks | OK/WARN | ... |

### Issues Found
1. [Issue description]

### Recommended Fixes
[List fixes based on issues]
```

## Auto-Fix

If issues found, offer to fix automatically:
- Missing AGENTS.md → Run /omd-init
- Missing droids → Reinstall plugin
- Stale state files → Clean up .omd/state/
