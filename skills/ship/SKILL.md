---
name: ship
description: Use when user wants the recommended end-to-end flow from discovery to planning, execution, and review
---

# Ship Skill

[SHIP WORKFLOW ACTIVATED - PRIMARY DELIVERY FLOW]

## Activation Triggers

- `ship:`
- `/omd-ship`
- "ship workflow"

## Workflow

### Stage 1 - Auto-pick discovery mode

Use this explicit rule:
- **Use `deepsearch`** to find **where/how** something is implemented.
- **Use `analyze`** to explain **behavior, root cause, or tradeoffs**.

Stage 1 handoff must be concise:
- Chosen mode + one-line rationale
- Key findings (3-5 bullets)
- Planning focus

### Stage 2 - Plan with `ralplan`

Run `ralplan` from Stage 1 findings to produce an actionable plan.

**CRITICAL**: `ralplan` MUST:
1. Save the plan to `.omd/plans/[feature-name].md` before presenting to user
2. Use the **AskUser** tool to get explicit user approval of the saved plan
3. **Do NOT proceed to Stage 3** until the user approves

If the user requests revisions, loop back through ralplan until approved.

Stage 2 handoff must be concise:
- Plan path or identifier
- Scope summary
- Risks and assumptions
- User approval status (must be APPROVED)

### Stage 3 - Execute with `ralph`

Run `ralph` to execute the plan and persist until verified complete.

Stage 3 handoff must be concise:
- What changed
- Verification performed
- Any remaining caveats

### Stage 4 - Review with `code-review`

Run `code-review` on implemented changes and provide a final recommendation.

Final output:
- Recommendation (APPROVE / REQUEST CHANGES / COMMENT)
- Highest-severity findings
- Final ship summary in 3-5 bullets
