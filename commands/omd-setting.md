---
description: Toggle smart model assignment for custom droids
argument-hint: <on|off|status>
---

Manage smart model assignment runtime bridge.

1. Set `action` to `$ARGUMENTS`; if empty, use `status`.
2. Try running:
   - `omd setting smart-model-assignment <action>`
3. If `omd` is not found, run local fallback from current repo:
   - If `dist/cli/index.js` is missing, run `npm run build`
   - Then run `node dist/cli/index.js setting smart-model-assignment <action>`
4. Return command output and exit code.
