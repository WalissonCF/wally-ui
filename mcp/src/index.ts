#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// Import our tools
import { componentTools, installComponent, listComponents } from './tools/component.js';
import { docsTools, generateDocs } from './tools/docs.js';
import { validationTools, validateComponent } from './tools/validation.js';

class WallyUIMCPServer {
  private server: Server;
  private tools: Tool[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'wally-ui-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupTools();
    this.setupHandlers();
  }

  private setupTools() {
    // Registrar todas as tools
    this.tools = [
      ...componentTools,
      ...docsTools,
      ...validationTools,
    ];
  }

  private setupHandlers() {
    // Handler to list tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.tools,
    }));

    // Handler to execute tools
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'install-component': {
            const { componentName } = args as { componentName: string };
            const installResult = await installComponent(componentName);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(installResult, null, 2),
                },
              ],
            };
          }
          case 'list-components': {
            const listResult = await listComponents();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(listResult, null, 2),
                },
              ],
            };
          }
          case 'validate-component': {
            const { componentName } = args as { componentName: string };
            const validateResult = await validateComponent(componentName);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(validateResult, null, 2),
                },
              ],
            };
          }
          case 'generate-docs': {
            const { componentName } = args as { componentName: string };
            const docsResult = await generateDocs(componentName);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(docsResult, null, 2),
                },
              ],
            };
          }
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Wally UI MCP Server running on stdio');
  }
}

const server = new WallyUIMCPServer();
server.run().catch(console.error);