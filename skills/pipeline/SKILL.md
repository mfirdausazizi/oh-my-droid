---
name: pipeline
description: Use when user needs sequential agent chaining with data passing between stages
---

# Pipeline Skill

Chain multiple agents together in sequential workflows where output from one agent flows to the next. Like Unix pipes for AI agents.

## Built-in Presets

| Preset | Stages | Use For |
|--------|--------|---------|
| review | explore → architect → critic → executor | Comprehensive code review |
| implement | planner → executor → qa-tester | New features |
| debug | explore → architect → executor | Bugs, build errors |
| research | parallel(researcher, explore) → architect → writer | Technology decisions |
| refactor | explore → architect-medium → executor-high → qa-tester | Architectural changes |
| security | explore → security-reviewer → executor | Security audits |

## Custom Pipelines

Define your own agent sequence:
```
explore -> architect -> executor "add authentication"
explore:low -> architect:high -> executor:medium "optimize performance"
```

## Data Passing Protocol

Each agent receives:
- Original task description
- Output from previous stages
- Current stage context
- Next stage preview

## Workflow

1. Parse pipeline definition (preset or custom)
2. Initialize state tracking in `.omd/pipeline-state.json`
3. Execute stages sequentially
4. Pass context between stages
5. Verify completion

## Error Handling

- **Retry** - Re-run same agent (up to 3 times)
- **Fallback** - Route to higher-tier agent
- **Abort** - Stop entire pipeline
