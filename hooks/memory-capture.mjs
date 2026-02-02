#!/usr/bin/env node
/**
 * Memory Capture Hook
 * Captures "#text" or "remember this:" to memory files
 */

import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';

try {
  const input = JSON.parse(readFileSync(0, 'utf-8'));
  const prompt = input.prompt || '';
  const trimmed = prompt.trim();

  let content = null;
  let isPersonal = false;

  // Check for ## (personal) or # (project) prefix
  if (trimmed.startsWith('##')) {
    content = trimmed.slice(2).trim();
    isPersonal = true;
  } else if (trimmed.startsWith('#') && !trimmed.startsWith('#!/')) {
    content = trimmed.slice(1).trim();
  }

  // Check for phrase triggers
  const triggers = ['remember this:', 'remember:', 'note:', 'save this:'];
  if (!content) {
    for (const trigger of triggers) {
      const idx = trimmed.toLowerCase().indexOf(trigger);
      if (idx !== -1) {
        content = trimmed.slice(idx + trigger.length).trim();
        isPersonal = trimmed.toLowerCase().includes('personal');
        break;
      }
    }
  }

  if (content) {
    const date = new Date().toISOString().split('T')[0];
    const entry = `\n- [${date}] ${content}\n`;

    let memFile;
    if (isPersonal) {
      memFile = join(homedir(), '.factory', 'memories.md');
    } else {
      const projectDir = process.env.FACTORY_PROJECT_DIR || process.cwd();
      const omdDir = join(projectDir, '.omd');
      if (existsSync(omdDir)) {
        memFile = join(omdDir, 'memories.md');
      } else {
        memFile = join(homedir(), '.factory', 'memories.md');
      }
    }

    // Ensure directory exists
    const dir = dirname(memFile);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Create file with header if doesn't exist
    if (!existsSync(memFile)) {
      appendFileSync(memFile, '# Memories\n\n## Captured\n');
    }

    appendFileSync(memFile, entry);
    console.log(JSON.stringify({
      systemMessage: `[OMD] Saved to ${memFile}`
    }));
  }
} catch (e) {
  // Silent fail
}
