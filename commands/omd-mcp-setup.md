---
description: Configure MCP servers for enhanced agent capabilities
---

# MCP Setup

Configure Model Context Protocol (MCP) servers to extend Droid's capabilities with external tools like web search, file system access, and GitHub integration.

## Available MCP Servers

1. **Context7** - Documentation and code context from popular libraries
2. **Exa Web Search** - Enhanced web search
3. **Filesystem** - Extended file system access
4. **GitHub** - GitHub API integration for issues, PRs, and repository management

## Setup Process

### Step 1: Choose Servers
Select which MCP servers to configure.

### Step 2: Gather API Keys
- **Context7**: No API key required
- **Exa**: Get key at https://exa.ai
- **GitHub**: Create token at https://github.com/settings/tokens

### Step 3: Update Settings
Add to `~/.factory/settings.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "<your-key>"
      }
    }
  }
}
```

### Step 4: Restart Droid
Restart Droid for changes to take effect.

## Troubleshooting

- Ensure Node.js 18+ is installed
- Check for JSON syntax errors in settings.json
- Run `/omd-doctor` to diagnose issues

$ARGUMENTS
