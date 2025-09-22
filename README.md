# Wally UI

A modern Angular component library built with standalone components and Tailwind CSS. Wally UI provides a collection of reusable, accessible components that integrate seamlessly into your Angular applications.

**[Live Demo](https://wally-ui.com/)**

## Features

- Built for Angular 17+ with standalone component architecture
- Server-Side Rendering (SSR) support
- Dark mode support out of the box
- Tailwind CSS v3/v4 styling
- TypeScript interfaces and type safety
- Individual component installation
- Zero configuration setup

## Requirements

- Angular 17+ (required for standalone component support)
- Tailwind CSS v3 or v4
- Node.js 18+

## Installation

Install components individually using the CLI:

```bash
# Install specific component
npx wally-ui add button

# List all available components
npx wally-ui list
```

## Project Structure

When installing a component, Wally UI creates the following structure:

```
src/
└── app/
    └── components/
        └── wally-ui/
            └── button/
                ├── button.ts
                └── button.html
```

## Quick Start

1. Install a component:
```bash
npx wally-ui add button
```

2. Import and use in your component:
```typescript
import { Component } from '@angular/core';
import { Button } from './components/wally-ui/button/button';

@Component({
  selector: 'app-example',
  imports: [Button],
  template: `<wally-button text="Click me"></wally-button>`
})
export class ExampleComponent {}
```

## Development Status

Wally UI is currently in experimental development. Components are being actively developed and new features are continuously added. More components will be available soon.

## Documentation

Visit [wally-ui.com](https://wally-ui.com/) for complete documentation, examples, and component API references.

## License

MIT