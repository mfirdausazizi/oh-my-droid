---
name: note
description: Use when user wants to save notes to notepad for context preservation across sessions, uses '#text' or 'remember this:'
---

# Note Skill

Save important context to `.omd/notepad.md` that survives conversation compaction.

## Usage

| Command | Action |
|---------|--------|
| `#content` | Add to Working Memory |
| `##content` | Add to Priority Context |
| `remember this: content` | Add to Working Memory |
| `/omd-note --priority content` | Add to Priority Context |
| `/omd-note --manual content` | Add to MANUAL section |
| `/omd-note --show` | Display notepad |
| `/omd-note --prune` | Remove old entries |

## Sections

### Priority Context (500 char limit)
- **Always** injected on session start
- Use for critical facts: "Project uses pnpm", "API in src/api/"
- Keep it SHORT

### Working Memory
- Timestamped session notes
- Auto-pruned after 7 days
- Good for: debugging breadcrumbs, temporary findings

### MANUAL
- Never auto-pruned
- User-controlled permanent notes
- Good for: team contacts, deployment info

## Behavior

1. Creates `.omd/notepad.md` if it doesn't exist
2. Parses the argument to determine section
3. Appends content with timestamp
4. Warns if Priority Context exceeds 500 chars

## Integration

Notepad content is automatically loaded on session start:
- Priority Context: ALWAYS loaded
- Working Memory: Loaded if recent entries exist
