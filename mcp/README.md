# Wally UI MCP Server

MCP (Model Context Protocol) Server for [Wally UI](https://wally-ui.com/) - An Angular component library with intelligent AI-powered installation tools.

## Features

- **Install Components**: Install Wally UI components directly into Angular projects
- **List Components**: Browse available components in the library
- **Validate Components**: Check component integrity and structure
- **Generate Docs**: Create documentation for components (coming soon)

## Installation

```bash
npm install -g wally-ui-mcp
```

## Configuration

Add to your Claude Desktop configuration file:

**Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "wally-ui": {
      "command": "npx",
      "args": ["wally-ui-mcp"],
      "env": {}
    }
  }
}
```

## Available Tools

### `install-component`
Installs a Wally UI component into your Angular project.

**Parameters:**
- `componentName` (string): Name of the component to install

**Example:**
```
install-component componentName="button"
```

### `list-components`
Lists all available components in the Wally UI library.

**Example:**
```
list-components
```

### `validate-component`
Validates component structure and integrity.

**Parameters:**
- `componentName` (string): Name of the component to validate

### `generate-docs`
Generates documentation for components (feature in development).

**Parameters:**
- `componentName` (string): Name of the component to document

## Requirements

- Node.js 18+
- Angular project (for component installation)
- Claude Desktop with MCP support

## Usage

Once configured, the tools will be available in Claude Desktop. You can:

1. Ask Claude to list available components
2. Request installation of specific components
3. Validate component integrity
4. Generate documentation

Example conversation:
```
User: "Show me the available Wally UI components"
Claude: [uses list-components tool]

User: "Install the button component in my project"
Claude: [uses install-component with componentName="button"]
```

## Development

```bash
# Clone the repository
git clone https://github.com/WalissonCF/wally-ui.git
cd wally-ui/mcp

# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev
```

## License

MIT - See [LICENSE](../LICENSE) file for details.

## Links

- [Wally UI Documentation](https://wally-ui.com/)
- [Wally UI CLI](https://www.npmjs.com/package/wally-ui)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Issues](https://github.com/WalissonCF/wally-ui/issues)