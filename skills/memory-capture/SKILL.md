---
name: memory-capture
description: Use when user wants to save information for later, uses '#text', '##text', or 'remember this:'
---

# Memory Capture Skill

Capture important information to memory files for future sessions.

## Triggers

This skill activates when user says:
- "#something to remember" (project memory)
- "##something to remember" (personal memory)
- "remember this: something"
- "note: something"

## Instructions

When capturing a memory:

1. **Detect memory type**:
   - `##` prefix or "personal" keyword → `~/.factory/memories.md`
   - `#` prefix or default → `.omd/memories.md` (or `~/.factory/memories.md` if no project)

2. **Format the memory**:
   ```markdown
   - [YYYY-MM-DD] [content]
   ```

3. **Append to appropriate file**

4. **Confirm** what was saved and where

## Memory Categories

Memories should be categorized:
- **Preferences**: Code style, tool choices
- **Decisions**: Architecture choices with reasoning
- **Context**: Domain knowledge, business rules
- **History**: What happened and when
