import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const docsTools: Tool[] = [
  {
    name: 'generate-docs',
    description: 'Generates documentation for Wally UI components',
    inputSchema: {
      type: 'object',
      properties: {
        componentName: {
          type: 'string',
          description: 'Name of the component to generate documentation for'
        }
      },
      required: ['componentName']
    }
  }
];

export async function generateDocs(componentName: string) {
  return {
    success: true,
    message: `Documentation generation for '${componentName}' - feature in development`
  };
}