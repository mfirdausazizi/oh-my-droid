---
description: Save notes to notepad for context preservation across sessions
argument-hint: [--priority|--manual|--show|--prune] <content>
---

# Note Command

Save important context to `.omd/notepad.md` that survives conversation compaction.

## Usage

| Command | Action |
|---------|--------|
| `/omd-note <content>` | Add to Working Memory with timestamp |
| `/omd-note --priority <content>` | Add to Priority Context (always loaded) |
| `/omd-note --manual <content>` | Add to MANUAL section (never pruned) |
| `/omd-note --show` | Display current notepad contents |
| `/omd-note --prune` | Remove entries older than 7 days |
| `/omd-note --clear` | Clear Working Memory (keep Priority + MANUAL) |

## Sections

### Priority Context (500 char limit)
- **Always** injected on session start
- Use for critical facts: "Project uses pnpm", "API in src/api/client.ts"

### Working Memory
- Timestamped session notes
- Auto-pruned after 7 days

### MANUAL
- Never auto-pruned
- User-controlled permanent notes

## Input

$ARGUMENTS
