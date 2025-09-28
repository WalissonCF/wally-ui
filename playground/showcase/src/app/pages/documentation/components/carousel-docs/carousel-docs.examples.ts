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

  // With navigation indicators
  withNavigationIndicators: `<wally-carousel [isNavigationIndicator]="true">
  <div>Item 1</div>
  <div>Item 2</div>
</wally-carousel>`,

  // Image carousel
  imageCarousel: `<div class="w-full h-80">
  <wally-carousel>
    <div class="w-full h-full">
      <img src="/api/placeholder/600/320" alt="Image 1" class="w-full h-full object-cover">
    </div>
    <div class="w-full h-full">
      <img src="/api/placeholder/600/320" alt="Image 2" class="w-full h-full object-cover">
    </div>
    <div class="w-full h-full">
      <img src="/api/placeholder/600/320" alt="Image 3" class="w-full h-full object-cover">
    </div>
  </wally-carousel>
</div>`,

  // Product showcase
  productShowcase: `<div class="w-full h-96">
  <wally-carousel>
    <div class="w-full h-full bg-white border-2 border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
      <div class="w-20 h-20 bg-blue-500 rounded-lg mb-4"></div>
      <h3 class="text-lg font-semibold text-gray-900">Product A</h3>
      <p class="text-gray-600 text-center">Amazing features and benefits</p>
      <span class="text-xl font-bold text-blue-600 mt-2">$99</span>
    </div>
    <div class="w-full h-full bg-white border-2 border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
      <div class="w-20 h-20 bg-green-500 rounded-lg mb-4"></div>
      <h3 class="text-lg font-semibold text-gray-900">Product B</h3>
      <p class="text-gray-600 text-center">Premium quality guaranteed</p>
      <span class="text-xl font-bold text-green-600 mt-2">$149</span>
    </div>
  </wally-carousel>
</div>`,

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

  // Responsive design example
  responsiveExample: `<!-- Different sizes for different use cases -->

<!-- Hero carousel - full width, tall -->
<div class="w-full h-96">
  <wally-carousel>
    <div>Hero slide 1</div>
    <div>Hero slide 2</div>
  </wally-carousel>
</div>

<!-- Product gallery - square aspect ratio -->
<div class="w-full aspect-square max-w-md">
  <wally-carousel>
    <div>Product image 1</div>
    <div>Product image 2</div>
  </wally-carousel>
</div>

<!-- Mobile testimonials - compact -->
<div class="w-full h-48 sm:h-64">
  <wally-carousel>
    <div>Testimonial 1</div>
    <div>Testimonial 2</div>
  </wally-carousel>
</div>`,

  // Individual properties
  propertyIsNavigationIndicator: `isNavigationIndicator: InputSignal<boolean> = input<boolean>(false);`,
  propertyTotalItemsCount: `totalItemsCount: number (read-only);`,
  propertyCurrentVisibleItemIndex: `currentVisibleItemIndex: number (read-only);`,
  propertyNavigationIndicatorsArray: `navigationIndicatorsArray: any[] (read-only);`,

  // API Methods
  apiMethods: `// Public navigation methods
navigateToNextItem(): void;           // Go to next slide
navigateToPreviousItem(): void;       // Go to previous slide
navigateToSpecificItem(index: number): void;  // Jump to specific slide

// Public calculation methods
calculateNextItemIndex(current: number): number;     // Get next index
calculatePreviousItemIndex(current: number): number; // Get previous index

// Public positioning methods
updateItemElementPosition(element: HTMLElement, index: number): void;
updateAllItemElementPositions(): void;`,

  // Keyboard shortcuts
  keyboardShortcuts: `// Keyboard navigation (when carousel is focused)
ArrowLeft  → Previous slide
ArrowRight → Next slide
Home       → First slide
End        → Last slide`,

  // Touch gestures
  touchGestures: `// Touch and mouse gestures
Swipe Left  → Next slide
Swipe Right → Previous slide
Click Dots  → Jump to specific slide
Drag        → Same as swipe (desktop)`
};