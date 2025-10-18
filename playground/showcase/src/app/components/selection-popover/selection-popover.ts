import { AfterViewInit, Component, computed, ElementRef, HostListener, output, OutputEmitterRef, signal, ViewChild, WritableSignal } from '@angular/core';

/**
 * Selection Popover Component
 *
 * Displays a floating action toolbar above selected text (similar to Medium, Notion, Google Docs).
 * Uses Selection API for text detection and supports custom actions via content projection.
 *
 * @example
 * ```html
 * <wally-selection-popover (textSelected)="onTextSelected($event)">
 *   <div popoverActions>
 *     <button>Custom Action</button>
 *   </div>
 *   <article>Selectable content...</article>
 * </wally-selection-popover>
 * ```
 */
@Component({
  selector: 'wally-selection-popover',
  standalone: true,
  imports: [],
  templateUrl: './selection-popover.html',
  styleUrl: './selection-popover.css'
})
export class SelectionPopover implements AfterViewInit {
  /** Reference to the popover element for positioning calculations */
  @ViewChild('popover') popoverElement!: ElementRef<HTMLDivElement>;

  /** Reference to custom actions slot for detecting projected content */
  @ViewChild('customActionsSlot', { read: ElementRef }) customActionsSlot?: ElementRef;

  /** Emits when text is selected (fallback action only) */
  textSelected: OutputEmitterRef<string> = output<string>();

  /** Current popover position (top, left in pixels) */
  popoverPosition: WritableSignal<{ top: number; left: number; }> = signal<{ top: number; left: number; }>({ top: 0, left: 0 });

  /** Whether custom actions are projected */
  hasCustomActionsSignal: WritableSignal<boolean> = signal<boolean>(false);

  /** Whether popover should be rendered in DOM */
  isVisible: WritableSignal<boolean> = signal<boolean>(false);

  /** Whether popover is positioned correctly (controls opacity) */
  isPositioned: WritableSignal<boolean> = signal<boolean>(false);

  /** Currently selected text */
  selectedText: WritableSignal<string> = signal<string>('');

  /**
   * Detects if user is on mobile device
   */
  isMobile = computed(() => {
    if (typeof window === 'undefined') return false;

    return 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;
  });

  /**
   * Computes adjusted position with viewport constraints
   * Prevents popover from overflowing screen edges
   * Mobile-aware: accounts for virtual keyboard and smaller screens
   */
  adjustedPosition = computed(() => {
    const position = this.popoverPosition();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get real popover dimensions if available, otherwise estimate
    const popoverWidth = this.popoverElement?.nativeElement?.offsetWidth || 200;
    const popoverHeight = this.popoverElement?.nativeElement?.offsetHeight || 50;

    let left = position.left;
    let top = position.top;

    // Horizontal adjustment
    if (left + popoverWidth > viewportWidth) {
      left = viewportWidth - popoverWidth - 10;
    }
    if (left < 10) {
      left = 10;
    }

    // Vertical adjustment for mobile (avoid keyboard and screen edges)
    if (this.isMobile()) {
      // If too close to top, position below selection instead
      if (top < 80) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          top = rect.bottom + 10; // 10px below selection
        }
      }

      // If too close to bottom (virtual keyboard area), keep visible
      if (top + popoverHeight > viewportHeight - 100) {
        top = viewportHeight - popoverHeight - 100;
      }
    }

    return { top, left };
  });

  /**
   * Handles both mouse and touch selection events
   * Mobile: touchend after long-press selection
   * Desktop: mouseup after click-drag selection
   */
  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onMouseUp(event: MouseEvent | TouchEvent): void {
    const isMobile = 'ontouchstart' in window;
    const delay = isMobile ? 100 : 10;

    setTimeout(() => {
      this.handleTextSelection();
    }, delay);
  }

  /**
   * Closes popover when clicking outside
   * @param event - Mouse event from document click
   */
  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isVisible() && this.popoverElement) {
      const clickedInside = this.popoverElement.nativeElement.contains(event.target as Node);

      if (!clickedInside) {
        this.hide();
      }
    }
  }

  /**
   * Closes popover when ESC key is pressed
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.hide();
  }

  /**
  * Prevents native mobile selection menu from appearing
  * This ensures only our custom popover is shown
  */
  @HostListener('selectionchange')
  onNativeSelectionChange() {
    const selection = window.getSelection();

    if (selection && selection.toString().trim().length >= 3) {
      // Prevent native menu only if valid selection exists
      // and our popover will appear
      event?.preventDefault?.();
    }
  }

  /**
   * Prevents scroll when touching the popover on mobile
   * Ensures users can interact with actions without accidentally scrolling
   */
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isVisible() && this.popoverElement) {
      const target = event.target as Node;
      const isPopoverTouch = this.popoverElement.nativeElement.contains(target);

      if (isPopoverTouch) {
        event.preventDefault();
      }
    }
  }

  /**
   * Handles text selection and shows popover
   *
   * Two-step positioning algorithm to prevent visual "flash":
   * 1. Render popover invisible (opacity: 0) at selection center
   * 2. Wait for DOM render to get real popover width
   * 3. Recalculate centered position with actual width
   * 4. Fade in popover (opacity: 100) at correct position
   *
   * Uses position: fixed + getBoundingClientRect() for viewport-relative positioning
   * No window.scrollY needed - stays in place during scroll
   */
  handleTextSelection(): void {
    const selection = window.getSelection();

    if (!selection || selection.toString().trim().length < 3) {
      this.hide();
      return;
    }

    const text = selection.toString().trim();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    this.selectedText.set(text);

    // Calculate selection center point
    const selectionCenterX = rect.left + (rect.width / 2);
    const selectionTop = rect.top;

    // Step 1: Render invisible for width calculation
    this.isVisible.set(true);
    this.isPositioned.set(false); // opacity: 0

    // Step 2: Recalculate position with real popover width
    setTimeout(() => {
      if (this.popoverElement?.nativeElement) {
        const popoverWidth = this.popoverElement.nativeElement.offsetWidth;

        // Center popover above selection (60px offset)
        this.popoverPosition.set({
          top: selectionTop - 60,
          left: selectionCenterX - (popoverWidth / 2)
        });

        // Fade in at correct position
        this.isPositioned.set(true); // opacity: 100
      }

      // Detect projected custom actions
      if (this.customActionsSlot?.nativeElement) {
        const slot = this.customActionsSlot.nativeElement;
        const firstChild = slot.children[0] as HTMLElement;
        const hasContent = firstChild && firstChild.children.length > 0;
        this.hasCustomActionsSignal.set(hasContent);
      }
    }, 0);
  }

  /**
   * Hides popover and clears browser text selection
   */
  hide(): void {
    this.isVisible.set(false);
    this.isPositioned.set(false);

    window.getSelection()?.removeAllRanges();
  }

  /**
   * Handles any click inside the popover
   * Emits selected text and closes popover
   * This allows both custom actions and fallback button to work
   */
  onPopoverClick() {
    const text = this.selectedText();
    this.textSelected.emit(text);
    this.hide();
  }

  /**
   * Lifecycle hook - detects custom actions on component init
   */
  ngAfterViewInit(): void {
    if (this.customActionsSlot?.nativeElement) {
      const slot = this.customActionsSlot.nativeElement;
      const firstChild = slot.children[0] as HTMLElement;
      const hasContent = firstChild && firstChild.children.length > 0;
      this.hasCustomActionsSignal.set(hasContent);
    }
  }
}
