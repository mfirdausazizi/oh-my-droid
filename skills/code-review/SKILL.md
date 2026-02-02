---
name: code-review
description: Use when user needs comprehensive code review with severity-rated feedback for quality, security, and maintainability
---

# Code Review Skill

Conduct a thorough code review for quality, security, and maintainability with severity-rated feedback.

## Review Categories

- **Security** - Hardcoded secrets, injection risks, XSS, CSRF
- **Code Quality** - Function size, complexity, nesting depth
- **Performance** - Algorithm efficiency, N+1 queries, caching
- **Best Practices** - Naming, documentation, error handling
- **Maintainability** - Duplication, coupling, testability

## Severity Rating

- **CRITICAL** - Security vulnerability (must fix before merge)
- **HIGH** - Bug or major code smell (should fix before merge)
- **MEDIUM** - Minor issue (fix when possible)
- **LOW** - Style/suggestion (consider fixing)

## Review Checklist

### Security
- [ ] No hardcoded secrets
- [ ] All user inputs sanitized
- [ ] SQL/NoSQL injection prevention
- [ ] XSS prevention

### Code Quality
- [ ] Functions < 50 lines
- [ ] Cyclomatic complexity < 10
- [ ] No deeply nested code
- [ ] Clear naming

### Performance
- [ ] No N+1 query patterns
- [ ] Efficient algorithms

## Output Format

```
CODE REVIEW REPORT
==================

Files Reviewed: 8
Total Issues: 15

CRITICAL (0)
HIGH (3)
MEDIUM (7)
LOW (5)

RECOMMENDATION: APPROVE / REQUEST CHANGES / COMMENT
```
