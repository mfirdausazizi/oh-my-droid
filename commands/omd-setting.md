---
description: Toggle smart model assignment for custom droids
---

Manage smart model assignment runtime bridge with interactive selection.

1. Use AskUser with exactly this questionnaire:

   1. [question] Smart model assignment action?
   [topic] Smart-Model-Assignment
   [option] Enable
   [option] Disable
   [option] Status

2. Based on selected action, perform backend update directly (no `omd` command):
   - Target droid dirs: `./.factory/droids` and `~/.factory/droids`
   - State file: `~/.omd/state/smart-model-assignment.json`

3. Behavior:
   - **Disable**: for each droid markdown frontmatter with `model:` not `inherit`, save original model to `snapshots[filePath]`, then set `model: inherit`.
   - **Enable**: for each droid file, restore snapshot if usable; otherwise choose from `~/.factory/settings.json` `customModels` (tier-aware heuristic), otherwise use `inherit`.
   - **Status**: report current enabled flag and summary counts of scanned/changed/skipped files.

4. Persist state JSON as:
   - `enabled` (boolean)
   - `snapshots` (map of file path to original model)
   - `updatedAt` (ISO timestamp)

5. Return a concise result summary.
