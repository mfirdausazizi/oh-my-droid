#!/usr/bin/env node
/**
 * Persistent Mode Hook (Stop event)
 * Prevents stopping when ralph mode is active
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

try {
  const projectDir = process.env.FACTORY_PROJECT_DIR || process.cwd();
  const ralphState = join(projectDir, '.omd', 'state', 'ralph-state.json');

  if (existsSync(ralphState)) {
    try {
      const state = JSON.parse(readFileSync(ralphState, 'utf-8'));
      if (state.active && !state.verified) {
        console.log(JSON.stringify({
          additionalContext: `[OMD RALPH] Task not verified complete. Iteration ${state.iteration}/${state.maxIterations}. Continue working on: ${state.task}`
        }));
      }
    } catch (e) {}
  }
} catch (e) {
  // Silent fail
}
