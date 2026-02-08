#!/usr/bin/env node
/**
 * Keyword Detector Hook
 * Detects magic keywords in user prompts and injects skill activation
 */

import { readFileSync } from 'fs';

const KEYWORDS = {
  'autopilot:': { skill: 'autopilot', description: 'Full autonomous execution' },
  'auto:': { skill: 'autopilot', description: 'Full autonomous execution' },
  'build me': { skill: 'autopilot', description: 'Full autonomous execution' },
  'create a': { skill: 'autopilot', description: 'Full autonomous execution' },
  'ralph:': { skill: 'ralph', description: 'Persistence mode' },
  'persist:': { skill: 'ralph', description: 'Persistence mode' },
  "don't stop until": { skill: 'ralph', description: 'Persistence mode' },
  'keep going until': { skill: 'ralph', description: 'Persistence mode' },
  'ultrawork:': { skill: 'ultrawork', description: 'Maximum parallel execution' },
  'ulw:': { skill: 'ultrawork', description: 'Maximum parallel execution' },
  'ultrapilot:': { skill: 'ultrapilot', description: 'Parallel autonomous execution' },
  'ulp:': { skill: 'ultrapilot', description: 'Parallel autonomous execution' },
  'swarm:': { skill: 'swarm', description: 'Coordinated multi-agent' },
  'ecomode:': { skill: 'ecomode', description: 'Token-efficient mode' },
  'eco:': { skill: 'ecomode', description: 'Token-efficient mode' },
  'pipeline:': { skill: 'pipeline', description: 'Sequential multi-stage processing' },
  'pipe:': { skill: 'pipeline', description: 'Sequential multi-stage processing' },
  'plan:': { skill: 'plan', description: 'Specification mode' },
  'spec:': { skill: 'plan', description: 'Specification mode' },
  'deepsearch:': { skill: 'deepsearch', description: 'Exhaustive codebase search' },
  'deep:': { skill: 'deepsearch', description: 'Exhaustive codebase search' },
  'analyze:': { skill: 'analyze', description: 'Deep codebase analysis' },
  'analysis:': { skill: 'analyze', description: 'Deep codebase analysis' },
};

try {
  const input = JSON.parse(readFileSync(0, 'utf-8'));
  const prompt = input.prompt || '';
  const promptLower = prompt.toLowerCase().trim();

  for (const [keyword, config] of Object.entries(KEYWORDS)) {
    if (promptLower.includes(keyword)) {
      const keywordIndex = promptLower.indexOf(keyword);
      const taskContent = prompt.slice(keywordIndex + keyword.length).trim();
      console.log(JSON.stringify({
        additionalContext: `[OMD] Detected "${keyword}" - Activating ${config.skill} skill for: ${taskContent}`
      }));
      break;
    }
  }
} catch (e) {
  // Silent fail - don't block user input
}
