---
name: learner
description: Use when user wants to extract a learned skill from debugging sessions or hard-won discoveries
---

# Learner Skill

Extract reusable skills from debugging sessions and hard-won discoveries.

## The Insight

Reusable skills are **principles and decision-making heuristics** that teach HOW TO THINK about a class of problems.

**The difference:**
- BAD: "When you see ConnectionResetError, add this try/except block"
- GOOD: "In async network code, any I/O operation can fail independently. Wrap each I/O operation separately."

## When to Use

Use ONLY after:
- Solving a tricky bug that required deep investigation
- Discovering a non-obvious workaround specific to this codebase
- Finding a hidden gotcha that wastes time when forgotten
- Uncovering undocumented behavior

## Quality Validation

REJECT skills that are:
- Too generic (no file paths, line numbers, or specific error messages)
- Easily Googleable (standard patterns, library usage)
- Vague solutions (no code snippets or precise instructions)
- Poor triggers (generic words that match everything)

## Save Location

- **User-level**: `~/.factory/skills/omd-learned/` - Rare
- **Project-level**: `.omd/skills/` - Default

## Skill Format

```markdown
# [Skill Name]

## The Insight
What is the underlying PRINCIPLE you discovered?

## Why This Matters
What goes wrong if you don't know this?

## Recognition Pattern
How do you know when this skill applies?

## The Approach
The decision-making heuristic, not just code.

## Example (Optional)
Code as illustration of the principle.
```
