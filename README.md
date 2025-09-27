# Wally UI

> A modern Angular component library built with standalone components, Tailwind CSS, and enterprise-grade accessibility.

[![npm version](https://img.shields.io/npm/v/wally-ui.svg)](https://www.npmjs.com/package/wally-ui)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**[Live Demo & Documentation](https://wally-ui.com/)**

## Why Wally UI?

- **Zero Configuration**: Install components individually - no bloated bundles
- **Accessibility First**: Enterprise-grade a11y with ARIA support and screen reader compatibility
- **Dark Mode Native**: Complete light/dark theme support out of the box
- **SSR Ready**: Full Server-Side Rendering support for performance
- **Tailwind Powered**: Beautiful, customizable styling with Tailwind CSS v3/v4

## Requirements

- **Tailwind CSS v3 or v4**
- **Node.js 18+**

## 📦 Available Components

| Component | Status | Description |
|-----------|--------|-------------|
| **Input** | ✅ **New** | Full-featured input with validation, loading states, and FormGroup support |
| **Button** | 🚧 Under Construction | Versatile button with loading states and notifications |
| **Breadcrumb** | 🚧 Under Construction | Navigation breadcrumb component |

## 🚀 Quick Start

### 1. Install a component
```bash
# Install the Input component (recommended for forms)
npx wally-ui add input

# Install other components
npx wally-ui add button

# List all available components
npx wally-ui list
```

### 2. Import and use in your Angular component
```typescript
import { Component } from '@angular/core';
import { Input } from './components/wally-ui/input/input';

@Component({
  selector: 'app-example',
  imports: [Input], // Standalone component import
  template: `
    <wally-input
      label="Email Address"
      type="email"
      placeholder="Enter your email">
    </wally-input>
  `
})
export class ExampleComponent {}
```

### 3. For reactive forms (recommended)
```typescript
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Input } from './components/wally-ui/input/input';

@Component({
  imports: [Input, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm">
      <wally-input
        formControlName="email"
        label="Email"
        type="email"
        [valid]="isFieldValid('email')"
        [errorMessage]="getFieldError('email')">
      </wally-input>
    </form>
  `
})
export class FormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}
```

## Project Structure

Components are installed directly into your project with zero dependencies:

```
src/app/components/wally-ui/
├── input/
│   ├── input.ts      # Component logic with Angular signals
│   └── input.html    # Template with Tailwind styling
└── button/
    ├── button.ts
    └── button.html
```

## Features Showcase

### Input Component (v1.5.0)
```html
<!-- All input states supported -->
<wally-input label="Username" placeholder="Enter username"></wally-input>
<wally-input [loading]="true" placeholder="Processing..."></wally-input>
<wally-input [valid]="true" placeholder="Valid input"></wally-input>
<wally-input errorMessage="Field is required"></wally-input>
<wally-input [disabled]="true" placeholder="Disabled input"></wally-input>

<!-- Password with toggle -->
<wally-input type="password" label="Password"></wally-input>

<!-- FormGroup integration -->
<wally-input formControlName="email" type="email"></wally-input>
```

**Features:**
- ✅ Complete ControlValueAccessor implementation
- ✅ Angular Signals architecture (Angular 20+ optimized)
- ✅ Loading, valid, error, disabled states
- ✅ Password visibility toggle
- ✅ Full accessibility (ARIA attributes, screen readers)
- ✅ Dark mode support
- ✅ TypeScript interfaces

## AI Assistant Ready

This library is designed to work seamlessly with AI coding assistants:

- **Clear Documentation**: Comprehensive examples and API references
- **Semantic Naming**: Intuitive component and property names
- **Copy-Paste Ready**: All examples work out of the box
- **IntelliSense**: Full TypeScript support for autocomplete

## Documentation & Examples

- **[Complete Documentation](https://wally-ui.com/documentation)**
- **[Component Examples](https://wally-ui.com/documentation/components)**
- **[Live Playground](https://wally-ui.com/)**

## Roadmap

- [ ] **Select Component** - Dropdown with search and multi-select
- [ ] **Modal Component** - Overlay dialogs and popups
- [ ] **Table Component** - Data tables with sorting and pagination
- [ ] **Form Component** - Complete form wrapper with validation
- [ ] **Card Component** - Content containers
- [ ] **Badge Component** - Status indicators

## License

MIT © [Walisson Carvalho](https://github.com/walissoncarvalho)

---

**Built with for the Angular community**