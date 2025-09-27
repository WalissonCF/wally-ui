import { Component, input, OnInit, signal, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wally-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;

  totalItemsCount = signal<number>(0);
  currentVisibleItemIndex = signal<number>(0);
  carouselItemElements: HTMLElement[] = [];

  // Touch and swipe gesture state
  private gestureState = {
    startPositionX: 0,
    startPositionY: 0,
    currentPositionX: 0,
    currentPositionY: 0,
    isCurrentlyDragging: false,
    gestureStartTime: 0
  };

  // Configuration constants for touch and swipe behavior
  private readonly MINIMUM_SWIPE_DISTANCE = 50; // minimum pixels to register as swipe
  private readonly MINIMUM_SWIPE_VELOCITY = 0.3; // minimum velocity to register as swipe
  private readonly MAXIMUM_SWIPE_DURATION = 300; // maximum milliseconds for swipe gesture

  // Event listener cleanup functions
  private eventListenerCleanupFunctions: (() => void)[] = [];

  get navigationDotsArray() {
    return Array(this.totalItemsCount()).fill(0);
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.carouselContainer) {
      this.initializeCarouselItems();
      this.setupTouchAndMouseEvents();
      this.setupAccessibilityAttributes();
    }
  }

  ngOnDestroy(): void {
    // Clean up all event listeners to prevent memory leaks
    this.eventListenerCleanupFunctions.forEach(cleanupFunction => cleanupFunction());
  }

  private initializeCarouselItems(): void {
    // Get all direct children elements of the carousel container
    this.carouselItemElements = Array.from(this.carouselContainer.nativeElement.children);
    this.totalItemsCount.set(this.carouselItemElements.length);

    // Apply positioning and styling to each carousel item using Renderer2
    this.carouselItemElements.forEach((itemElement, itemIndex) => {
      this.renderer.setStyle(itemElement, 'position', 'absolute');
      this.renderer.setStyle(itemElement, 'inset', '0');
      this.renderer.setStyle(itemElement, 'transition', 'transform 700ms ease-out');
      this.renderer.setStyle(itemElement, 'display', 'flex');
      this.renderer.setStyle(itemElement, 'align-items', 'center');
      this.renderer.setStyle(itemElement, 'justify-content', 'center');
      this.updateItemElementPosition(itemElement, itemIndex);
    });
  }

  private setupTouchAndMouseEvents(): void {
    const carouselContainerElement = this.carouselContainer.nativeElement;

    // Touch events for mobile devices
    const touchStartListener = this.renderer.listen(carouselContainerElement, 'touchstart', (event) => this.handleTouchStart(event));
    const touchMoveListener = this.renderer.listen(carouselContainerElement, 'touchmove', (event) => this.handleTouchMove(event));
    const touchEndListener = this.renderer.listen(carouselContainerElement, 'touchend', () => this.handleTouchEnd());

    // Mouse events for desktop devices
    const mouseDownListener = this.renderer.listen(carouselContainerElement, 'mousedown', (event) => this.handleMouseDown(event));
    const mouseMoveListener = this.renderer.listen(carouselContainerElement, 'mousemove', (event) => this.handleMouseMove(event));
    const mouseUpListener = this.renderer.listen(carouselContainerElement, 'mouseup', () => this.handleMouseUp());
    const mouseLeaveListener = this.renderer.listen(carouselContainerElement, 'mouseleave', () => this.handleMouseUp());

    // Store all cleanup functions for proper memory management
    this.eventListenerCleanupFunctions.push(
      touchStartListener,
      touchMoveListener,
      touchEndListener,
      mouseDownListener,
      mouseMoveListener,
      mouseUpListener,
      mouseLeaveListener
    );

    // Optimize touch performance by restricting to horizontal panning only
    this.renderer.setStyle(carouselContainerElement, 'touch-action', 'pan-x');
  }

  private setupAccessibilityAttributes(): void {
    const carouselContainerElement = this.carouselContainer.nativeElement;

    // Set ARIA attributes for screen readers and accessibility
    this.renderer.setAttribute(carouselContainerElement, 'role', 'region');
    this.renderer.setAttribute(carouselContainerElement, 'aria-label', 'Carousel');
    this.renderer.setAttribute(carouselContainerElement, 'tabindex', '0');
  }

  updateItemElementPosition(carouselItemElement: HTMLElement, itemIndex: number): void {
    const currentVisibleIndex = this.currentVisibleItemIndex();

    if (itemIndex === currentVisibleIndex) {
      // Position the currently visible item at center (0% translation)
      this.renderer.setStyle(carouselItemElement, 'transform', 'translateX(0)');
    } else if (itemIndex > currentVisibleIndex) {
      // Position items to the right of current item (110% translation to the right)
      this.renderer.setStyle(carouselItemElement, 'transform', 'translateX(110%)');
    } else {
      // Position items to the left of current item (110% translation to the left)
      this.renderer.setStyle(carouselItemElement, 'transform', 'translateX(-110%)');
    }
  }

  updateAllItemElementPositions(): void {
    this.carouselItemElements.forEach((itemElement, itemIndex) => {
      this.updateItemElementPosition(itemElement, itemIndex);
    });
  }

  // Touch event handlers for mobile devices
  private handleTouchStart(touchEvent: TouchEvent): void {
    this.initializeGesture(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
  }

  private handleTouchMove(touchEvent: TouchEvent): void {
    if (this.gestureState.isCurrentlyDragging) {
      touchEvent.preventDefault(); // Prevent page scrolling during swipe
      this.updateGesturePosition(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
    }
  }

  private handleTouchEnd(): void {
    this.finalizeGestureAndNavigate();
  }

  // Mouse event handlers for desktop devices
  private handleMouseDown(mouseEvent: MouseEvent): void {
    this.initializeGesture(mouseEvent.clientX, mouseEvent.clientY);
  }

  private handleMouseMove(mouseEvent: MouseEvent): void {
    if (this.gestureState.isCurrentlyDragging) {
      mouseEvent.preventDefault(); // Prevent text selection during drag
      this.updateGesturePosition(mouseEvent.clientX, mouseEvent.clientY);
    }
  }

  private handleMouseUp(): void {
    this.finalizeGestureAndNavigate();
  }

  // Unified gesture handling methods
  private initializeGesture(xPosition: number, yPosition: number): void {
    this.gestureState = {
      startPositionX: xPosition,
      startPositionY: yPosition,
      currentPositionX: xPosition,
      currentPositionY: yPosition,
      isCurrentlyDragging: true,
      gestureStartTime: Date.now()
    };
  }

  private updateGesturePosition(xPosition: number, yPosition: number): void {
    if (!this.gestureState.isCurrentlyDragging) return;

    this.gestureState.currentPositionX = xPosition;
    this.gestureState.currentPositionY = yPosition;
  }

  private finalizeGestureAndNavigate(): void {
    if (!this.gestureState.isCurrentlyDragging) return;

    const horizontalDistanceMoved = this.gestureState.currentPositionX - this.gestureState.startPositionX;
    const verticalDistanceMoved = this.gestureState.currentPositionY - this.gestureState.startPositionY;
    const gestureDuration = Date.now() - this.gestureState.gestureStartTime;
    const gestureVelocity = Math.abs(horizontalDistanceMoved) / gestureDuration;

    // Only process horizontal swipes (ignore vertical movements)
    if (Math.abs(horizontalDistanceMoved) > Math.abs(verticalDistanceMoved)) {
      // Check if gesture meets minimum requirements for navigation
      const isValidSwipeGesture = Math.abs(horizontalDistanceMoved) > this.MINIMUM_SWIPE_DISTANCE ||
        (gestureVelocity > this.MINIMUM_SWIPE_VELOCITY && gestureDuration < this.MAXIMUM_SWIPE_DURATION);

      if (isValidSwipeGesture) {
        if (horizontalDistanceMoved > 0) {
          this.navigateToPreviousItem(); // Swipe right = go to previous item
        } else {
          this.navigateToNextItem(); // Swipe left = go to next item
        }
      }
    }

    // Reset gesture state after processing
    this.gestureState.isCurrentlyDragging = false;
  }

  // Keyboard navigation handler
  @HostListener('keydown', ['$event'])
  handleKeyboardNavigation(keyboardEvent: KeyboardEvent): void {
    switch (keyboardEvent.key) {
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        this.navigateToPreviousItem();
        break;
      case 'ArrowRight':
        keyboardEvent.preventDefault();
        this.navigateToNextItem();
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        this.navigateToSpecificItem(0);
        break;
      case 'End':
        keyboardEvent.preventDefault();
        this.navigateToSpecificItem(this.totalItemsCount() - 1);
        break;
    }
  }

  // Circular buffer algorithm implementation for infinite carousel navigation
  calculateNextItemIndex(currentItemIndex: number): number {
    return (currentItemIndex + 1) % this.totalItemsCount();
  }

  calculatePreviousItemIndex(currentItemIndex: number): number {
    return (currentItemIndex - 1 + this.totalItemsCount()) % this.totalItemsCount();
  }

  navigateToNextItem(): void {
    this.currentVisibleItemIndex.set(this.calculateNextItemIndex(this.currentVisibleItemIndex()));
    this.updateAllItemElementPositions();
  }

  navigateToPreviousItem(): void {
    this.currentVisibleItemIndex.set(this.calculatePreviousItemIndex(this.currentVisibleItemIndex()));
    this.updateAllItemElementPositions();
  }

  navigateToSpecificItem(targetItemIndex: number): void {
    this.currentVisibleItemIndex.set(targetItemIndex);
    this.updateAllItemElementPositions();
  }
  // end test Circular Buffer ---
}
