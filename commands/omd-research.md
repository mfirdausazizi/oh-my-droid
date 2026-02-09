---
description: Deep research mode with multiple research agents
---

# Research Mode

Spawn multiple research agents to deeply investigate a topic.

## Usage

```
/research "topic or question"
```

## Workflow

1. **Parse research topic** from: $ARGUMENTS

2. **Spawn parallel researchers**:
   - `librarian` - Search codebase for existing patterns
   - `researcher` - Use available MCP docs tools first (e.g., Context7), then search external docs and best practices
   - `researcher-low` - Quick API lookups

3. **Synthesize findings** into actionable recommendations

4. **Report** with:
   - Summary of findings
   - Relevant code examples
   - External references
   - Recommended approach

Use this for understanding new libraries, exploring solutions, or learning best practices.
