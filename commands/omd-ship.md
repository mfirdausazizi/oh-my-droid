---
description: Recommended primary flow to discover, plan, execute, and review a task
argument-hint: <task-description>
---

# Ship Workflow

[SHIP WORKFLOW ACTIVATED - PRIMARY DELIVERY FLOW]

Run a single staged workflow to take a task from discovery to verified handoff.

## Task

$ARGUMENTS

## Stage 1 - Auto-pick discovery mode

Use this explicit rule before doing anything else:
- **Use `deepsearch`** when the goal is to find **where/how** something is implemented.
- **Use `analyze`** when the goal is to explain **behavior, root cause, or tradeoffs**.

Output a concise handoff:
- Chosen mode and why (one line)
- Key findings (3-5 bullets)
- Proposed next-step focus for planning

## Stage 2 - Plan with `ralplan`

Run `ralplan` using Stage 1 findings to produce an actionable plan.

Output a concise handoff:
- Plan path or identifier
- Scope summary (one short paragraph)
- Top risks or assumptions

## Stage 3 - Execute with `ralph`

Run `ralph` to implement the plan and persist until completion is verified.

Output a concise handoff:
- What changed (files/components)
- Verification performed (tests/build/lint/typecheck)
- Remaining caveats (if any)

## Stage 4 - Review with `code-review`

Run `code-review` on the implemented changes and return a final verdict with key issues (if any).

Final output:
- Review recommendation (APPROVE / REQUEST CHANGES / COMMENT)
- Highest-severity findings
- Final ship summary in 3-5 bullets
