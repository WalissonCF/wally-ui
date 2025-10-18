// Selection Popover documentation code examples
export const SelectionPopoverCodeExamples = {
  // Installation
  installation: `npx wally-ui add selection-popover`,

  // Import examples
  import: `import { SelectionPopover } from './components/wally-ui/selection-popover/selection-popover';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [SelectionPopover],
  templateUrl: './example.html'
})`,

  // Basic usage
  basicUsage: `<wally-selection-popover>
  <article>
    <h1>Article Title</h1>
    <p>Select any text in this content to see the popover appear...</p>
  </article>
</wally-selection-popover>`,

  // === CUSTOM ACTIONS ===

  customActions: `<wally-selection-popover (textSelected)="onTextSelected($event)">
  <!-- Custom actions toolbar -->
  <div popoverActions class="flex gap-1">
    <button
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
      Ask AI
    </button>
    <button
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
      Copy
    </button>
    <button
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
      Share
    </button>
  </div>

  <!-- Selectable content -->
  <article class="prose dark:prose-invert">
    <p>Select text to see custom actions...</p>
  </article>
</wally-selection-popover>`,

  customActionsTs: `export class MyComponent {
  onTextSelected(text: string) {
    console.log('Selected:', text);
    // Handle the selected text
    // This is called when any action is clicked
  }
}`,

  // === WITH WALLY BUTTON ===

  withWallyButton: `<wally-selection-popover (textSelected)="askAboutSelection($event)">
  <!-- Custom action with Wally Button -->
  <div popoverActions>
    <wally-button variant="ghost" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
      Ask AI
    </wally-button>
  </div>

  <!-- Content -->
  <article>
    <p>Select text to ask AI about it...</p>
  </article>
</wally-selection-popover>`,

  withWallyButtonTs: `export class MyComponent {
  askAboutSelection(text: string) {
    // Send to AI chat
    this.aiService.ask(\`Explain: \${text}\`);
  }
}`,

  // === PRODUCTION EXAMPLES ===

  blogExample: `<!-- Blog Article with Selection Actions -->
<wally-selection-popover (textSelected)="handleAction($event)">
  <div popoverActions class="flex gap-1">
    <button
      (click)="highlight()"
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded transition-colors"
      aria-label="Highlight text">
      Highlight
    </button>
    <button
      (click)="addComment()"
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
      aria-label="Add comment">
      Comment
    </button>
    <button
      (click)="share()"
      class="px-3 py-2 text-sm text-[#0a0a0a] dark:text-white hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
      aria-label="Share selection">
      Share
    </button>
  </div>

  <article class="max-w-2xl mx-auto prose dark:prose-invert">
    <h1>Understanding Angular Signals</h1>
    <p>
      Angular Signals represent a major shift in how we handle reactivity...
    </p>
  </article>
</wally-selection-popover>`,

  blogExampleTs: `export class BlogComponent {
  selectedText = signal<string>('');

  handleAction(text: string) {
    this.selectedText.set(text);
  }

  highlight() {
    console.log('Highlighting:', this.selectedText());
  }

  addComment() {
    console.log('Adding comment to:', this.selectedText());
  }

  share() {
    console.log('Sharing:', this.selectedText());
  }
}`,

  documentationExample: `<!-- Documentation with AI Assistant -->
<wally-selection-popover (textSelected)="askAI($event)">
  <div popoverActions>
    <wally-button variant="ghost" size="sm">
      <svg class="size-4">...</svg>
      Explain with AI
    </wally-button>
  </div>

  <div class="documentation-content">
    <h2>API Reference</h2>
    <pre><code>function useState&lt;T&gt;(initialValue: T): [T, (value: T) =&gt; void]</code></pre>
    <p>Select any technical term to get AI explanation...</p>
  </div>
</wally-selection-popover>`,

  readingModeExample: `<!-- Reading Mode with Actions -->
<wally-selection-popover (textSelected)="onSelect($event)">
  <div popoverActions class="flex items-center gap-2 px-2">
    <button class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
      <svg class="size-4"><!-- Dictionary icon --></svg>
    </button>
    <button class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
      <svg class="size-4"><!-- Translate icon --></svg>
    </button>
    <button class="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
      <svg class="size-4"><!-- Read aloud icon --></svg>
    </button>
  </div>

  <div class="reading-content text-lg leading-relaxed">
    <p>Select text to see reading assistance tools...</p>
  </div>
</wally-selection-popover>`,

  // === ADVANCED ===

  minSelectionLength: `<!-- Custom minimum selection length -->
<wally-selection-popover>
  <!-- By default, requires 3+ characters -->
  <!-- Customize by handling selection in your code -->

  <article>
    <p>Select at least 3 characters...</p>
  </article>
</wally-selection-popover>

<!-- Note: The component has a built-in 3-character minimum
     to prevent accidental popover triggers on short selections -->`,

  positioningBehavior: `<!-- Automatic viewport-aware positioning -->
<wally-selection-popover>
  <!-- Popover automatically:
       1. Centers above selection
       2. Prevents overflow on screen edges
       3. Adjusts position if too close to viewport boundaries
       4. Uses position: fixed for scroll stability
  -->

  <article>
    <p>Try selecting text near screen edges...</p>
  </article>
</wally-selection-popover>`,

  keyboardAccessibility: `<!-- Keyboard interaction -->
<wally-selection-popover (textSelected)="onSelect($event)">
  <!-- Supports:
       - ESC key to close popover
       - Click outside to dismiss
       - Full ARIA dialog attributes
       - role="dialog" with aria-label
  -->

  <article>
    <p>Select text and press ESC to close...</p>
  </article>
</wally-selection-popover>`,

  eventHandling: `<!-- Event handling example -->
<wally-selection-popover (textSelected)="handleSelection($event)">
  <div popoverActions>
    <wally-button variant="ghost" (buttonClick)="performAction()">
      Custom Action
    </wally-button>
  </div>

  <article>
    <p>Content here...</p>
  </article>
</wally-selection-popover>`,

  eventHandlingTs: `export class MyComponent {
  // This event fires when:
  // 1. Any custom action is clicked
  // 2. The fallback button is clicked (if no custom actions)
  handleSelection(text: string) {
    console.log('User selected:', text);

    // The popover automatically closes after this event
    // No need to manually clear selection
  }

  performAction() {
    // Custom action logic
    // The textSelected event will still fire with the selected text
  }
}`,

  // === API USAGE ===

  fullExample: `<!-- Complete example with all features -->
<wally-selection-popover (textSelected)="onTextSelected($event)">
  <!-- Custom actions (optional) -->
  <div popoverActions class="flex gap-1">
    <wally-button
      variant="ghost"
      size="sm"
      [ariaLabel]="'Ask AI about selection'">
      <svg class="size-4">...</svg>
      Ask AI
    </wally-button>

    <wally-button
      variant="ghost"
      size="sm"
      [ariaLabel]="'Copy to clipboard'">
      <svg class="size-4">...</svg>
      Copy
    </wally-button>
  </div>

  <!-- Selectable content -->
  <article class="prose dark:prose-invert max-w-none">
    <h1>Your Content</h1>
    <p>Select any text to see the action toolbar...</p>

    <h2>Features</h2>
    <ul>
      <li>Automatic positioning</li>
      <li>Viewport awareness</li>
      <li>Keyboard accessible</li>
      <li>Zero flash rendering</li>
    </ul>
  </article>
</wally-selection-popover>`,

  fullExampleTs: `export class MyComponent {
  selectedText = signal<string>('');

  onTextSelected(text: string) {
    this.selectedText.set(text);

    // Perform action based on user's custom button click
    // For example: send to AI, copy to clipboard, etc.

    console.log('Selected text:', text);
  }
}`,

  // === STYLING ===

  customStyling: `<!-- Custom popover styling -->
<wally-selection-popover (textSelected)="onSelect($event)">
  <!-- Use Tailwind classes for custom styling -->
  <div popoverActions class="flex items-center gap-2 px-3 py-2">
    <!-- Primary action with custom colors -->
    <button class="
      px-3 py-2 rounded-lg
      bg-blue-500 text-white
      hover:bg-blue-600
      transition-colors">
      Primary
    </button>

    <!-- Secondary action -->
    <button class="
      px-3 py-2 rounded-lg
      text-neutral-700 dark:text-neutral-300
      hover:bg-neutral-100 dark:hover:bg-neutral-800
      transition-colors">
      Secondary
    </button>
  </div>

  <article>
    <p>Content...</p>
  </article>
</wally-selection-popover>`,
};
