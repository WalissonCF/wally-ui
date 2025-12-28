import { Component, OnInit } from '@angular/core';

import { AiPromptService } from '../../../../core/services/ai-prompt.service';
import { SeoService } from '../../../../core/services/seo.service';
import { getFormattedCode } from '../../../../core/utils/prism';

import { ComboboxCodeExamples } from './combobox-docs.examples';

import { Breadcrumb, BreadcrumbItem } from '../../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../../components/button/button';
import { Combobox } from '../../../../components/combobox/combobox';
import { ComboboxInput } from '../../../../components/combobox/combobox-input/combobox-input';
import { ComboboxTrigger } from '../../../../components/combobox/combobox-trigger/combobox-trigger';
import { ComboboxContent } from '../../../../components/combobox/combobox-content/combobox-content';

@Component({
  selector: 'wally-combobox-docs',
  standalone: true,
  imports: [
    Breadcrumb,
    Button,
    Combobox,
    ComboboxInput,
    ComboboxTrigger,
    ComboboxContent
  ],
  templateUrl: './combobox-docs.component.html',
  styleUrl: './combobox-docs.component.css'
})
export class ComboboxDocsComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Components', url: '/documentation/components' },
    { label: 'Combobox' }
  ];

  installationCode = getFormattedCode(ComboboxCodeExamples.installation, 'bash');
  importCode = getFormattedCode(ComboboxCodeExamples.import, 'typescript');
  componentImportCode = getFormattedCode(ComboboxCodeExamples.componentImport, 'typescript');

  basicUsageCode = getFormattedCode(ComboboxCodeExamples.basicUsage, 'html');
  componentSetupCode = getFormattedCode(ComboboxCodeExamples.componentSetup, 'typescript');
  multiSelectCode = getFormattedCode(ComboboxCodeExamples.multiSelect, 'html');
  multiSelectSetupCode = getFormattedCode(ComboboxCodeExamples.multiSelectSetup, 'typescript');
  groupedItemsCode = getFormattedCode(ComboboxCodeExamples.groupedItems, 'html');
  groupedItemsSetupCode = getFormattedCode(ComboboxCodeExamples.groupedItemsSetup, 'typescript');
  customTriggerCode = getFormattedCode(ComboboxCodeExamples.customTrigger, 'html');
  customTriggerSetupCode = getFormattedCode(ComboboxCodeExamples.customTriggerSetup, 'typescript');
  positioningCode = getFormattedCode(ComboboxCodeExamples.positioning, 'html');
  virtualScrollCode = getFormattedCode(ComboboxCodeExamples.virtualScroll, 'typescript');
  keyboardNavigationCode = getFormattedCode(ComboboxCodeExamples.keyboardNavigation, 'text');
  accessingSelectionCode = getFormattedCode(ComboboxCodeExamples.accessingSelection, 'html');
  clearingSelectionCode = getFormattedCode(ComboboxCodeExamples.clearingSelection, 'html');
  realWorldExampleCode = getFormattedCode(ComboboxCodeExamples.realWorldExample, 'html');
  realWorldSetupCode = getFormattedCode(ComboboxCodeExamples.realWorldSetup, 'typescript');

  fruits = FRUITS;
  countries = ALL_COUNTRIES_DATA;
  programmingLanguages = PROGRAMMING_LANGUAGES;

  // Seleções
  singleSelection: any[] = [];
  multiSelection: any[] = [];
  groupedSelection: any[] = [];
  customTriggerSelection: any[] = [];

  constructor(
    private aiPromptService: AiPromptService,
    private seoService: SeoService
  ) { }

  onSingleSelectionChange(items: any[]): void {
    this.singleSelection = items;
  }

  onMultiSelectionChange(items: any[]): void {
    this.multiSelection = items;
  }

  onGroupedSelectionChange(items: any[]): void {
    this.groupedSelection = items;
  }

  onCustomTriggerSelectionChange(items: any[]): void {
    this.customTriggerSelection = items;
  }

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Combobox Component',
      description: 'A flexible Angular combobox component with search, multi-select support, keyboard navigation, and intelligent viewport-aware positioning. Features input and custom trigger modes, item grouping, and zero external dependencies.',
      url: '/documentation/components/combobox',
      keywords: 'Angular Combobox, TypeScript Combobox, Select Component, Autocomplete, Multi-select, Angular UI Components, Searchable Dropdown'
    });
  }

  get claudeUrl(): string {
    return this.aiPromptService.generateClaudeUrl();
  }

  get chatGptUrl(): string {
    return this.aiPromptService.generateChatGptUrl();
  }
}

const ALL_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. ""Swaziland"")',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const FRUITS = [
  { value: 1, label: 'Apple', description: 'A sweet red fruit' },
  { value: 2, label: 'Banana', description: 'A yellow tropical fruit' },
  { value: 3, label: 'Orange', description: 'A citrus fruit' },
  { value: 4, label: 'Strawberry', description: 'A red berry' },
  { value: 5, label: 'Grapes', description: 'Small round fruits in bunches' },
  { value: 6, label: 'Watermelon', description: 'A large green fruit' },
  { value: 7, label: 'Mango', description: 'A tropical stone fruit' },
  { value: 8, label: 'Pineapple', description: 'A tropical fruit with spiky skin' },
];

const ALL_COUNTRIES_DATA = ALL_COUNTRIES.map((country, index) => ({
  value: index + 1,
  label: country
}));

const PROGRAMMING_LANGUAGES = [
  { value: 1, label: 'JavaScript', group: 'Frontend', description: 'Dynamic web language' },
  { value: 2, label: 'TypeScript', group: 'Frontend', description: 'Typed JavaScript' },
  { value: 3, label: 'React', group: 'Frontend', description: 'UI library' },
  { value: 4, label: 'Angular', group: 'Frontend', description: 'Full framework' },
  { value: 5, label: 'Vue', group: 'Frontend', description: 'Progressive framework' },
  { value: 6, label: 'Node.js', group: 'Backend', description: 'JavaScript runtime' },
  { value: 7, label: 'Python', group: 'Backend', description: 'Versatile language' },
  { value: 8, label: 'Java', group: 'Backend', description: 'Enterprise language' },
  { value: 9, label: 'Go', group: 'Backend', description: 'Fast compiled language' },
  { value: 10, label: 'Rust', group: 'Backend', description: 'Memory-safe language' },
];
