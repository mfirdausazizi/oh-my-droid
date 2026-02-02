#!/usr/bin/env node
/**
 * Keyword Detector Hook
 * Detects magic keywords in user prompts and injects skill activation
 */

import { readFileSync } from 'fs';

const KEYWORDS = {
  'autopilot:': { skill: 'autopilot', description: 'Full autonomous execution' },
  'ralph:': { skill: 'ralph', description: 'Persistence mode' },
  'ultrawork:': { skill: 'ultrawork', description: 'Maximum parallel execution' },
  'ulw:': { skill: 'ultrawork', description: 'Maximum parallel execution' },
  'swarm:': { skill: 'swarm', description: 'Coordinated multi-agent' },
  'eco:': { skill: 'ecomode', description: 'Token-efficient mode' },
  'plan:': { skill: 'plan', description: 'Specification mode' },
};

try {
  const input = JSON.parse(readFileSync(0, 'utf-8'));
  const prompt = input.prompt || '';
  const promptLower = prompt.toLowerCase().trim();

  for (const [keyword, config] of Object.entries(KEYWORDS)) {
    if (promptLower.startsWith(keyword)) {
      const taskContent = prompt.slice(keyword.length).trim();
      console.log(JSON.stringify({
        additionalContext: `[OMD] Detected "${keyword}" - Activating ${config.skill} skill for: ${taskContent}`
      }));
      break;
    }
  }
} catch (e) {
  // Silent fail - don't block user input
}
