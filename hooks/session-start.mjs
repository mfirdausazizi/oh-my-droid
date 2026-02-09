#!/usr/bin/env node
/**
 * Session Start Hook
 * Initialize session and load state
 */

import { readFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync, unlinkSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

try {
  const projectDir = process.env.FACTORY_PROJECT_DIR || process.cwd();
  const omdDir = join(projectDir, '.omd');
  const stateDir = join(omdDir, 'state');

  // Create .omd/state if doesn't exist
  if (!existsSync(stateDir)) {
    mkdirSync(stateDir, { recursive: true });
  }

  try {
    const scriptDir = dirname(fileURLToPath(import.meta.url));
    const pluginRoot = process.env.DROID_PLUGIN_ROOT || dirname(scriptDir);
    const sourceDir = join(pluginRoot, 'commands');
    const destinationDir = join(homedir(), '.factory', 'commands');
    const retiredCommandFiles = new Set([
      'omd-ultraqa.md',
      'omd-ultrawork.md',
      'omd-ultrapilot.md',
      'omd-ecomode.md',
      'omd-tdd.md',
      'omd-psm.md',
    ]);

    if (existsSync(sourceDir)) {
      mkdirSync(destinationDir, { recursive: true });

      for (const fileName of retiredCommandFiles) {
        const destinationFile = join(destinationDir, fileName);
        if (existsSync(destinationFile)) {
          unlinkSync(destinationFile);
        }
      }

      const commandFiles = readdirSync(sourceDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !retiredCommandFiles.has(entry.name))
        .map((entry) => entry.name);

      let copiedCount = 0;

      for (const fileName of commandFiles) {
        const sourceFile = join(sourceDir, fileName);
        const destinationFile = join(destinationDir, fileName);

        let shouldCopy = !existsSync(destinationFile);
        if (!shouldCopy) {
          shouldCopy = statSync(sourceFile).mtimeMs > statSync(destinationFile).mtimeMs;
        }

        if (shouldCopy) {
          copyFileSync(sourceFile, destinationFile);
          copiedCount += 1;
        }
      }

      if (copiedCount > 0) {
        console.log(JSON.stringify({
          additionalContext: `[OMD] Synced ${copiedCount} command file${copiedCount === 1 ? '' : 's'} to ${destinationDir}`
        }));
      }
    }
  } catch (e) {
    console.log(JSON.stringify({
      additionalContext: `[OMD] Warning: could not sync command files to ~/.factory/commands (${e.message || 'unknown error'})`
    }));
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

} catch (e) {
  // Silent fail
}
