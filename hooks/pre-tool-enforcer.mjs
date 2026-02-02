#!/usr/bin/env node
/**
 * Pre-Tool Enforcer Hook
 * Warns when orchestrator tries to edit files directly (should delegate)
 */

import { readFileSync } from 'fs';

try {
  const input = JSON.parse(readFileSync(0, 'utf-8'));
  const toolName = input.tool_name || '';
  const toolInput = input.tool_input || {};

  // Only check Edit and Create tools
  if (toolName === 'Edit' || toolName === 'Create') {
    const filePath = toolInput.file_path || toolInput.path || '';
    
    // Allow writes to config/state directories
    const allowedPaths = ['.omd/', '.factory/', 'AGENTS.md', 'memories.md'];
    const isAllowed = allowedPaths.some(p => filePath.includes(p));

    if (!isAllowed) {
      console.log(JSON.stringify({
        additionalContext: `[OMD] Warning: Orchestrator should delegate code changes to executor droids. Consider using Task(subagent_type="executor", ...) instead of direct edits.`
      }));
    }
  }
} catch (e) {
  // Silent fail
}
