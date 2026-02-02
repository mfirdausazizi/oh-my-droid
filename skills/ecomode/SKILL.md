---
name: ecomode
description: Token-efficient execution mode
---

# Ecomode Skill

Token-efficient execution that minimizes API costs.

## When to Use

Use ecomode when:
- Working on simple tasks
- Budget is a concern
- Speed over thoroughness

## Instructions

When ecomode is active:

1. **Use LOW tier agents** by default:
   - `architect-low` instead of `architect`
   - `executor-low` instead of `executor`
   - `explore` instead of `explore-medium`
   - `researcher-low` instead of `researcher`

2. **Minimize parallel agents**:
   - Sequential over parallel when possible
   - Max 2-3 concurrent agents

3. **Keep responses concise**:
   - No verbose explanations
   - Minimal context in prompts
   - Direct answers only

4. **Skip optional verification**:
   - Only verify critical changes
   - Trust simple implementations

## Trade-offs

- Faster and cheaper
- Less thorough
- May miss edge cases
- Best for simple, well-defined tasks
