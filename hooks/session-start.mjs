#!/usr/bin/env node
/**
 * Session Start Hook
 * Initialize session and load state
 */

import { readFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

try {
  const projectDir = process.env.FACTORY_PROJECT_DIR || process.cwd();
  const omdDir = join(projectDir, '.omd');
  const stateDir = join(omdDir, 'state');

  // Create .omd/state if doesn't exist
  if (!existsSync(stateDir)) {
    mkdirSync(stateDir, { recursive: true });
  }

  // Check for active ralph state
  const ralphState = join(stateDir, 'ralph-state.json');
  if (existsSync(ralphState)) {
    try {
      const state = JSON.parse(readFileSync(ralphState, 'utf-8'));
      if (state.active) {
        console.log(JSON.stringify({
          additionalContext: `[OMD] Resuming ralph mode - iteration ${state.iteration}/${state.maxIterations}. Task: ${state.task}`
        }));
      }
    } catch (e) {}
  }

  // Check for active ultrawork state
  const ultraworkState = join(stateDir, 'ultrawork-state.json');
  if (existsSync(ultraworkState)) {
    try {
      const state = JSON.parse(readFileSync(ultraworkState, 'utf-8'));
      if (state.active) {
        console.log(JSON.stringify({
          additionalContext: `[OMD] Resuming ultrawork mode with ${state.agentCount} agents. Task: ${state.task}`
        }));
      }
    } catch (e) {}
  }
} catch (e) {
  // Silent fail
}
