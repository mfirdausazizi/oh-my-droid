---
description: Sequential agent chaining with data passing between stages
argument-hint: <preset-or-custom-chain> <task>
---

# Pipeline Command

[PIPELINE MODE ACTIVATED]

Chain multiple agents together in sequential workflows where output from one agent flows to the next. Like Unix pipes for AI agents.

## Built-in Presets

| Preset | Stages | Use For |
|--------|--------|---------|
| review | explore → architect → critic → executor | Comprehensive code review |
| implement | planner → executor → qa-tester | New features |
| debug | explore → architect → executor | Bugs, build errors |
| research | parallel(researcher, explore) → architect → writer | Technology decisions |
| refactor | explore → architect-medium → executor-high → qa-tester | Architectural changes |
| security | explore → security-reviewer → executor → security-reviewer-low | Security audits |

## Usage

```
/omd-pipeline review add rate limiting to API
/omd-pipeline debug login fails with OAuth
/omd-pipeline explore -> architect -> executor "add authentication"
```

## Task

$ARGUMENTS

## Workflow

1. Parse pipeline definition (preset or custom)
2. Initialize state tracking
3. Execute stages sequentially
4. Pass context between stages
5. Verify completion

## Data Passing

Each agent receives:
- Original task description
- Output from previous stages
- Current stage context
- Next stage preview
