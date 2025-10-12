export const DropdownMenuCodeExamples = {
  installation: `npx wally-ui add dropdown-menu`,

  import: `import { DropdownMenu } from './components/wally-ui/dropdown-menu/dropdown-menu';
import { DropdownMenuTrigger } from './components/wally-ui/dropdown-menu/dropdown-menu-trigger/dropdown-menu-trigger';
import { DropdownMenuContent } from './components/wally-ui/dropdown-menu/dropdown-menu-content/dropdown-menu-content';
import { DropdownMenuItem } from './components/wally-ui/dropdown-menu/dropdown-menu-item/dropdown-menu-item';
import { DropdownMenuLabel } from './components/wally-ui/dropdown-menu/dropdown-menu-label/dropdown-menu-label';
import { DropdownMenuSeparator } from './components/wally-ui/dropdown-menu/dropdown-menu-separator/dropdown-menu-separator';
import { DropdownMenuGroup } from './components/wally-ui/dropdown-menu/dropdown-menu-group/dropdown-menu-group';
import { DropdownMenuSub } from './components/wally-ui/dropdown-menu/dropdown-menu-sub/dropdown-menu-sub';
import { DropdownMenuSubTrigger } from './components/wally-ui/dropdown-menu/dropdown-menu-sub-trigger/dropdown-menu-sub-trigger';
import { DropdownMenuSubContent } from './components/wally-ui/dropdown-menu/dropdown-menu-sub-content/dropdown-menu-sub-content';`,

  componentImport: `@Component({
  selector: 'app-example',
  imports: [
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
  ],
  templateUrl: './example.html'
})`,

  basicUsage: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Open Menu</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onProfile()">
      Profile
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onSettings()">
      Settings
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onLogout()">
      Log out
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  withLabel: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Account</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-label>
      My Account
    </wally-dropdown-menu-label>
    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>
    <wally-dropdown-menu-item (click)="onProfile()">
      Profile
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onBilling()">
      Billing
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  withGroups: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Actions</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-group [ariaLabel]="'File actions'">
      <wally-dropdown-menu-item (click)="onNew()">
        New File
      </wally-dropdown-menu-item>
      <wally-dropdown-menu-item (click)="onOpen()">
        Open
      </wally-dropdown-menu-item>
    </wally-dropdown-menu-group>

    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-group [ariaLabel]="'Edit actions'">
      <wally-dropdown-menu-item (click)="onCopy()">
        Copy
      </wally-dropdown-menu-item>
      <wally-dropdown-menu-item (click)="onPaste()">
        Paste
      </wally-dropdown-menu-item>
    </wally-dropdown-menu-group>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  withSubmenus: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Options</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onEdit()">
      Edit
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onDuplicate()">
      Duplicate
    </wally-dropdown-menu-item>

    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-sub>
      <wally-dropdown-menu-sub-trigger>
        <span>Share</span>
      </wally-dropdown-menu-sub-trigger>

      <wally-dropdown-menu-sub-content>
        <wally-dropdown-menu-item (click)="onShareEmail()">
          Email
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onShareLink()">
          Copy Link
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onShareSocial()">
          Social Media
        </wally-dropdown-menu-item>
      </wally-dropdown-menu-sub-content>
    </wally-dropdown-menu-sub>

    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-item (click)="onDelete()">
      Delete
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  withIcons: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      Profile
    </wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onAccount()">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <span>Account</span>
      </div>
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onSettings()">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.240.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <span>Settings</span>
      </div>
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  hoverMode: `<wally-dropdown-menu [triggerMode]="'hover'">
  <wally-dropdown-menu-trigger>
    <wally-button variant="ghost">Hover Me</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onAction()">
      Action 1
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onAction2()">
      Action 2
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  positioning: `<!-- Position Bottom (Default) -->
<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button>Bottom</wally-button>
  </wally-dropdown-menu-trigger>
  <wally-dropdown-menu-content [position]="'bottom'">
    <!-- items -->
  </wally-dropdown-menu-content>
</wally-dropdown-menu>

<!-- Position Top -->
<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button>Top</wally-button>
  </wally-dropdown-menu-trigger>
  <wally-dropdown-menu-content [position]="'top'">
    <!-- items -->
  </wally-dropdown-menu-content>
</wally-dropdown-menu>

<!-- Position Left -->
<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button>Left</wally-button>
  </wally-dropdown-menu-trigger>
  <wally-dropdown-menu-content [position]="'left'">
    <!-- items -->
  </wally-dropdown-menu-content>
</wally-dropdown-menu>

<!-- Position Right -->
<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button>Right</wally-button>
  </wally-dropdown-menu-trigger>
  <wally-dropdown-menu-content [position]="'right'">
    <!-- items -->
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  disabledItems: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Edit</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onCut()">
      Cut
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onCopy()">
      Copy
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item [disabled]="true">
      Paste (Nothing to paste)
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  destructiveAction: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
      </svg>
    </wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onEdit()">
      Edit
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-item (click)="onDuplicate()">
      Duplicate
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>
    <wally-dropdown-menu-item (click)="onArchive()">
      Archive
    </wally-dropdown-menu-item>
    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>
    <wally-dropdown-menu-item (click)="onDelete()">
      <span class="text-red-600 dark:text-red-400">Delete</span>
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  componentTs: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class ExampleComponent {
  onProfile(): void {
    console.log('Navigate to profile');
  }

  onSettings(): void {
    console.log('Navigate to settings');
  }

  onLogout(): void {
    console.log('User logged out');
  }
}`,

  realWorldExample: `<!-- User Account Dropdown -->
<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="ghost" [rounded]="true">
      <img src="avatar.jpg" alt="User" class="size-8 rounded-full" />
    </wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-label>
      john@example.com
    </wally-dropdown-menu-label>
    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-group [ariaLabel]="'Account actions'">
      <wally-dropdown-menu-item (click)="onProfile()">
        <div class="flex items-center gap-3">
          <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </div>
      </wally-dropdown-menu-item>
      <wally-dropdown-menu-item (click)="onBilling()">
        <div class="flex items-center gap-3">
          <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Billing</span>
        </div>
      </wally-dropdown-menu-item>
      <wally-dropdown-menu-item (click)="onSettings()">
        <div class="flex items-center gap-3">
          <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Settings</span>
        </div>
      </wally-dropdown-menu-item>
    </wally-dropdown-menu-group>

    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-item (click)="onLogout()">
      <div class="flex items-center gap-3">
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Log out</span>
      </div>
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`,

  nestedSubmenuExample: `<wally-dropdown-menu>
  <wally-dropdown-menu-trigger>
    <wally-button variant="outline">Advanced</wally-button>
  </wally-dropdown-menu-trigger>

  <wally-dropdown-menu-content>
    <wally-dropdown-menu-item (click)="onNew()">
      New
    </wally-dropdown-menu-item>

    <wally-dropdown-menu-sub>
      <wally-dropdown-menu-sub-trigger>
        <span>Import</span>
      </wally-dropdown-menu-sub-trigger>
      <wally-dropdown-menu-sub-content>
        <wally-dropdown-menu-item (click)="onImportJSON()">
          JSON
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onImportCSV()">
          CSV
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onImportXML()">
          XML
        </wally-dropdown-menu-item>
      </wally-dropdown-menu-sub-content>
    </wally-dropdown-menu-sub>

    <wally-dropdown-menu-sub>
      <wally-dropdown-menu-sub-trigger>
        <span>Export</span>
      </wally-dropdown-menu-sub-trigger>
      <wally-dropdown-menu-sub-content>
        <wally-dropdown-menu-item (click)="onExportJSON()">
          JSON
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onExportCSV()">
          CSV
        </wally-dropdown-menu-item>
        <wally-dropdown-menu-item (click)="onExportPDF()">
          PDF
        </wally-dropdown-menu-item>
      </wally-dropdown-menu-sub-content>
    </wally-dropdown-menu-sub>

    <wally-dropdown-menu-separator></wally-dropdown-menu-separator>

    <wally-dropdown-menu-item (click)="onClose()">
      Close
    </wally-dropdown-menu-item>
  </wally-dropdown-menu-content>
</wally-dropdown-menu>`
};
