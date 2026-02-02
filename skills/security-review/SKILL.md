---
name: security-review
description: Use when user needs comprehensive security audit checking OWASP Top 10, secrets, and vulnerabilities
---

# Security Review Skill

Conduct a thorough security audit checking for OWASP Top 10 vulnerabilities, hardcoded secrets, and unsafe patterns.

## What Gets Reviewed

1. **OWASP Top 10 Scan**
   - A01: Broken Access Control
   - A02: Cryptographic Failures
   - A03: Injection (SQL, NoSQL, Command, XSS)
   - A04: Insecure Design
   - A05: Security Misconfiguration
   - A06: Vulnerable Components
   - A07: Authentication Failures
   - A08: Data Integrity Failures
   - A09: Logging Failures
   - A10: SSRF

2. **Secrets Detection**
   - Hardcoded API keys
   - Passwords in source code
   - Private keys in repo
   - Tokens and credentials

3. **Input Validation**
   - SQL/NoSQL injection prevention
   - Command injection prevention
   - XSS prevention
   - Path traversal prevention

4. **Dependency Security**
   - Run `npm audit` for vulnerabilities
   - Check for outdated dependencies

## Severity Levels

- **CRITICAL** - Exploitable vulnerability with severe impact
- **HIGH** - Vulnerability with serious impact
- **MEDIUM** - Security weakness with limited impact
- **LOW** - Best practice violation

## Output Format

```
SECURITY REVIEW REPORT
======================

CRITICAL (N)
------------
1. file:line - Issue description
   Impact: ...
   Remediation: ...

HIGH (N)
--------
...

RECOMMENDATION: [PASS / FAIL]
```
