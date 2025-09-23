import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs-extra';
import path from 'path';

const execAsync = promisify(exec);

export const componentTools: Tool[] = [
  {
    name: 'install-component',
    description: 'Installs a Wally UI component into the user project (equivalent to: npx wally-ui add {component})',
    inputSchema: {
      type: 'object',
      properties: {
        componentName: {
          type: 'string',
          description: 'Name of the component to install (e.g., button, breadcrumb)'
        }
      },
      required: ['componentName']
    }
  },
  {
    name: 'list-components',
    description: 'Lists all available components in the Wally UI library',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

export async function installComponent(componentName: string) {
  try {
    const angularJsonPath = path.resolve(process.cwd(), 'angular.json');
    const isAngularProject = await fs.pathExists(angularJsonPath);

    if (!isAngularProject) {
      return {
        success: false,
        message: 'Not an Angular project. This command must be run from an Angular project root directory.'
      };
    }

    const command = `npx wally-ui add ${componentName}`;
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 30000
    });

    const output = stdout || stderr;
    const isSuccess = !stderr || !stderr.includes('Error');

    return {
      success: isSuccess,
      message: isSuccess
        ? `Component '${componentName}' installed successfully via Wally UI CLI!`
        : `Failed to install component '${componentName}'`,
      cliOutput: output,
      command: command
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('Not an Angular project')) {
      return {
        success: false,
        message: 'Not an Angular project. Run this command from an Angular project root directory.'
      };
    }

    if (errorMessage.includes('Template not found')) {
      return {
        success: false,
        message: `Component '${componentName}' not found in Wally UI library.`
      };
    }

    return {
      success: false,
      message: `Error executing Wally UI CLI: ${errorMessage}`
    };
  }
}

export async function listComponents() {
  try {
    const command = 'npx wally-ui list';
    const { stdout, stderr } = await execAsync(command, {
      timeout: 15000
    });

    const output = stdout || stderr;
    const isSuccess = !stderr || !stderr.includes('Error');

    if (isSuccess) {
      const lines = output.split('\n').filter(line => line.trim());
      const components = lines
        .filter(line => line.includes('✓'))
        .map(line => {
          const match = line.match(/✓\s+(.+)/);
          return match ? match[1].trim() : null;
        })
        .filter(Boolean);

      return {
        success: true,
        message: 'Components listed successfully via Wally UI CLI!',
        availableComponents: components.map(name => ({
          name,
          status: 'ready',
          installCommand: `npx wally-ui add ${name}`
        })),
        totalComponents: components.length,
        cliOutput: output,
        command: command
      };
    } else {
      return {
        success: false,
        message: 'Failed to list components',
        cliOutput: output,
        command: command
      };
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      success: false,
      message: `Error executing Wally UI CLI: ${errorMessage}`,
      fallbackComponents: [
        {
          name: 'button',
          status: 'ready',
          installCommand: 'npx wally-ui add button'
        },
        {
          name: 'breadcrumb',
          status: 'ready',
          installCommand: 'npx wally-ui add breadcrumb'
        }
      ]
    };
  }
}