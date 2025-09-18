#!/usr/bin/env node

import { Command } from "commander";
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

program
    .name('wally')
    .description('Angular component generator')
    .version('1.0.0');

program
    .command('add <component>')
    .description('Add a new component')
    .action(async (component) => {
        // Check if Angular project
        if (!fs.existsSync('angular.json')) {
            console.log(chalk.red('Not an Angular project. Run this in Angular project root.'));
            return;
        }

        const templatePath = path.join(__dirname, '..', 'templates', component);

        try {
            const typescriptFile = await fs.readFile(path.join(templatePath, `${component}.component.ts`), 'utf8');
            const htmlFile = await fs.readFile(path.join(templatePath, `${component}.component.html`), 'utf8');

            // Create component directory
            const componentPath = `src/app/components/${component}`;
            await fs.ensureDir(componentPath);

            // Write files
            await fs.writeFile(`${componentPath}/${component}.component.ts`, typescriptFile);
            await fs.writeFile(`${componentPath}/${component}.component.html`, htmlFile);

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
        const templatesPath: string = path.join(__dirname, '..', 'templates');

        try {
            const components: string[] = await fs.readdir(templatesPath);
            console.log(chalk.blue('\nAvailable components:'));
            components.forEach(component => {
                console.log(chalk.green(`  ✓ ${component}`));
            })
        } catch (error) {
            console.log(chalk.red('No templates found!'));
        }
    })

program.parse();