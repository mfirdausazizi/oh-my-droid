/**
 * Commands System for Oh-My-Droid
 * Adapted from oh-my-claudecode for Droid
 *
 * Custom slash commands for Droid CLI
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export interface CommandInfo {
  name: string;
  description: string;
  usage: string;
  category: 'execution' | 'planning' | 'workflow' | 'quality' | 'utility';
  prompt: string;
}

export interface ExpandedCommand {
  command: string;
  prompt: string;
  metadata: CommandInfo;
}

// Command definitions
const COMMANDS: Record<string, CommandInfo> = {
  autopilot: {
    name: 'autopilot',
    description: 'Full autonomous execution with medium auto-run level',
    usage: '/autopilot [task description]',
    category: 'execution',
    prompt: `
Enter AUTOPILOT mode. Execute the following task with medium autonomy:
- You can edit files and run safe commands
- You cannot push to git or run destructive commands
- Verify completion before claiming done

Task: {{args}}
`,
  },
  'omd-ship': {
    name: 'omd-ship',
    description: 'Recommended primary flow: deepsearch/analyze -> ralplan -> ralph -> code-review',
    usage: '/omd-ship [task description]',
    category: 'workflow',
    prompt: `
Enter SHIP workflow mode. Execute this staged flow with concise handoff between stages:

Stage 1 (Discovery) - Auto-pick using this explicit rule:
- deepsearch = find where/how implemented
- analyze = explain behavior/root cause/tradeoffs

Stage 2 (Planning): run ralplan
Stage 3 (Execution): run ralph
Stage 4 (Review): run code-review

Task: {{args}}
`,
  },
  ralph: {
    name: 'ralph',
    description: 'Persistence mode - continues until verified complete',
    usage: '/ralph [task description]',
    category: 'execution',
    prompt: `
Enter RALPH mode. You CANNOT stop until VERIFIED complete:
1. Track ALL steps with TodoWrite
2. Verify through oracle agent
3. If rejected, continue fixing
4. Only stop when oracle approves

Task: {{args}}
`,
  },
  plan: {
    name: 'plan',
    description: 'Specification mode with planning interview',
    usage: '/plan [feature description]',
    category: 'planning',
    prompt: `
Enter PLAN mode. Create detailed specification:
1. Analyze requirements
2. Create implementation plan
3. Get user approval
4. Then implement

Feature: {{args}}
`,
  },
  analyze: {
    name: 'analyze',
    description: 'Deep codebase analysis',
    usage: '/analyze [target]',
    category: 'planning',
    prompt: `
Enter ANALYZE mode. Deep codebase analysis:
1. Read key files
2. Search for patterns
3. Understand architecture
4. Report comprehensive findings

Target: {{args}}
`,
  },
  swarm: {
    name: 'swarm',
    description: 'Launch coordinated parallel agents',
    usage: '/swarm [count] [task]',
    category: 'workflow',
    prompt: `
Enter SWARM mode. Launch parallel agents:
1. Break into independent subtasks
2. Spawn {{count}} droids in parallel
3. Coordinate execution
4. Aggregate results

Task: {{args}}
`,
  },
  'code-review': {
    name: 'code-review',
    description: 'AI-powered code review',
    usage: '/code-review [target]',
    category: 'quality',
    prompt: `
Enter CODE REVIEW mode:
1. Review code for quality
2. Check best practices
3. Identify issues
4. Suggest improvements

Target: {{args}}
`,
  },
  security: {
    name: 'security',
    description: 'Security audit',
    usage: '/security [target]',
    category: 'quality',
    prompt: `
Enter SECURITY mode:
1. Scan for vulnerabilities
2. Check auth/authz
3. Review secret handling
4. Provide remediation

Target: {{args}}
`,
  },
  'git-master': {
    name: 'git-master',
    description: 'Git workflow automation',
    usage: '/git-master [command]',
    category: 'utility',
    prompt: `
Enter GIT-MASTER mode:
1. Follow proper git workflow
2. Create meaningful commits
3. Handle branching
4. Manage PR workflow

Command: {{args}}
`,
  },
  note: {
    name: 'note',
    description: 'Manage notepad wisdom',
    usage: '/note [action] [content]',
    category: 'utility',
    prompt: `
Manage notepad:
- /note learning [content]
- /note decision [content]
- /note issue [content]
- /note summary

Action: {{args}}
`,
  },
  hud: {
    name: 'hud',
    description: 'Toggle status line',
    usage: '/hud [on|off]',
    category: 'utility',
    prompt: `
Toggle HUD status line:
- /hud on - Enable status line
- /hud off - Disable status line

Action: {{args}}
`,
  },
  'omd-setup': {
    name: 'omd-setup',
    description: 'Setup Oh-My-Droid',
    usage: '/omd-setup',
    category: 'utility',
    prompt: `
Run Oh-My-Droid setup:
1. Install custom droids
2. Configure skills
3. Setup hooks
4. Initialize project
`,
  },
  'omd-setting': {
    name: 'omd-setting',
    description: 'Toggle smart model assignment for custom droids',
    usage: '/omd-setting',
    category: 'utility',
    prompt: `
Manage smart model assignment runtime bridge with interactive selection:

1) Ask user using AskUser with options: Enable / Disable / Status.
2) Execute backend update directly (no omd CLI dependency):
   - droid dirs: ./.factory/droids and ~/.factory/droids
   - state file: ~/.omd/state/smart-model-assignment.json
3) Disable: snapshot current non-inherit model, then set model to inherit.
4) Enable: restore snapshot when usable; otherwise select from ~/.factory/settings.json customModels using tier-aware fallback, else inherit.
5) Status: report enabled flag and scanned/changed/skipped counts.
6) Return concise result summary.
`,
  },
};

/**
 * Get a command by name
 */
