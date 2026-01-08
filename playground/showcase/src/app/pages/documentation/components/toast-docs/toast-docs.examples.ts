// Toast documentation code examples
export const ToastCodeExamples = {
  // Installation
  installation: `npx wally-ui add toast`,

  // Import examples
  import: `import { Toast } from './components/wally-ui/toast/toast';`,
  serviceImport: `import { ToastService } from './components/wally-ui/toast/lib/services/toast.service';`,
  componentImport: `@Component({
  selector: 'app-root',
  imports: [Toast],
  template: \`
    <wally-toast />
    <router-outlet />
  \`
})`,

  // Setup in app component
  setupExample: `// app.component.ts
import { Component } from '@angular/core';
import { Toast } from './components/wally-ui/toast/toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet],
  template: \`
    <!-- Add toast container once at root level -->
    <wally-toast />

    <!-- Rest of your app -->
    <router-outlet />
  \`
})
export class AppComponent {}`,

  // Basic usage
  basicUsage: `// In any component
import { ToastService } from './components/wally-ui/toast/lib/services/toast.service';

export class ExampleComponent {
  private toastService = inject(ToastService);

  showToast() {
    this.toastService.create({
      type: 'success',
      message: 'Operation completed successfully!'
    });
  }
}`,

  // === TYPES ===

  // Success
  successType: `this.toastService.create({
  type: 'success',
  title: 'Success!',
  message: 'Your changes have been saved.'
});`,

  // Error
  errorType: `this.toastService.create({
  type: 'error',
  title: 'Error',
  message: 'Something went wrong. Please try again.'
});`,

  // Info
  infoType: `this.toastService.create({
  type: 'info',
  title: 'Info',
  message: 'You have 3 unread notifications.'
});`,

  // Warning
  warningType: `this.toastService.create({
  type: 'warning',
  title: 'Warning',
  message: 'Your session will expire in 5 minutes.'
});`,

  // Loading
  loadingType: `// Loading toast (no auto-dismiss)
const loadingToastId = this.toastService.create({
  type: 'loading',
  message: 'Processing your request...'
});

// Later, remove it manually
setTimeout(() => {
  this.toastService.remove(loadingToastId);
}, 3000);`,

  // Neutral
  neutralType: `// Neutral toast (no icon, no auto-dismiss)
const neutralToastId = this.toastService.create({
  type: 'neutral',
  title: 'Information',
  message: 'This is a neutral toast without an icon.'
});

// Later, remove it manually
setTimeout(() => {
  this.toastService.remove(neutralToastId);
}, 3000);`,

  // === POSITIONS ===

  // Top positions
  topLeft: `this.toastService.create({
  type: 'success',
  message: 'Top left position',
  position: 'top-left'
});`,

  topCenter: `this.toastService.create({
  type: 'success',
  message: 'Top center position (default)',
  position: 'top-center'
});`,

  topRight: `this.toastService.create({
  type: 'success',
  message: 'Top right position',
  position: 'top-right'
});`,

  // Center positions
  centerLeft: `this.toastService.create({
  type: 'info',
  message: 'Center left position',
  position: 'center-left'
});`,

  centerCenter: `this.toastService.create({
  type: 'info',
  message: 'Center position',
  position: 'center'
});`,

  centerRight: `this.toastService.create({
  type: 'info',
  message: 'Center right position',
  position: 'center-right'
});`,

  // Bottom positions
  bottomLeft: `this.toastService.create({
  type: 'warning',
  message: 'Bottom left position',
  position: 'bottom-left'
});`,

  bottomCenter: `this.toastService.create({
  type: 'warning',
  message: 'Bottom center position',
  position: 'bottom-center'
});`,

  bottomRight: `this.toastService.create({
  type: 'warning',
  message: 'Bottom right position',
  position: 'bottom-right'
});`,

  // === CONFIGURATION ===

  // Custom duration
  customDuration: `this.toastService.create({
  type: 'success',
  message: 'This will stay for 10 seconds',
  duration: 10000 // milliseconds
});`,

  // No auto-dismiss
  noDismiss: `this.toastService.create({
  type: 'error',
  message: 'This toast will stay until manually closed',
  duration: 0
});`,

  // Set default position globally
  defaultPosition: `// In app initialization (app.component.ts or main.ts)
export class AppComponent {
  constructor(private toastService: ToastService) {
    // Set default position for all toasts
    this.toastService.setDefaultPosition('bottom-right');
  }
}`,

  // === PRODUCTION EXAMPLES ===

  // Form submission
  formExample: `// Form submission example
export class LoginComponent {
  private toastService = inject(ToastService);

  async onSubmit() {
    const loadingId = this.toastService.create({
      type: 'loading',
      message: 'Signing in...'
    });

    try {
      await this.authService.login(this.credentials);

      // Remove loading toast
      this.toastService.remove(loadingId);

      // Show success
      this.toastService.create({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully signed in.'
      });
    } catch (error) {
      // Remove loading toast
      this.toastService.remove(loadingId);

      // Show error
      this.toastService.create({
        type: 'error',
        title: 'Login failed',
        message: error.message
      });
    }
  }
}`,

  // File upload
  uploadExample: `// File upload with progress
export class UploadComponent {
  private toastService = inject(ToastService);

  async uploadFile(file: File) {
    const uploadingId = this.toastService.create({
      type: 'loading',
      message: 'Uploading file...'
    });

    try {
      await this.fileService.upload(file);

      this.toastService.remove(uploadingId);
      this.toastService.create({
        type: 'success',
        title: 'Upload complete',
        message: \`\${file.name} has been uploaded successfully.\`
      });
    } catch (error) {
      this.toastService.remove(uploadingId);
      this.toastService.create({
        type: 'error',
        title: 'Upload failed',
        message: 'Failed to upload file. Please try again.'
      });
    }
  }
}`,

  // Delete confirmation
  deleteExample: `// Delete with confirmation
export class UserListComponent {
  private toastService = inject(ToastService);

  async deleteUser(userId: string) {
    try {
      await this.userService.delete(userId);

      this.toastService.create({
        type: 'success',
        message: 'User deleted successfully',
        position: 'bottom-right'
      });
    } catch (error) {
      this.toastService.create({
        type: 'error',
        title: 'Delete failed',
        message: 'Unable to delete user. Please try again.',
        position: 'bottom-right'
      });
    }
  }
}`,

  // Clipboard copy
  clipboardExample: `// Clipboard copy feedback
export class CodeExampleComponent {
  private toastService = inject(ToastService);

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      this.toastService.create({
        type: 'success',
        message: 'Copied to clipboard!',
        duration: 2000,
        position: 'bottom-center'
      });
    } catch (error) {
      this.toastService.create({
        type: 'error',
        message: 'Failed to copy',
        duration: 2000
      });
    }
  }
}`,

  // Network status
  networkExample: `// Network status monitoring
export class NetworkService {
  private toastService = inject(ToastService);

  constructor() {
    window.addEventListener('online', () => {
      this.toastService.create({
        type: 'success',
        title: 'Back online',
        message: 'Your connection has been restored.',
        position: 'top-center'
      });
    });

    window.addEventListener('offline', () => {
      this.toastService.create({
        type: 'warning',
        title: 'No connection',
        message: 'You are currently offline.',
        position: 'top-center',
        duration: 0 // Stay until dismissed
      });
    });
  }
}`,

  // Multiple toasts
  multipleExample: `// Showing multiple toasts
export class BulkActionComponent {
  private toastService = inject(ToastService);

  async processMultipleItems(items: Item[]) {
    const loadingId = this.toastService.create({
      type: 'loading',
      message: 'Processing items...'
    });

    const results = await this.processItems(items);
    this.toastService.remove(loadingId);

    // Show results
    if (results.successful.length > 0) {
      this.toastService.create({
        type: 'success',
        message: \`\${results.successful.length} items processed successfully\`
      });
    }

    if (results.failed.length > 0) {
      this.toastService.create({
        type: 'error',
        message: \`\${results.failed.length} items failed to process\`,
        duration: 8000
      });
    }
  }
}`,

  // Stacking demo
  stackingDemo: `// Demonstrate stacking behavior
showMultipleToasts() {
  // Create 5 toasts to see stacking
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      this.toastService.create({
        type: 'info',
        title: \`Toast #\${i}\`,
        message: \`This is toast number \${i}\`,
        duration: 10000
      });
    }, i * 500); // Stagger by 500ms
  }
}`,

  // === API REFERENCE ===

  apiCreateMethod: `// ToastService.create() method signature
create(toast: {
  type: 'success' | 'error' | 'info' | 'warning' | 'loading' | 'neutral';
  message: string;
  title?: string;
  duration?: number; // milliseconds (default: 5000, 0 for no auto-dismiss)
  position?: ToastPosition; // default: 'top-center'
}): number; // Returns toast ID`,

  apiRemoveMethod: `// ToastService.remove() method signature
remove(id: number): void;

// Example
const toastId = this.toastService.create({
  type: 'loading',
  message: 'Loading...'
});

// Remove it later
this.toastService.remove(toastId);`,

  apiSetDefaultPosition: `// ToastService.setDefaultPosition() method signature
setDefaultPosition(position: ToastPosition): void;

// Example
this.toastService.setDefaultPosition('bottom-right');`,

  // === ADVANCED ===

  // Signals pattern
  signalsPattern: `// Using toasts with signals
export class DataComponent {
  private toastService = inject(ToastService);
  private dataService = inject(DataService);

  isLoading = signal(false);

  async loadData() {
    this.isLoading.set(true);

    const loadingId = this.toastService.create({
      type: 'loading',
      message: 'Loading data...'
    });

    try {
      const data = await this.dataService.fetch();
      this.toastService.remove(loadingId);
      this.toastService.create({
        type: 'success',
        message: 'Data loaded successfully'
      });
    } finally {
      this.isLoading.set(false);
    }
  }
}`,

  // Type definitions
  typeDefinitions: `// Available types
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'neutral';

export type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
}`,
};
