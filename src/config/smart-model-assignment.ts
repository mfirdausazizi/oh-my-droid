import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const OMD_CONFIG_DIR = join(homedir(), '.omd');
const OMD_STATE_DIR = join(OMD_CONFIG_DIR, 'state');
const GLOBAL_CONFIG_PATH = join(OMD_CONFIG_DIR, 'config.json');
const STATE_PATH = join(OMD_STATE_DIR, 'smart-model-assignment.json');

interface SmartModelState {
  enabled: boolean;
  snapshots: Record<string, string>;
  updatedAt: string;
}

interface RuntimeBridgeResult {
  applied: boolean;
  enabled: boolean;
  scannedFiles: number;
  changedFiles: number;
  restoredFiles: number;
  skippedFiles: number;
  errors: string[];
}

function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function readState(): SmartModelState {
  if (!existsSync(STATE_PATH)) {
    return { enabled: true, snapshots: {}, updatedAt: new Date().toISOString() };
  }

  try {
    const parsed = JSON.parse(readFileSync(STATE_PATH, 'utf-8')) as Partial<SmartModelState>;
    return {
      enabled: parsed.enabled ?? true,
      snapshots: parsed.snapshots ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return { enabled: true, snapshots: {}, updatedAt: new Date().toISOString() };
  }
}

function writeState(state: SmartModelState): void {
  ensureDir(OMD_STATE_DIR);
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function updateGlobalConfig(enabled: boolean): void {
  ensureDir(OMD_CONFIG_DIR);

  let config: Record<string, unknown> = {};
  if (existsSync(GLOBAL_CONFIG_PATH)) {
    try {
      config = JSON.parse(readFileSync(GLOBAL_CONFIG_PATH, 'utf-8')) as Record<string, unknown>;
    } catch {
      config = {};
    }
  }

  const routing = (config.routing as Record<string, unknown> | undefined) ?? {};
  routing.smartModelAssignmentEnabled = enabled;
  config.routing = routing;

  writeFileSync(GLOBAL_CONFIG_PATH, JSON.stringify(config, null, 2));
}

function readConfiguredEnabled(): boolean | null {
  if (!existsSync(GLOBAL_CONFIG_PATH)) return null;

  try {
    const config = JSON.parse(readFileSync(GLOBAL_CONFIG_PATH, 'utf-8')) as {
      routing?: { smartModelAssignmentEnabled?: unknown };
    };
    if (typeof config.routing?.smartModelAssignmentEnabled === 'boolean') {
      return config.routing.smartModelAssignmentEnabled;
    }
  } catch {
    return null;
  }

  return null;
}

function getTargetDroidDirs(cwd: string): string[] {
  return [
    join(cwd, '.factory', 'droids'),
    join(homedir(), '.factory', 'droids'),
  ];
}

function getDroidFiles(cwd: string): string[] {
  const files: string[] = [];

  for (const dir of getTargetDroidDirs(cwd)) {
    if (!existsSync(dir)) continue;

    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(join(dir, entry.name));
      }
    }
  }

  return files;
}

function detectNewline(content: string): '\n' | '\r\n' {
  return content.includes('\r\n') ? '\r\n' : '\n';
}

function parseFrontmatter(content: string): { frontmatter: string; body: string; newline: '\n' | '\r\n' } | null {
  const newline = detectNewline(content);
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  return {
    frontmatter: match[1],
    body: match[2],
    newline,
  };
}

function composeFrontmatter(frontmatter: string, body: string, newline: '\n' | '\r\n'): string {
  return `---${newline}${frontmatter}${newline}---${newline}${body}`;
}

function writeAtomic(filePath: string, content: string): void {
  const tempPath = `${filePath}.omd-tmp`;
  writeFileSync(tempPath, content);
  renameSync(tempPath, filePath);
}

