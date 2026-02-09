---
name: research
description: Use when user needs deep research on a topic, technology, or library with comprehensive findings
---

# Research Skill

Deep research mode for investigating topics, technologies, APIs, or libraries.

## When to Use

- Evaluating new technologies
- Understanding unfamiliar APIs
- Researching best practices
- Comparing implementation approaches

## Research Process

1. **Define Scope**
   - What specific questions need answering?
   - What's the context/use case?

2. **Discover Available MCP Tools**
   - Check available tools for MCP-backed documentation/research providers
   - If `context7___resolve-library-id` and `context7___query-docs` are available, use them first for library/framework docs
   - If topic-specific MCP tools are available, prefer those authoritative sources before general web search

3. **Gather Information**
   - Query MCP sources first (Context7 or other available MCP)
   - Search official documentation and examples
   - Look at community patterns and references
   - Review related codebases when relevant

4. **Analyze Findings**
   - Compare approaches
   - Identify trade-offs
   - Note gotchas and pitfalls

5. **Synthesize**
   - Summarize key findings
   - Provide recommendations
   - Include code examples

## Output Format

```
## Research: [Topic]

### Summary
[2-3 sentence overview]

### Key Findings
- Finding 1
- Finding 2
- Finding 3

### Recommendations
1. [Primary recommendation]
2. [Alternative approach]

### Code Examples
[Relevant snippets]

### References
- [Source 1]
- [Source 2]
```

## Agent Delegation

Uses `researcher` or `librarian` agents for comprehensive research. Prefer MCP-backed sources when available (especially Context7 for library docs), then use web search for gaps.
