---
description: System diagnostics and health check
---

# Doctor - System Diagnostics

Run diagnostics on the Oh-My-Droid setup.

## Checks

1. **Plugin Installation**
   - Verify oh-my-droid plugin is installed
   - Check plugin version

2. **AGENTS.md Setup**
   - Check if ~/.factory/AGENTS.md exists
   - Verify it contains orchestrator instructions

3. **Memory System**
   - Check ~/.factory/memories.md
   - Check .omd/memories.md (project)

4. **Droids Available**
   - List all available droids
   - Verify tiered droids exist

5. **Hooks Status**
   - Check if hooks are enabled
   - List active hooks

6. **State Directory**
   - Check .omd/state/ exists
   - Report any stale state files

## Output

Report status of each check with recommendations for any issues found.

$ARGUMENTS
