---
description: Project Session Manager - isolated dev environments with git worktrees
argument-hint: <review|fix|feature|list|attach|kill|cleanup> <args>
---

# Project Session Manager (PSM)

> ⚠️ **Soft-deprecated:** Prefer `/omd-ship [task description]` for the primary end-to-end workflow.

[PSM ACTIVATED - SESSION MANAGEMENT MODE]

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

## Input

$ARGUMENTS

## Session Structure

```
~/.omd/worktrees/
├── project-a/
│   ├── pr-123/      # PR review worktree
│   └── issue-456/   # Issue fix worktree
└── project-b/
    └── feat-auth/   # Feature worktree
```

## Output Example

```
Session Ready!

  ID:       project:pr-123
  Type:     review
  PR:       #123 - Add webhook support
  Worktree: ~/.omd/worktrees/project/pr-123
  Tmux:     omd:project:pr-123

Commands:
  Attach:  tmux attach -t omd:project:pr-123
  Kill:    /omd-psm kill project:pr-123
```
