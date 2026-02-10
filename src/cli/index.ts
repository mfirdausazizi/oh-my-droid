#!/usr/bin/env node
/**
 * Oh-My-Droid CLI
 *
 * Command-line interface for managing OMD
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { install, uninstall, isInstalled, getInstallInfo, installProject } from '../installer/index.js';
import { getAgentDefinitions } from '../agents/definitions.js';
import { listCommands } from '../commands/index.js';
import { getSmartModelAssignmentStatus, setSmartModelAssignment } from '../config/smart-model-assignment.js';
import { VERSION, PACKAGE_NAME } from '../index.js';

const program = new Command();

program
  .name('omd')
  .description('Oh-My-Droid - Multi-agent orchestration for Factory Droid')
  .version(VERSION);

// Install command
program
  .command('install')
  .description('Install Oh-My-Droid')
  .option('-g, --global', 'Install globally', true)
  .option('-p, --project', 'Install to current project')
  .option('--no-droids', 'Skip installing custom droids')
  .option('--no-skills', 'Skip installing skills')
  .option('--no-hooks', 'Skip installing hooks')
  .option('-f, --force', 'Force reinstall')
  .action((options) => {
    console.log(chalk.blue('Installing Oh-My-Droid...'));

    const result = install({
      global: options.global,
      droids: options.droids,
      skills: options.skills,
      hooks: options.hooks,
      force: options.force,
    });

    if (result.project) {
      const projectResult = installProject();
      result.installed.push(...projectResult.installed);
      result.errors.push(...projectResult.errors);
    }

    if (result.success) {
      console.log(chalk.green('✓ Installation successful'));
      result.installed.forEach((item) => console.log(chalk.gray(`  - ${item}`)));
    } else {
      console.log(chalk.red('✗ Installation failed'));
      result.errors.forEach((err) => console.log(chalk.red(`  - ${err}`)));
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach((warn) => console.log(chalk.yellow(`⚠ ${warn}`)));
    }
  });

// Uninstall command
program
  .command('uninstall')
  .description('Uninstall Oh-My-Droid')
  .action(() => {
    console.log(chalk.blue('Uninstalling Oh-My-Droid...'));

    const result = uninstall();

    if (result.success) {
      console.log(chalk.green('✓ Uninstalled successfully'));
    } else {
      console.log(chalk.red('✗ Uninstall failed'));
      result.errors.forEach((err) => console.log(chalk.red(`  - ${err}`)));
    }
  });

// Status command
program
  .command('status')
  .description('Check Oh-My-Droid status')
  .action(() => {
    const info = getInstallInfo();

    console.log(chalk.blue('Oh-My-Droid Status'));
    console.log(chalk.gray('─'.repeat(40)));
    console.log(`Installed: ${info.installed ? chalk.green('Yes') : chalk.red('No')}`);
    console.log(`Version: ${chalk.cyan(info.version)}`);
    console.log(`Custom Droids: ${chalk.cyan(info.droidsInstalled)}`);
    console.log(`Skills: ${chalk.cyan(info.skillsInstalled)}`);
  });

// Agents command
program
  .command('agents')
  .description('List available custom droids')
  .action(() => {
    const agents = getAgentDefinitions();

    console.log(chalk.blue('Available Custom Droids'));
    console.log(chalk.gray('─'.repeat(40)));

    for (const [name, config] of Object.entries(agents)) {
      const model = config.model || 'inherit';
      console.log(`${chalk.cyan(name)} ${chalk.gray(`(${model})`)}`);
      console.log(chalk.gray(`  ${config.description}`));
    }
  });

// Commands command
program
  .command('commands')
  .description('List available slash commands')
  .action(() => {
    console.log(chalk.blue(listCommands()));
  });

// Setup command (alias for install)
program
  .command('setup')
  .description('Setup Oh-My-Droid (alias for install)')
  .action(() => {
    console.log(chalk.blue('Setting up Oh-My-Droid...'));

    const result = install();

    if (result.success) {
      console.log(chalk.green('✓ Setup complete'));
      console.log(chalk.gray('\nNext steps:'));
      console.log(chalk.gray('1. Use magic keywords: autopilot:, ralph:, ulw:'));
      console.log(chalk.gray('2. Try slash commands: /autopilot, /ralph, /plan'));
      console.log(chalk.gray('3. Spawn custom droids: Task(subagent_type="oracle", ...)'));
    } else {
      console.log(chalk.red('✗ Setup failed'));
      result.errors.forEach((err) => console.log(chalk.red(`  - ${err}`)));
    }
  });

// Settings command
program
  .command('setting')
  .description('Manage OMD settings')
  .argument('<key>', 'Setting key (currently supports smart-model-assignment)')
  .argument('[value]', 'on | off | status')
  .action((key: string, value?: string) => {
    if (key !== 'smart-model-assignment') {
      console.log(chalk.red(`Unsupported setting: ${key}`));
      console.log(chalk.gray('Supported settings: smart-model-assignment'));
      return;
    }

    const normalized = (value || 'status').toLowerCase();
    if (normalized === 'status') {
      const enabled = getSmartModelAssignmentStatus();
      console.log(
        chalk.blue(
          `smart-model-assignment: ${enabled ? chalk.green('enabled') : chalk.yellow('disabled')}`
        )
      );
      return;
    }

    if (!['on', 'off'].includes(normalized)) {
      console.log(chalk.red(`Invalid value: ${value}`));
      console.log(chalk.gray('Use: on | off | status'));
      return;
    }

    const enabled = normalized === 'on';
    const result = setSmartModelAssignment(enabled);

    if (!result.applied) {
      console.log(chalk.red('Failed to update smart-model-assignment'));
      result.errors.forEach((error) => console.log(chalk.red(`  - ${error}`)));
      process.exitCode = 1;
      return;
    }

    console.log(
      chalk.blue(
        `smart-model-assignment ${enabled ? chalk.green('enabled') : chalk.yellow('disabled')}`
      )
    );
    console.log(chalk.gray(`Scanned: ${result.scannedFiles}`));
    console.log(chalk.gray(`Changed: ${result.changedFiles}`));
    if (enabled) {
      console.log(chalk.gray(`Restored: ${result.restoredFiles}`));
    }
    if (result.skippedFiles > 0) {
      console.log(chalk.gray(`Skipped: ${result.skippedFiles}`));
    }
    if (result.errors.length > 0) {
      result.errors.forEach((error) => console.log(chalk.yellow(`Warning: ${error}`)));
    }
  });

// Run CLI
program.parse();
