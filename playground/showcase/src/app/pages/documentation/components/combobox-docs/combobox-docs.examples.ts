export const ComboboxCodeExamples = {
  installation: `npx wally-ui add combobox`,

  import: `import { Combobox } from './components/wally-ui/combobox/combobox';
import { ComboboxInput } from './components/wally-ui/combobox/combobox-input/combobox-input';
import { ComboboxTrigger } from './components/wally-ui/combobox/combobox-trigger/combobox-trigger';
import { ComboboxContent } from './components/wally-ui/combobox/combobox-content/combobox-content';`,

  componentImport: `@Component({
  selector: 'app-example',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxTrigger,
    ComboboxContent
  ],
  templateUrl: './example.html'
})`,

  basicUsage: `<!-- Single select with input mode -->
<wally-combobox
  [data]="fruits"
  placeholder="Select a fruit..."
  (selectionChange)="onSelectionChange($event)">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>

<!-- Display selected item -->
@if (selectedFruits.length > 0) {
  <p>Selected: {{ selectedFruits[0].label }}</p>
}`,

  componentSetup: `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.html'
})
export class ExampleComponent {
  fruits = [
    { value: 1, label: 'Apple', description: 'A sweet red fruit' },
    { value: 2, label: 'Banana', description: 'A yellow tropical fruit' },
    { value: 3, label: 'Orange', description: 'A citrus fruit' }
  ];

  selectedFruits: any[] = [];

  onSelectionChange(items: any[]): void {
    this.selectedFruits = items;
  }
}`,

  multiSelect: `<wally-combobox
  [data]="countries"
  [multiSelect]="true"
  [closeOnSelect]="false"
  (selectionChange)="onCountriesChange($event)">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>

@if (selectedCountries.length > 0) {
  <p>{{ selectedCountries.length }} countries selected</p>
}`,

  multiSelectSetup: `countries = [
  { value: 1, label: 'United States' },
  { value: 2, label: 'United Kingdom' },
  { value: 3, label: 'Brazil' }
];

selectedCountries: any[] = [];

onCountriesChange(items: any[]): void {
  this.selectedCountries = items;
}`,

  groupedItems: `<wally-combobox
  [data]="languages"
  groupBy="group"
  (selectionChange)="onLanguageChange($event)">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>`,

  groupedItemsSetup: `languages = [
  { value: 1, label: 'JavaScript', group: 'Frontend' },
  { value: 2, label: 'TypeScript', group: 'Frontend' },
  { value: 3, label: 'Python', group: 'Backend' },
  { value: 4, label: 'Java', group: 'Backend' }
];

selectedLanguage: any[] = [];

onLanguageChange(items: any[]): void {
  this.selectedLanguage = items;
}`,

  customTrigger: `<wally-combobox
  [data]="options"
  triggerMode="custom"
  (selectionChange)="onOptionChange($event)">
  <wally-combobox-trigger>
    <wally-button variant="outline">
      @if (selectedOption.length > 0) {
        {{ selectedOption[0].label }}
      } @else {
        Select an option
      }
    </wally-button>
  </wally-combobox-trigger>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>`,

  customTriggerSetup: `options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' }
];

selectedOption: any[] = [];

onOptionChange(items: any[]): void {
  this.selectedOption = items;
}`,

  positioning: `<!-- Default: bottom (auto-adjusts based on viewport space) -->
<wally-combobox [data]="items">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>

<!-- Force top positioning -->
<wally-combobox [data]="items">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content [position]="'top'"></wally-combobox-content>
</wally-combobox>

<!-- Position automatically adjusts on window resize -->`,

  virtualScroll: `<!-- Virtual scrolling is automatically enabled for large datasets -->
<wally-combobox [data]="largeDataset">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>

<!-- Note: Virtual scrolling optimizes rendering for 1000+ items -->`,

  keyboardNavigation: `Keyboard shortcuts:
- Arrow Down: Navigate to next item
- Arrow Up: Navigate to previous item
- Enter: Select focused item
- Escape: Close dropdown
- Backspace: Remove last chip (multi-select mode)`,

  accessingSelection: `<!-- Use selectionChange output to track selected items -->
<wally-combobox
  [data]="items"
  (selectionChange)="onSelectionChange($event)">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>

<!-- Display selected items -->
@if (selectedItems.length > 0) {
  <p>Selected: {{ selectedItems[0].label }}</p>
}

<!-- In component -->
selectedItems: any[] = [];

onSelectionChange(items: any[]): void {
  this.selectedItems = items;
  console.log('Selected values:', items.map(i => i.value));
}`,

  clearingSelection: `<!-- The combobox automatically handles clearing via UI -->
<!-- Multi-select: Individual X buttons on each chip -->
<!-- Single-select: Clear button (X) when item is selected -->

<!-- Built-in clear functionality - no code needed! -->
<wally-combobox [data]="items">
  <wally-combobox-input></wally-combobox-input>
  <wally-combobox-content></wally-combobox-content>
</wally-combobox>`,

  realWorldExample: `<div class="space-y-4">
  <!-- Country selector with multi-select -->
  <wally-combobox
    [data]="countries"
    [multiSelect]="true"
    [closeOnSelect]="false"
    placeholder="Search countries..."
    (selectionChange)="onCountrySelectionChange($event)">
    <wally-combobox-input></wally-combobox-input>
    <wally-combobox-content></wally-combobox-content>
  </wally-combobox>

  <!-- Display selected countries -->
  @if (selectedCountries.length > 0) {
    <div class="mt-4">
      <h3 class="font-semibold mb-2">Selected Countries:</h3>
      <ul class="list-disc list-inside">
        @for (country of selectedCountries; track country.value) {
          <li>{{ country.label }}</li>
        }
      </ul>
    </div>
  }
</div>`,

  realWorldSetup: `countries = [
  { value: 1, label: 'United States', description: 'North America' },
  { value: 2, label: 'United Kingdom', description: 'Europe' },
  { value: 3, label: 'Brazil', description: 'South America' },
  { value: 4, label: 'Japan', description: 'Asia' },
  { value: 5, label: 'Australia', description: 'Oceania' }
];

selectedCountries: any[] = [];

onCountrySelectionChange(items: any[]): void {
  this.selectedCountries = items;
}`
};
