// Breadcrumb documentation code examples
export const BreadcrumbCodeExamples = {
  // Installation
  installation: `npx wally-ui add breadcrumb`,

  // Import examples
  import: `import { Breadcrumb, BreadcrumbItem } from './components/wally-ui/breadcrumb/breadcrumb';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [Breadcrumb],
  templateUrl: './example.html',
  styleUrl: './example.css'
})`,

  // Basic usage
  basicUsage: `<wally-breadcrumb [items]="breadcrumbItems"></wally-breadcrumb>`,

  // Component setup
  componentSetup: `export class ExampleComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Category' }
  ];
}`,

  // Basic setup for simple example
  basicSetup: `breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Components' }
];`,

  // Specific examples
  multiLevelSetup: `breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', url: '/' },
  { label: 'Documentation', url: '/documentation' },
  { label: 'Components', url: '/documentation/components' },
  { label: 'Breadcrumb' }
];`,

  singleItemSetup: `breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Components' }
];`,

  // Interface
  interface: `interface BreadcrumbItem {
  label: string;
  url?: string;
}`,

  // Advanced examples
  withIcons: `<wally-breadcrumb [items]="breadcrumbItemsWithIcons"></wally-breadcrumb>`,

  withIconsSetup: `breadcrumbItemsWithIcons: BreadcrumbItem[] = [
  {
    label: 'Home',
    url: '/',
    icon: '<svg>...</svg>'
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: '<svg>...</svg>'
  },
  { label: 'Profile' }
];`,

  // Properties
  propertyItems: `items: BreadcrumbItem[] = [];`,
  propertySeparator: `separator?: string = '/';`,
  propertyMaxItems: `maxItems?: number;`
};