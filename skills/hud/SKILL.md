---
name: hud
description: Use when user wants to toggle or configure the status line display
---

# HUD Skill

Toggle and configure the Oh-My-Droid status line display.

## Usage

| Command | Action |
|---------|--------|
| `/omd-hud on` | Enable status line |
| `/omd-hud off` | Disable status line |
| `/omd-hud setup` | Configure HUD |
| `/omd-hud status` | Show current state |

## What HUD Shows

The status line displays:
- Current mode (autopilot, ralph, ultrawork, etc.)
- Active agents count
- Background tasks status
- Memory usage indicator

## Setup

The HUD requires configuration in `~/.factory/settings.json`:

```json
{
  "statusLine": {
    "command": "node ~/.factory/hud/omd-hud.mjs",
    "interval": 5
  }
}
```

## States

| State | Display |
|-------|---------|
| Idle | `[OMD] Ready` |
| Autopilot | `[OMD] Autopilot: <task>` |
| Ralph | `[OMD] Ralph: <progress>` |
| Ultrawork | `[OMD] Ultrawork: <agents> agents` |
| Swarm | `[OMD] Swarm: <n> workers` |

## Troubleshooting

If HUD doesn't appear:
1. Check settings.json has statusLine config
2. Verify hud script exists
3. Restart Droid for changes to take effect