function readModel(frontmatter: string): string | null {
  const match = frontmatter.match(/^model:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function replaceModel(frontmatter: string, model: string): string {
  if (!/^model:\s*(.+)$/m.test(frontmatter)) {
    return `${frontmatter}\nmodel: ${model}`;
  }
  return frontmatter.replace(/^model:\s*(.+)$/m, `model: ${model}`);
}

export function getSmartModelAssignmentStatus(): boolean {
  const configured = readConfiguredEnabled();
  if (configured !== null) return configured;
  return readState().enabled;
}

export function setSmartModelAssignment(enabled: boolean, cwd: string = process.cwd()): RuntimeBridgeResult {
  const state = readState();
  const files = getDroidFiles(cwd);

  type PlannedUpdate = {
    filePath: string;
    nextContent: string;
    originalContent: string;
  };

  const updates: PlannedUpdate[] = [];
  const errors: string[] = [];

  let changedFiles = 0;
  let restoredFiles = 0;
  let skippedFiles = 0;

  for (const filePath of files) {
    const content = readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
      skippedFiles += 1;
      continue;
    }

    const currentModel = readModel(parsed.frontmatter);
    if (!currentModel) {
      skippedFiles += 1;
      continue;
    }

    if (!enabled) {
      if (currentModel !== 'inherit') {
        state.snapshots[filePath] = currentModel;
        const updatedFrontmatter = replaceModel(parsed.frontmatter, 'inherit');
        updates.push({
          filePath,
          nextContent: composeFrontmatter(updatedFrontmatter, parsed.body, parsed.newline),
          originalContent: content,
        });
        changedFiles += 1;
      }
      continue;
    }

    const originalModel = state.snapshots[filePath];
    if (!originalModel) {
      skippedFiles += 1;
      continue;
    }

    if (currentModel !== originalModel) {
      const updatedFrontmatter = replaceModel(parsed.frontmatter, originalModel);
      updates.push({
        filePath,
        nextContent: composeFrontmatter(updatedFrontmatter, parsed.body, parsed.newline),
        originalContent: content,
      });
      changedFiles += 1;
      restoredFiles += 1;
    }
  }

  const appliedUpdates: PlannedUpdate[] = [];
  for (const update of updates) {
    try {
      writeAtomic(update.filePath, update.nextContent);
      appliedUpdates.push(update);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown write error';
      errors.push(`Failed writing ${update.filePath}: ${message}`);
      break;
    }
  }

  if (errors.length > 0) {
    for (const applied of appliedUpdates) {
      try {
        writeAtomic(applied.filePath, applied.originalContent);
      } catch (rollbackError: unknown) {
        const message = rollbackError instanceof Error ? rollbackError.message : 'Unknown rollback error';
        errors.push(`Failed rollback ${applied.filePath}: ${message}`);
      }
    }

    return {
      applied: false,
      enabled: getSmartModelAssignmentStatus(),
      scannedFiles: files.length,
      changedFiles: 0,
      restoredFiles: 0,
      skippedFiles,
      errors,
    };
  }

  state.enabled = enabled;
  state.updatedAt = new Date().toISOString();

  try {
    writeState(state);
    updateGlobalConfig(enabled);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown persistence error';
    errors.push(`Failed persisting bridge state: ${message}`);

    for (const applied of appliedUpdates) {
      try {
        writeAtomic(applied.filePath, applied.originalContent);
      } catch (rollbackError: unknown) {
        const rollbackMessage = rollbackError instanceof Error ? rollbackError.message : 'Unknown rollback error';
        errors.push(`Failed rollback ${applied.filePath}: ${rollbackMessage}`);
      }
    }

    return {
      applied: false,
      enabled: getSmartModelAssignmentStatus(),
      scannedFiles: files.length,
      changedFiles: 0,
      restoredFiles: 0,
      skippedFiles,
      errors,
    };
  }

  return {
    applied: true,
    enabled,
    scannedFiles: files.length,
    changedFiles,
    restoredFiles,
    skippedFiles,
    errors,
  };
}
