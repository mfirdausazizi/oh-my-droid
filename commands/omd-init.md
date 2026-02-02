---
description: Initialize Oh-My-Droid orchestration system
---

# Initialize Oh-My-Droid

Set up the Oh-My-Droid orchestration system for the user.

## Tasks

1. **Create ~/.factory/AGENTS.md** if it doesn't exist:
   - Read the template from the oh-my-droid plugin at `templates/AGENTS.md`
   - Copy it to `~/.factory/AGENTS.md`
   - This contains the Sisyphus orchestrator system prompt

2. **Create ~/.factory/memories.md** if it doesn't exist:
   - Read the template from `templates/memories.md`
   - Copy it to `~/.factory/memories.md`
   - This is for personal memory/preferences

3. **Create .omd/ directory** in current project (optional):
   - Create `.omd/memories.md` for project-specific memory
   - Create `.omd/state/` directory for state files

4. **Report success** with instructions on how to use:
   - Magic keywords: autopilot:, ralph:, ultrawork:, swarm:
   - Available commands: /autopilot, /ralph, /ultrawork, /plan, /swarm
   - Tiered droids for smart delegation

$ARGUMENTS
