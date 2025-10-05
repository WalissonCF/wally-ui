# Wally UI

A modern Angular component library with individual component installation, Tailwind CSS styling, and enterprise-grade accessibility.

[![npm version](https://img.shields.io/npm/v/wally-ui.svg)](https://www.npmjs.com/package/wally-ui)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**[Live Documentation](https://wally-ui.com/)**

## Installation

### List all available components
```bash
npx wally-ui list
```

### Install a component
```bash
npx wally-ui add button
npx wally-ui add input
npx wally-ui add carousel
npx wally-ui add breadcrumb
```

Components are installed directly into `src/app/components/wally-ui/{component}/`

## Requirements

- Tailwind CSS v3 or v4
- Node.js 18+
- Angular 17+

## Available Components

| Component | Status | Features |
|-----------|--------|----------|
| **Button** | Production | Variants (primary, secondary), loading states, ARIA support |
| **Input** | Production | Form integration, validation, password toggle, loading states |
| **Carousel** | Production | Touch gestures, keyboard navigation, circular buffer algorithm |
| **Breadcrumb** | Production | Semantic HTML, ARIA navigation, responsive design |

## Quick Start

### Basic Usage
```typescript
import { Component } from '@angular/core';
import { Button } from './components/wally-ui/button/button';

@Component({
  selector: 'app-example',
  imports: [Button],
  template: `
    <wally-button variant="primary">Click me</wally-button>
  `
})
export class ExampleComponent {}
```

### Reactive Forms Integration
```typescript
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from './components/wally-ui/input/input';

@Component({
  selector: 'app-form',
  imports: [Input, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <wally-input
        formControlName="email"
        label="Email"
        type="email">
      </wally-input>
    </form>
  `
})
export class FormComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}
}
```

## Component Examples

### Button Component
```html
<!-- Variants -->
<wally-button variant="primary">Primary Button</wally-button>
<wally-button variant="secondary">Secondary Button</wally-button>

<!-- States -->
<wally-button [loading]="true">Loading...</wally-button>
<wally-button [disabled]="true">Disabled</wally-button>
```

### Input Component
```html
<!-- Basic input -->
<wally-input label="Username" placeholder="Enter username"></wally-input>

<!-- Password with toggle -->
<wally-input type="password" label="Password"></wally-input>

<!-- States -->
<wally-input [loading]="true"></wally-input>
<wally-input [valid]="true"></wally-input>
<wally-input errorMessage="Required field"></wally-input>
```

### Carousel Component
```html
<wally-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</wally-carousel>
```

### Breadcrumb Component
```html
<wally-breadcrumb [items]="[
  { label: 'Home', link: '/' },
  { label: 'Components', link: '/components' },
  { label: 'Button' }
]"></wally-breadcrumb>
```

## Project Structure

Components install into:
```
src/app/components/wally-ui/{component}/
├── {component}.ts      # Component logic
└── {component}.html    # Template
```

## Features

- Zero configuration - install only what you need
- Enterprise-grade accessibility with ARIA support
- Dark mode support out of the box
- Server-Side Rendering compatible
- Angular Signals architecture
- TypeScript interfaces included
- Copy-paste ready examples

## Documentation

Full documentation and live examples: **[wally-ui.com](https://wally-ui.com/)**

## License

MIT