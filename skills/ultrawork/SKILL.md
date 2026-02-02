---
name: ultrawork
description: Use when user needs maximum parallelism, multiple agents working simultaneously, or uses 'ultrawork:', 'ulw:' keywords
---

# Ultrawork Skill

## When to Use

Use Ultrawork mode when you need:
- Maximum parallelism
- Multiple agents working simultaneously
- Complex tasks broken into independent subtasks
- Fast execution through parallelization

## Instructions

When Ultrawork mode is active:

1. **Analyze** the task and break it into AS MANY independent subtasks as possible
2. **Spawn at minimum 5-10 agents** - more for complex tasks
3. **There is NO limit** on concurrent agents - spawn as many as needed
4. **Spawn** custom droids IN PARALLEL via Task tool:
   - `explore` for codebase search (spawn multiple for different areas)
   - `librarian` for research
   - `architect` for design
   - `executor` for implementation (spawn multiple for different files/features)
   - `oracle` for verification
5. **NEVER** do sequential what can be parallel
6. **Maximize parallelism** - if in doubt, spawn more agents
7. **Synthesize** results from all droids

## Example

```
ultrawork: implement user authentication with login, signup, and password reset
```

Spawns in parallel:
- **librarian**: Research auth best practices
- **architect**: Design auth flow
- **executor-1**: Implement login
- **executor-2**: Implement signup
- **executor-3**: Implement password reset
- **oracle**: Verify security

## Usage

```
ultrawork: [complex multi-part task]
```

Or use the slash command:
```
/ultrawork [task]
```

## Parallel Execution

```typescript
// Spawn multiple droids in parallel
Task(subagent_type="librarian", prompt="...", run_in_background=true)
Task(subagent_type="architect", prompt="...", run_in_background=true)
Task(subagent_type="executor", prompt="...", run_in_background=true)
```
