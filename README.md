# Oh-My-Droid

**Multi-agent orchestration for Factory Droid. Zero learning curve.**

*Don't learn Droid. Just use OMD.*

Oh-My-Droid brings the power of [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) to [Factory AI's Droid CLI](https://factory.ai), featuring a Sisyphus-style orchestrator, 21 tiered droids, intelligent execution modes, and a memory system.

## Quick Start

### Install as Droid Plugin (Recommended)

```bash
# Add the marketplace
droid plugin marketplace add https://github.com/Kartvya69/oh-my-droid

# Install the plugin
droid plugin install oh-my-droid@oh-my-droid

# Initialize the orchestrator (one-time setup)
/omd-init
```

### Alternative: Install from npm

```bash
npm install -g oh-my-droid
omd install
```

### Start Using

```
autopilot: build a REST API for managing tasks
```

That's it. Everything else is automatic.

## Why Oh-My-Droid?

- **Zero configuration** - Works out of the box with Droid's native systems
- **Natural language interface** - No commands to memorize, just describe what you want
- **21 Tiered Droids** - Low/Medium/High variants for smart token optimization
- **Automatic parallelization** - Complex tasks distributed across specialized agents
- **Persistent execution** - Ralph mode won't give up until the job is verified complete
- **Memory system** - Remember decisions and preferences across sessions
- **Hooks** - Automatic keyword detection and memory capture

## Features

### Execution Modes (Magic Keywords)

| Mode | Keyword | Description |
|------|---------|-------------|
| **Autopilot** | `autopilot:` | Full autonomous execution |
| **Ultrawork** | `ulw:` or `ultrawork:` | Maximum parallel execution (5-10+ agents) |
| **Ralph** | `ralph:` | Persistence until verified complete |
| **Swarm** | `swarm N:type` | N coordinated agents on shared tasks |
| **Ecomode** | `eco:` | Token-efficient execution |
| **Plan** | `plan:` | Specification mode |

### Tiered Droids (21 Total)

| Tier | Droids | Use Case |
|------|--------|----------|
| **LOW** | architect-low, executor-low, explore, designer-low, researcher-low | Simple lookups, quick tasks |
| **MEDIUM** | architect-medium, executor, explore-medium, designer, researcher, librarian, qa-tester, writer | Standard work |
| **HIGH** | architect, executor-high, designer-high, oracle, planner, critic, analyst, security-reviewer | Complex analysis, verification |

### Slash Commands (11 Total)

| Command | Description |
|---------|-------------|
| `/omd-init` | Initialize orchestrator (run once after install) |
| `/autopilot` | Full autonomous execution |
| `/ultrawork` | Maximum parallel execution |
| `/ralph` | Persistence mode |
| `/plan` | Specification mode |
| `/swarm` | Coordinated multi-agent |
| `/cancel` | Stop all background tasks |
| `/doctor` | System diagnostics |
| `/research` | Deep research mode |
| `/tdd` | Test-driven development |
| `/hud` | Status display |

### Skills (8 Total)

- **autopilot** - Autonomous execution
- **ultrawork** - Parallel execution with 5-10+ agents
- **ralph** - Persistence until verified
- **plan** - Specification mode
- **swarm** - Coordinated multi-agent
- **memory-capture** - Save memories with `#text` or `remember this:`
- **cancel** - Stop background tasks
- **ecomode** - Token-efficient mode

### Hooks

- **keyword-detector** - Auto-detect magic keywords
- **memory-capture** - Capture `#text` to memories
- **session-start** - Resume active modes
- **persistent-mode** - Ralph persistence enforcement
- **pre-tool-enforcer** - Delegation reminders

## Usage Examples

### Magic Keywords
```
autopilot: build a todo app with React and Node.js

ralph: migrate the entire codebase to TypeScript

ultrawork: refactor all components in the src/ directory

swarm 5:executor fix all TypeScript errors

eco: add input validation to the form
```

### Swarm Mode
```
/swarm 5:executor "fix all lint errors"
/swarm 3:designer "implement responsive layouts"
/swarm 4:writer "add JSDoc to all functions"
```

### Memory System
```
#we use the repository pattern for data access
##I prefer functional components over class components
remember this: auth tokens expire after 24 hours
```

### Tiered Droid Selection
```typescript
// Simple lookup → LOW tier (saves tokens)
Task(subagent_type="architect-low", prompt="What does this function return?")

// Standard work → MEDIUM tier
Task(subagent_type="executor", prompt="Add error handling to login")

// Complex analysis → HIGH tier
Task(subagent_type="oracle", prompt="Verify this implementation is complete")
```

## Installation

### As Droid Plugin (Recommended)

```bash
# Add marketplace and install
droid plugin marketplace add https://github.com/Kartvya69/oh-my-droid
droid plugin install oh-my-droid@oh-my-droid

# Initialize (one-time) - sets up AGENTS.md orchestrator
/omd-init
```

### From npm

```bash
npm install -g oh-my-droid
omd install
```

## Configuration

Oh-My-Droid uses Droid's native configuration:

| File | Purpose |
|------|---------|
| `~/.factory/AGENTS.md` | Orchestrator system prompt (created by `/omd-init`) |
| `~/.factory/memories.md` | Personal memory/preferences |
| `.omd/memories.md` | Project-specific memory |
| `.omd/state/` | State files for ralph, ultrawork, swarm |

## How It Works

```
User Input → Keyword Detection Hook → Skill Activation
                                              ↓
                                   AGENTS.md Orchestrator
                                              ↓
                                   Tiered Droid Spawning
                                              ↓
                                   Parallel Execution
                                              ↓
                                   Oracle Verification
                                              ↓
                                   Task Complete
```

## Requirements

- [Factory Droid CLI](https://factory.ai)
- Node.js 18+

## License

MIT

## Credits

Inspired by [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode).

**Zero learning curve. Maximum power.**
