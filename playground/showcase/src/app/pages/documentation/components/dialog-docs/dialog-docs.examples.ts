export const DialogCodeExamples = {
  installation: `npx wally-ui add dialog`,

  import: `import { Dialog } from './components/wally-ui/dialog/dialog';
import { DialogTrigger } from './components/wally-ui/dialog/dialog-trigger/dialog-trigger';
import { DialogContent } from './components/wally-ui/dialog/dialog-content/dialog-content';
import { DialogHeader } from './components/wally-ui/dialog/dialog-header/dialog-header';
import { DialogFooter } from './components/wally-ui/dialog/dialog-footer/dialog-footer';
import { DialogTitle } from './components/wally-ui/dialog/dialog-title/dialog-title';
import { DialogDescription } from './components/wally-ui/dialog/dialog-description/dialog-description';
import { DialogClose } from './components/wally-ui/dialog/dialog-close/dialog-close';`,

  componentImport: `@Component({
  selector: 'app-example',
  imports: [
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  ],
  templateUrl: './example.html'
})`,

  basicUsage: `<wally-dialog>
  <wally-dialog-trigger>
    <wally-button variant="outline">Open Dialog</wally-button>
  </wally-dialog-trigger>

  <wally-dialog-content>
    <wally-dialog-close>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b1b1b] text-[#0a0a0a] dark:text-white cursor-pointer"
        aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </wally-dialog-close>

    <wally-dialog-header>
      <wally-dialog-title>Dialog Title</wally-dialog-title>
      <wally-dialog-description>
        This is a basic dialog example with a title and description.
      </wally-dialog-description>
    </wally-dialog-header>

    <wally-dialog-footer>
      <wally-dialog-close>
        <wally-button variant="outline">Cancel</wally-button>
      </wally-dialog-close>
      <wally-button>Confirm</wally-button>
    </wally-dialog-footer>
  </wally-dialog-content>
</wally-dialog>`,

  confirmationDialog: `<wally-dialog>
  <wally-dialog-trigger>
    <wally-button variant="destructive">Delete Account</wally-button>
  </wally-dialog-trigger>

  <wally-dialog-content>
    <wally-dialog-close>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b1b1b] text-[#0a0a0a] dark:text-white cursor-pointer"
        aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </wally-dialog-close>

    <wally-dialog-header>
      <wally-dialog-title>Are you absolutely sure?</wally-dialog-title>
      <wally-dialog-description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </wally-dialog-description>
    </wally-dialog-header>

    <wally-dialog-footer>
      <wally-dialog-close>
        <wally-button variant="outline">Cancel</wally-button>
      </wally-dialog-close>
      <wally-button variant="destructive" (click)="onDelete()">Delete</wally-button>
    </wally-dialog-footer>
  </wally-dialog-content>
</wally-dialog>`,

  withForm: `<wally-dialog>
  <wally-dialog-trigger>
    <wally-button>Edit Profile</wally-button>
  </wally-dialog-trigger>

  <wally-dialog-content>
    <wally-dialog-close>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b1b1b] text-[#0a0a0a] dark:text-white cursor-pointer"
        aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </wally-dialog-close>

    <wally-dialog-header>
      <wally-dialog-title>Edit Profile</wally-dialog-title>
      <wally-dialog-description>
        Make changes to your profile here. Click save when you're done.
      </wally-dialog-description>
    </wally-dialog-header>

    <div class="px-6 py-4 space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-[#0a0a0a] dark:text-white">
          Name
        </label>
        <wally-input type="text" placeholder="Enter your name"></wally-input>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium text-[#0a0a0a] dark:text-white">
          Email
        </label>
        <wally-input type="email" placeholder="Enter your email"></wally-input>
      </div>
    </div>

    <wally-dialog-footer>
      <wally-dialog-close>
        <wally-button variant="outline">Cancel</wally-button>
      </wally-dialog-close>
      <wally-button (click)="onSave()">Save Changes</wally-button>
    </wally-dialog-footer>
  </wally-dialog-content>
</wally-dialog>`,

  customContent: `<wally-dialog>
  <wally-dialog-trigger>
    <wally-button variant="outline">View Details</wally-button>
  </wally-dialog-trigger>

  <wally-dialog-content>
    <wally-dialog-close>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b1b1b] text-[#0a0a0a] dark:text-white cursor-pointer"
        aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </wally-dialog-close>

    <wally-dialog-header>
      <wally-dialog-title>Product Details</wally-dialog-title>
    </wally-dialog-header>

    <div class="px-6 py-4">
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
        alt="Product"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 class="text-lg font-semibold text-[#0a0a0a] dark:text-white mb-2">
        Premium Headphones
      </h3>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        High-quality wireless headphones with noise cancellation and
        premium sound quality. Perfect for music lovers and professionals.
      </p>
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-[#0a0a0a] dark:text-white">
          $299.99
        </span>
        <span class="text-sm text-green-600 dark:text-green-400">
          In Stock
        </span>
      </div>
    </div>

    <wally-dialog-footer>
      <wally-dialog-close>
        <wally-button variant="outline">Close</wally-button>
      </wally-dialog-close>
      <wally-button (click)="onAddToCart()">Add to Cart</wally-button>
    </wally-dialog-footer>
  </wally-dialog-content>
</wally-dialog>`,

  disableBackdropClick: `<wally-dialog [closeOnBackdropClick]="false">
  <wally-dialog-trigger>
    <wally-button variant="outline">Open (No Backdrop Close)</wally-button>
  </wally-dialog-trigger>

  <wally-dialog-content>
    <wally-dialog-close>
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none dark:ring-offset-[#1b1b1b] text-[#0a0a0a] dark:text-white cursor-pointer"
        aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </wally-dialog-close>

    <wally-dialog-header>
      <wally-dialog-title>Important Action Required</wally-dialog-title>
      <wally-dialog-description>
        This dialog cannot be closed by clicking outside. You must make a choice.
      </wally-dialog-description>
    </wally-dialog-header>

    <wally-dialog-footer>
      <wally-dialog-close>
        <wally-button variant="outline">Decline</wally-button>
      </wally-dialog-close>
      <wally-button (click)="onAccept()">Accept</wally-button>
    </wally-dialog-footer>
  </wally-dialog-content>
</wally-dialog>`,

  closeProgrammatically: `import { Component, inject } from '@angular/core';
import { DialogService } from './components/wally-ui/dialog/dialog.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class ExampleComponent {
  private dialogService = inject(DialogService);

  onDelete(): void {
    // Perform delete action
    console.log('Account deleted');
    // Close dialog programmatically
    this.dialogService.close();
  }

  onCancel(): void {
    // Just close without action
    this.dialogService.close();
  }
}`,

  componentTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class ExampleComponent {
  onDelete(): void {
    console.log('Account deleted');
  }

  onSave(): void {
    console.log('Changes saved');
  }

  onAddToCart(): void {
    console.log('Added to cart');
  }

  onAccept(): void {
    console.log('User accepted');
  }
}`
};
