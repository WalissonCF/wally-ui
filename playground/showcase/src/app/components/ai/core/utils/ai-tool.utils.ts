import { AI_TOOL_ICONS } from '../../constants';

/**
 * Utility functions for AI tools
 */

/**
 * Get SVG icon string for a tool by its icon name
 * @param iconName - The name of the icon (e.g., 'figma', 'notion', 'github')
 * @returns SVG string or empty string if icon not found
 *
 * @example
 * ```typescript
 * const figmaIcon = getToolIcon('figma');
 * ```
 */
export function getToolIcon(iconName: string): string {
  return AI_TOOL_ICONS[iconName] || '';
}

/**
 * Check if a tool icon exists
 * @param iconName - The name of the icon to check
 * @returns True if icon exists, false otherwise
 *
 * @example
 * ```typescript
 * if (hasToolIcon('figma')) {
 *   // Icon exists
 * }
 * ```
 */
export function hasToolIcon(iconName: string): boolean {
  return iconName in AI_TOOL_ICONS;
}

/**
 * Get list of all available tool icon names
 * @returns Array of icon names
 *
 * @example
 * ```typescript
 * const availableIcons = getAvailableToolIcons();
 * // ['figma', 'notion', 'github', ...]
 * ```
 */
export function getAvailableToolIcons(): string[] {
  return Object.keys(AI_TOOL_ICONS);
}
