---
name: mcp-setup
description: Use when user wants to configure MCP servers for enhanced agent capabilities like web search or GitHub
---

# MCP Setup Skill

Configure Model Context Protocol (MCP) servers to extend Droid's capabilities.

## Available MCP Servers

| Server | Purpose | API Key Required |
|--------|---------|------------------|
| Context7 | Documentation and code context | No |
| Exa | Enhanced web search | Yes (exa.ai) |
| Filesystem | Extended file system access | No |
| GitHub | GitHub API integration | Yes (PAT) |

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
    },
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
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
