export const TooltipCodeExamples = {
  installation: `npx wally-ui add tooltip`,

  import: `// app.component.ts or your module file
import { Tooltip } from './components/tooltip/tooltip';`,

  componentImport: `@Component({
  selector: 'app-root',
  imports: [Tooltip],
  // ...
})`,

  basicUsage: `<wally-tooltip text="This is a tooltip">
  <button>Hover me</button>
</wally-tooltip>`,

  positions: `<!-- Auto positioning (default) -->
<wally-tooltip text="Auto positioned" position="auto">
  <button>Auto</button>
</wally-tooltip>

<!-- Fixed positions -->
<wally-tooltip text="Always on top" position="top">
  <button>Top</button>
</wally-tooltip>

<wally-tooltip text="Always on bottom" position="bottom">
  <button>Bottom</button>
</wally-tooltip>

<wally-tooltip text="Always on left" position="left">
  <button>Left</button>
</wally-tooltip>

<wally-tooltip text="Always on right" position="right">
  <button>Right</button>
</wally-tooltip>`,

  withButton: `<wally-tooltip text="Save your changes">
  <wally-button variant="primary">Save</wally-button>
</wally-tooltip>`,

  withIcon: `<wally-tooltip text="Send message">
  <wally-button [variant]="'ghost'" [rounded]="true" ariaLabel="Send">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  </wally-button>
</wally-tooltip>`,

  customDelay: `<!-- Fast tooltip (100ms) -->
<wally-tooltip text="Quick tooltip" [delay]="100">
  <button>Fast</button>
</wally-tooltip>

<!-- Slow tooltip (500ms) -->
<wally-tooltip text="Delayed tooltip" [delay]="500">
  <button>Slow</button>
</wally-tooltip>`,

  disabled: `<wally-tooltip text="This won't show" [disabled]="true">
  <button>Disabled Tooltip</button>
</wally-tooltip>`,

  customOffset: `<!-- More spacing from element -->
<wally-tooltip text="More space" [offset]="4">
  <button>Large offset</button>
</wally-tooltip>

<!-- Less spacing from element -->
<wally-tooltip text="Close" [offset]="1">
  <button>Small offset</button>
</wally-tooltip>`,

  dashboard: `<!-- Toolbar with tooltips -->
<div class="flex gap-2">
  <wally-tooltip text="Export data to CSV">
    <wally-button variant="outline" ariaLabel="Export">
      <svg class="size-5"><!-- Export icon --></svg>
    </wally-button>
  </wally-tooltip>

  <wally-tooltip text="Refresh dashboard">
    <wally-button variant="outline" ariaLabel="Refresh">
      <svg class="size-5"><!-- Refresh icon --></svg>
    </wally-button>
  </wally-tooltip>

  <wally-tooltip text="Settings">
    <wally-button variant="outline" ariaLabel="Settings">
      <svg class="size-5"><!-- Settings icon --></svg>
    </wally-button>
  </wally-tooltip>
</div>`,

  formField: `<!-- Form field with help tooltip -->
<div class="flex items-start gap-2">
  <wally-input label="Email" type="email" placeholder="your@email.com" class="flex-1" />
  <wally-tooltip text="We'll never share your email">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4 text-neutral-500 cursor-help mt-[30px]">
      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  </wally-tooltip>
</div>`,

  navigation: `<!-- Navigation with tooltips -->
<nav class="flex flex-col gap-2">
  <wally-tooltip text="Dashboard" position="right">
    <a href="/dashboard" class="p-2">
      <svg class="size-6"><!-- Dashboard icon --></svg>
    </a>
  </wally-tooltip>

  <wally-tooltip text="Analytics" position="right">
    <a href="/analytics" class="p-2">
      <svg class="size-6"><!-- Analytics icon --></svg>
    </a>
  </wally-tooltip>

  <wally-tooltip text="Settings" position="right">
    <a href="/settings" class="p-2">
      <svg class="size-6"><!-- Settings icon --></svg>
    </a>
  </wally-tooltip>
</nav>`,

  avatar: `<!-- User avatar with name tooltip -->
<wally-tooltip text="John Doe (john@example.com)">
  <img src="avatar.jpg" alt="User avatar" class="size-10 rounded-full cursor-pointer" />
</wally-tooltip>`,

  statusBadge: `<!-- Status badge with details tooltip -->
<wally-tooltip text="Last updated: 2 minutes ago">
  <span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full cursor-help">
    Active
  </span>
</wally-tooltip>`,

  richContent: `<!-- Future API (v2.0.0) -->
<wally-tooltip>
  <div class="p-4">
    <img src="preview.jpg" />
    <h4>Custom Content</h4>
    <p>Any HTML here</p>
  </div>

  <!-- Trigger element -->
  <button>Show Rich Tooltip</button>
</wally-tooltip>`,
};
