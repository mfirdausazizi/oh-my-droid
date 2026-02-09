#!/usr/bin/env node
/**
 * Keyword Detector Hook
 * Detects magic keywords in user prompts and injects skill activation
 */

import { readFileSync } from 'fs';

const KEYWORDS = {
  'autopilot:': { skill: 'autopilot', description: 'Full autonomous execution' },
  'auto:': { skill: 'autopilot', description: 'Full autonomous execution' },
  'ship:': { skill: 'ship', description: 'Primary ship workflow' },
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

function sanitizePrompt(prompt) {
  return prompt
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, '')
    .replace(/\u001b\][^\u0007]*(\u0007|\u001b\\)/g, '');
}

function shouldSkipKeywordDetection(prompt) {
  const trimmed = prompt.trim();

  if (!trimmed) {
    return true;
  }

  if (/^\/[a-z0-9._-]+(?:\s|$)/i.test(trimmed)) {
    return true;
  }

  if (trimmed.includes('/omd-')) {
    return true;
  }

  if (trimmed.startsWith('---')) {
    return true;
  }

  return false;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findKeywordMatch(promptLower) {
  for (const [keyword, config] of Object.entries(KEYWORDS)) {
    const pattern = keyword.endsWith(':')
      ? new RegExp(`(^|\\s)${escapeRegex(keyword)}`, 'i')
      : new RegExp(`(^|\\s)${escapeRegex(keyword)}(?=\\s|$|[.,!?;:])`, 'i');

    const match = pattern.exec(promptLower);
    if (match) {
      return {
        keyword,
        config,
        index: match.index + match[1].length,
      };
    }
  }

  return null;
}

try {
  const input = JSON.parse(readFileSync(0, 'utf-8'));
  const prompt = sanitizePrompt(input.prompt || '');

  if (shouldSkipKeywordDetection(prompt)) {
    process.exit(0);
  }

  const promptLower = prompt.toLowerCase();
  const detected = findKeywordMatch(promptLower);

  if (detected) {
    const taskContent = prompt.slice(detected.index + detected.keyword.length).trim();
    console.log(JSON.stringify({
      additionalContext: `[OMD] Detected "${detected.keyword}" - Activating ${detected.config.skill} skill for: ${taskContent}`
    }));
  }
} catch (e) {
  // Silent fail - don't block user input
}