export function getCommand(name: string): CommandInfo | undefined {
  return COMMANDS[name];
}

/**
 * Get all commands
 */
export function getAllCommands(): Record<string, CommandInfo> {
  return { ...COMMANDS };
}

/**
 * List all commands
 */
export function listCommands(): string {
  const lines: string[] = ['## Oh-My-Droid Commands\n'];

  const categories: Record<string, string[]> = {};
  for (const [name, info] of Object.entries(COMMANDS)) {
    if (!categories[info.category]) {
      categories[info.category] = [];
    }
    categories[info.category].push(`/${name} - ${info.description}`);
  }

  for (const [category, commands] of Object.entries(categories)) {
    lines.push(`\n### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
    lines.push(...commands.sort());
  }

  return lines.join('\n');
}

/**
 * Check if a command exists
 */
export function commandExists(name: string): boolean {
  return name in COMMANDS;
}

/**
 * Expand a command with arguments
 */
export function expandCommand(name: string, args: string): ExpandedCommand | null {
  const command = getCommand(name);
  if (!command) return null;

  // Parse count for swarm command
  let count = '';
  let remainingArgs = args;
  if (name === 'swarm') {
    const parts = args.split(' ');
    count = parts[0];
    remainingArgs = parts.slice(1).join(' ');
  }

  const prompt = command.prompt
    .replace('{{args}}', remainingArgs)
    .replace('{{count}}', count);

  return {
    command: name,
    prompt,
    metadata: command,
  };
}

/**
 * Expand a command prompt (for use in system prompts)
 */
export function expandCommandPrompt(input: string): string {
  // Check for slash command
  const match = input.match(/^\/([a-z-]+)(?:\s+(.+))?$/i);
  if (!match) return input;

  const [, command, args = ''] = match;
  const expanded = expandCommand(command, args);

  return expanded?.prompt || input;
}

/**
 * Get commands directory path
 */
export function getCommandsDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '..', 'commands');
}
