// Button documentation code examples
export const ButtonCodeExamples = {
  // Installation
  installation: `npx wally-ui add button`,

  // Import examples
  import: `import { Button } from './components/wally-ui/button/button';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [Button],
  templateUrl: './example.html'
})`,

  // Basic usage
  basicUsage: `<wally-button>Click me</wally-button>`,

  // === VARIANTS ===

  // Primary (Default)
  primaryVariant: `<!-- Default variant -->
<wally-button>Primary Button</wally-button>

<!-- Explicit primary -->
<wally-button variant="primary">Primary Button</wally-button>`,

  // Secondary
  secondaryVariant: `<wally-button variant="secondary">Secondary Button</wally-button>`,

  // Destructive
  destructiveVariant: `<wally-button variant="destructive">Delete Account</wally-button>`,

  // Outline
  outlineVariant: `<wally-button variant="outline">Outline Button</wally-button>`,

  // Ghost
  ghostVariant: `<wally-button variant="ghost">Ghost Button</wally-button>`,

  // Link
  linkVariant: `<!-- Internal navigation -->
<wally-button variant="link" href="/components">View Components</wally-button>

<!-- External link -->
<wally-button variant="link" href="https://github.com">GitHub</wally-button>`,

  // === STATES ===

  disabled: `<wally-button [disabled]="true">Disabled</wally-button>`,

  loading: `<wally-button [loading]="true">Loading...</wally-button>`,

  notification: `<wally-button [showNotification]="true">Messages</wally-button>`,

  // === PRODUCTION EXAMPLES ===

  // CTA Button
  ctaExample: `<!-- Call-to-Action Example -->
<wally-button>
  Get Started Free
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="2" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
</wally-button>`,

  // Login Form
  loginExample: `<!-- Login Form Example -->
<form (ngSubmit)="onLogin()">
  <!-- ... form fields ... -->

  <div class="flex gap-2">
    <wally-button
      type="submit"
      [loading]="isLoggingIn()"
      [disabled]="!loginForm.valid">
      Sign In
    </wally-button>

    <wally-button
      variant="secondary"
      type="button"
      (click)="goToSignUp()">
      Create Account
    </wally-button>
  </div>
</form>`,

  loginExampleTs: `export class LoginComponent {
  isLoggingIn = signal(false);
  loginForm: FormGroup;

  onLogin() {
    this.isLoggingIn.set(true);

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.isLoggingIn.set(false)
      });
  }
}`,

  // Delete Confirmation
  deleteExample: `<!-- Delete Confirmation Modal -->
<div class="modal">
  <h2>Delete Account?</h2>
  <p>This action cannot be undone.</p>

  <div class="flex gap-2 justify-end">
    <wally-button
      variant="ghost"
      (click)="closeModal()">
      Cancel
    </wally-button>

    <wally-button
      variant="destructive"
      [loading]="isDeleting()"
      (click)="confirmDelete()">
      Delete Account
    </wally-button>
  </div>
</div>`,

  // Dashboard Actions
  dashboardExample: `<!-- Dashboard Actions -->
<div class="dashboard-header">
  <wally-button variant="outline" (click)="exportData()">
    Export
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  </wally-button>

  <wally-button (click)="createNew()">
    Create New
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke-width="2" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </wally-button>
</div>`,

  // Icon Button with Notification
  notificationButton: `<!-- Notification Icon Button -->
<wally-button
  [showNotification]="hasUnreadMessages()"
  ariaLabel="View messages">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
</wally-button>`,

  // === BUTTON TYPES ===

  submit: `<wally-button type="submit">Submit Form</wally-button>`,
  reset: `<wally-button type="reset" variant="ghost">Reset</wally-button>`,

  // === EVENTS ===

  clickTemplate: `<wally-button (click)="handleClick()">Click Me</wally-button>`,

  clickMethod: `handleClick(): void {
  console.log('Button clicked!');
  // Your logic here
}`,

  // === ICONS ===

  iconWithText: `<wally-button>
  Save Changes
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
</wally-button>`,

  iconOnly: `<wally-button ariaLabel="Notifications">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
  </svg>
</wally-button>`,

  iconLeft: `<wally-button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="2" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
  Back
</wally-button>`,

  // === ACCESSIBILITY ===

  ariaLabel: `<!-- Essential for icon-only buttons -->
<wally-button ariaLabel="Save document">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
</wally-button>`,

  ariaPressed: `<!-- For toggle buttons -->
<wally-button [ariaPressed]="isMuted()">
  {{ isMuted() ? 'Unmute' : 'Mute' }}
</wally-button>`,

  ariaBusy: `<!-- Automatically set when loading="true" -->
<wally-button [loading]="isSaving()">
  Save Changes
</wally-button>`,

  ariaDescribedBy: `<!-- Connect button to description -->
<wally-button ariaDescribedBy="save-description">
  Save
</wally-button>
<p id="save-description" class="sr-only">
  Saves your changes permanently
</p>`,
};
