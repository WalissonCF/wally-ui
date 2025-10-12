#!/usr/bin/env node

import { Command } from "commander";
import readline from "readline";
import fs from "fs-extra";
import chalk from "chalk";
import path from "path";

console.log(chalk.whiteBright(`
██╗    ██╗ █████╗ ██╗     ██╗  ██╗   ██╗
██║    ██║██╔══██╗██║     ██║  ╚██╗ ██╔╝
██║ █╗ ██║███████║██║     ██║   ╚████╔╝ 
██║███╗██║██╔══██║██║     ██║    ╚██╔╝  
╚███╔███╔╝██║  ██║███████╗███████╗██║   
 ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝   
                                        
 Where’s Wally? Right here with Angular UI
 Stop searching, start building
`));

const program: Command = new Command();

const askConfirmation = (question: string) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.toLowerCase().trim() === 'y' || answer.toLowerCase().trim() === 'yes');
        });
    });
};

program
    .name('wally')
    .description('Angular component generator')
    .version('1.0.8');

program
    .command('add <component>')
    .description('Add a new component')
    .action(async (component) => {
        // Block AI components (coming soon in Chat SDK)
        if (component.startsWith('ai-')) {
            console.log(chalk.yellowBright(`\n AI components (${component}) are part of the Chat SDK (coming soon).`));
            console.log(chalk.blueBright('These components will be available via: ') + chalk.cyan('npx wally-ui add chat-sdk'));
            console.log(chalk.gray('Visit https://wally-ui.com/documentation/chat-sdk for more info.\n'));
            return;
        }

        // Check if Angular project
        if (!fs.existsSync('angular.json')) {
            console.log(chalk.redBright('Not an Angular project. Run this in Angular project root.'));
            return;
        }

        const componentPath = `src/app/components/wally-ui/${component}`;

        if (await fs.pathExists(componentPath)) {
            console.log(chalk.yellowBright(`Component '${component}' already exists at ${componentPath}`));
            const shouldOverwrite = await askConfirmation(
                chalk.blueBright('Do you want to overwrite it? ') + chalk.cyan('(y/N): ')
            );

            if (!shouldOverwrite) {
                console.log(chalk.gray('Operation cancelled.'));
                return;
            }
        }

        const playgroundPath = path.join(__dirname, '..', 'playground', 'showcase', 'src', 'app', 'components', component);

        try {
            if (!await fs.pathExists(playgroundPath)) {
                console.log(chalk.red(`Component '${component}' not found in playground`));
                return;
            }

            await fs.copy(playgroundPath, componentPath, {
                overwrite: true,
                errorOnExist: false
            });

            console.log(chalk.green('Template loaded successfully!'));
        } catch (error) {
            console.log(chalk.red(`Template not found: ${component}`));
        }
    });

program
    .command('list')
    .alias('ls')
    .description('List available components')
    .action(async () => {
        const playgroundComponentsPath: string = path.join(__dirname, '..', 'playground', 'showcase', 'src', 'app', 'components');

        try {
            const components: string[] = await fs.readdir(playgroundComponentsPath);
            console.log(chalk.blue('\nAvailable components:'));
            components.forEach(component => {
                console.log(chalk.green(`  ✓ ${component}`));
            })
        } catch (error) {
            console.log(chalk.red('Could not access playground components.'));
            console.log(chalk.yellow('Make sure playground/src/app/components/ exists.'));
        }
    })

program.parse();