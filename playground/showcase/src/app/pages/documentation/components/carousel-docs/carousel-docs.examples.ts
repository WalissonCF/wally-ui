// Carousel documentation code examples
export const CarouselCodeExamples = {
  // Installation
  installation: `npx wally-ui add carousel`,

  // Import examples
  import: `import { Carousel } from './components/wally-ui/carousel/carousel';`,
  componentImport: `@Component({
  selector: 'app-example',
  imports: [Carousel],
  templateUrl: './example.html',
  styleUrl: './example.css'
})`,

  // Basic usage
  basicUsage: `<wally-carousel>
  <div>Item 1</div>
  <div>Item 2</div>
</wally-carousel>`,

  // Custom content example
  customContent: `<wally-carousel>
  <div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-6">
    <h3 class="text-xl font-bold mb-2">Feature 1</h3>
    <p class="text-center text-sm">Custom slide with rich content</p>
  </div>
  <div class="w-full h-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex flex-col items-center justify-center p-6">
    <h3 class="text-xl font-bold mb-2">Feature 2</h3>
    <p class="text-center text-sm">Another slide with different styling</p>
  </div>
</wally-carousel>`,

  // Properties
  properties: `// Component properties
// The carousel automatically detects child elements and creates navigation
// Currently no input properties - content projection only

// Available interactions:
// • Click navigation buttons (Previous/Next)
// • Click dot indicators for direct navigation
// • Touch/swipe gestures on mobile and desktop
// • Keyboard navigation (Arrow keys, Home, End)

// Auto-detected features:
totalItemsCount: number;              // Automatically set based on child elements
currentVisibleItemIndex: number;     // Currently visible slide index (0-based)
navigationDotsArray: any[];          // Auto-generated dot indicators`
};