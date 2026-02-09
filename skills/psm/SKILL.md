---
name: psm
description: Use when user needs Project Session Manager for isolated dev environments with git worktrees
---

# Project Session Manager (PSM)

> ⚠️ **Soft-deprecated:** Prefer `ship:` (or `/omd-ship`) for the primary end-to-end workflow.

Manage isolated development environments using git worktrees and tmux sessions.

## Commands

| Pattern | Action |
|---------|--------|
| `review <ref>` | Create PR review session |
| `fix <ref>` | Create issue fix session |
| `feature <name>` | Create feature session |
| `list` | List sessions |
| `attach <session>` | Attach to session |
| `kill <session>` | Kill session |
| `cleanup` | Clean merged/closed |
| `status` | Show current session |

## Reference Formats

- `#123` - Issue/PR number (current repo)
- `owner/repo#123` - Full repo + number
- `https://github.com/.../pull/123` - Full URL

## Session Structure

```
~/.omd/worktrees/
├── project-a/
│   ├── pr-123/      # PR review worktree
│   └── issue-456/   # Issue fix worktree
└── project-b/
    └── feat-auth/   # Feature worktree
```

## Workflow

### For PR Review
1. Parse reference to get repo and PR number
2. Fetch PR info via `gh pr view`
3. Create worktree from PR branch
4. Create tmux session
5. Launch droid in tmux

### For Issue Fix
1. Parse reference to get repo and issue number
2. Fetch issue info via `gh issue view`
3. Create fix branch from main
4. Create worktree and tmux session

### For Feature
1. Create feature branch from main
2. Create worktree and tmux session
