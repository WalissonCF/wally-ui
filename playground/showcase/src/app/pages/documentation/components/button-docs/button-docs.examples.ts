// Button documentation code examples
export const ButtonCodeExamples = {
  // Installation
  installation: `npx wally-ui add button`,

  // Import examples
  import: `import { Button } from './components/wally-ui/button/button';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [Button],
  templateUrl: './example.html',
  styleUrl: './example.css'
})`,

  // Basic usage
  basicUsage: `<wally-button>Wally Button</wally-button>`,

  // States
  disabled: `<wally-button [disabled]="true">Disabled</wally-button>`,
  loading: `<wally-button [loading]="true">Loading</wally-button>`,
  notification: `<wally-button [showNotification]="true">Messages</wally-button>`,

  // Types
  submit: `<wally-button type="submit">Submit Form</wally-button>`,

  // Events
  clickTemplate: `<wally-button (click)="handleClick()">Click Me</wally-button>`,
  clickMethod: `handleClick(): void {
  this.clickMessage.set('Button clicked!');
}`,

  // Icons
  iconWithText: `<wally-button>
  Save
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
</wally-button>`,

  iconOnly: `<wally-button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="size-5">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
  </svg>
</wally-button>`,

  // Properties
  propertyType: `type: string = 'button';`,
  propertyDisabled: `disabled: boolean = false;`,
  propertyLoading: `loading: boolean = false;`,
  propertyShowNotification: `showNotification: boolean = false;`,
};